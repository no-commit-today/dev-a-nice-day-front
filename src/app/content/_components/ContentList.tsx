"use client";
import Image from "next/image";
import styles from "./ContentList.module.css";
import { Categories } from "@/app/_components/Categories";
import useIntersect from "@/app/_hooks/useIntersect";
import { useSearchParams } from "next/navigation";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getContent, getPageCount } from "@/app/_utils/api";
import { useEffect, useState } from "react";

export default function ContentList() {
  const categories = Categories;
  const ref = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    if (!isFetchingNextPage) {
      fetchNextPage();
    }
  });

  const searchParams = useSearchParams().toString();

  const { data: totalPageData } = useQuery({
    queryKey: ["totalPageData", searchParams],
    queryFn: () => getPageCount(searchParams),
    staleTime: 5 * 1000 * 60,
    gcTime: 30 * 1000 * 60,
  });

  //TODO: 전체 페이지 개수로 검사하기
  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["content", searchParams],
    queryFn: ({ pageParam }) => getContent(pageParam, searchParams),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
      if (totalPageData !== undefined) {
        return lastPageParam + 1 > Math.ceil(totalPageData.count / 10)
          ? null
          : lastPageParam + 1;
      }
    },
    enabled: totalPageData !== undefined,
  });

  const [contentData, setContentData] = useState<any[] | undefined>(undefined);
  useEffect(() => {
    if (data) {
      setContentData(data.pages.map((page) => page.content).flat());
    }
  }, [data]);

  return (
    <div className={styles.container}>
      {contentData &&
        contentData.map((content) => (
          <div
            key={content.id}
            className={styles.contentBox}
            onClick={() => window.open(content.url)}
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
                {content.categories.map((category: string) => (
                  <div key={category} className={styles.category}>
                    {categories[category]}
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
