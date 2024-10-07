"use client";
import styles from "./ContentList.module.css";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getContents, getContentsCount } from "@/app/_utils/api";
import { useEffect, useMemo } from "react";
import useParams from "@/app/_hooks/useParams";
import { IContentData } from "@/app";
import ContentBox from "@/app/_components/ContentBox";

export default function ContentList() {
  const searchParams = useParams("categories").getParamsToString();

  const { data: contentsCountData } = useQuery({
    queryKey: ["contentsCountData", searchParams],
    queryFn: () => getContentsCount(searchParams),
    staleTime: 5 * 1000 * 60,
    gcTime: 30 * 1000 * 60,
  });

  const {
    data: alignedContentsData,
    fetchNextPage,
    isStale,
  } = useInfiniteQuery({
    queryKey: ["contents", searchParams],
    queryFn: ({ pageParam }) => getContents(pageParam, searchParams),
    initialPageParam: 1,
    getNextPageParam: (_, __, lastPageParam, ___) => {
      if (contentsCountData !== undefined) {
        return lastPageParam + 1 > Math.ceil(contentsCountData.count / 10)
          ? null
          : lastPageParam + 1;
      }
    },
    enabled: contentsCountData !== undefined,
    staleTime: 5 * 1000 * 60,
    gcTime: 30 * 1000 * 60,
  });

  const contentsData: IContentData[] = useMemo(
    () =>
      alignedContentsData
        ? alignedContentsData.pages.map((page) => page.content).flat()
        : [],
    [alignedContentsData]
  );

  useEffect(() => {
    if (!isStale) {
      const scrollY = sessionStorage.getItem("scrollY");
      if (scrollY) {
        window.scrollTo(0, Number(scrollY));
        sessionStorage.removeItem("scrollY");
      }
    }
  }, [isStale]);

  return (
    <div className={styles.container}>
      {contentsData &&
        contentsData.map((contentData, index) => (
          <ContentBox
            key={contentData.id}
            contentData={contentData}
            index={index}
            length={contentsData.length}
            fetchNextPage={fetchNextPage}
          />
        ))}
    </div>
  );
}
