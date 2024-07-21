"use client";
import Image from "next/image";
import styles from "./ContentList.module.css";
import { Categories } from "@/app/_components/Categories";
import useIntersect from "@/app/_hooks/useIntersect";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { BASE_URL, getContents, getContentsCount } from "@/app/_utils/api";
import { useMemo } from "react";
import useParams from "@/app/_hooks/useParams";
import { IContentData } from "@/app";
import no_image from "@/../public/assets/no_image.svg";

export default function ContentList() {
  const searchParams = useParams("categories").getParamsToString();

  const { data: contentsCountData } = useQuery({
    queryKey: ["contentsCountData", searchParams],
    queryFn: () => getContentsCount(searchParams),
    staleTime: 5 * 1000 * 60,
    gcTime: 30 * 1000 * 60,
  });

  const { data: alignedContentsData, fetchNextPage } = useInfiniteQuery({
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

  const ref = useIntersect(() => {
    fetchNextPage({ cancelRefetch: false });
  });

  return (
    <div className={styles.container}>
      {contentsData &&
        contentsData.map((content, index) => (
          <div
            key={content.id}
            ref={index === contentsData.length - 2 ? ref : null}
            className={styles.contentBox}
            onClick={() =>
              window.open(`${BASE_URL}/contents/${content.id}/link`)
            }
          >
            <div className={styles.leftBox}>
              <div className={styles.titleBox}>
                <Image
                  src={
                    content.providerIconUrl
                      ? content.providerIconUrl
                      : no_image.src
                  }
                  alt={"provider icon"}
                  width={20}
                  height={20}
                  style={{ borderRadius: 4 }}
                ></Image>
                <h1 className={styles.providerTitle}>
                  {content.providerTitle}
                </h1>
                <h2 className={styles.dateText}>{content.publishedDate}</h2>
              </div>
              <h1 className={styles.contentTitle}>{content.title}</h1>
              <div className={styles.categoryBox}>
                {content.categories.map(
                  (category) => `${Categories[category]} `
                )}
              </div>
            </div>
            <div className={styles.rightBox}>
              <Image
                src={content.imageUrl ? content.imageUrl : no_image.src}
                alt={"content image"}
                width={90}
                height={60}
                style={{ borderRadius: 10 }}
              ></Image>
            </div>
          </div>
        ))}
    </div>
  );
}
