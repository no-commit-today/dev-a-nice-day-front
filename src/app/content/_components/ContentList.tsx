"use client";
import Image from "next/image";
import styles from "./ContentList.module.css";
import { Categories } from "@/app/_components/Categories";
import useIntersect from "@/app/_hooks/useIntersect";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { BASE_URL, getContents, getContentsCount } from "@/app/_utils/api";
import { useEffect, useState } from "react";
import useParams from "@/app/_hooks/useParams";
import { IContentData } from "@/app";

export default function ContentList() {
  const ref = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    if (!isFetchingNextPage) {
      fetchNextPage();
    }
  });

  const searchParams = useParams("category").getParamsToString();
  const [contentsData, setContentsData] = useState<IContentData[] | null>(null);

  const { data: contentsCountData } = useQuery({
    queryKey: ["contentsCountData", searchParams],
    queryFn: () => getContentsCount(searchParams),
    staleTime: 5 * 1000 * 60,
    gcTime: 30 * 1000 * 60,
  });

  const {
    data: alignedContentsData,
    fetchNextPage,
    isFetchingNextPage,
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
  });

  useEffect(() => {
    if (alignedContentsData) {
      setContentsData(
        alignedContentsData.pages.map((page) => page.content).flat()
      );
    }
  }, [alignedContentsData]);

  return (
    <div className={styles.container}>
      {contentsData &&
        contentsData.map((content) => (
          <div
            key={content.id}
            className={styles.contentBox}
            onClick={() =>
              window.open(`${BASE_URL}/contents/${content.id}/link`)
            }
          >
            <div className={styles.leftBox}>
              <div className={styles.titleBox}>
                <Image
                  src={"https://picsum.photos/200/300"}
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
                {content.categories.map((category) => (
                  <div key={category} className={styles.category}>
                    {Categories[category]}
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.rightBox}>
              <Image
                src={"https://picsum.photos/200/300"}
                alt={"content image"}
                width={90}
                height={60}
                style={{ borderRadius: 10 }}
              ></Image>
            </div>
          </div>
        ))}
      {!isFetchingNextPage && <div ref={ref} style={{ height: 1 }} />}
    </div>
  );
}
