"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import CategoryButton from "../_components/CategoryButton";
import ContentList from "./_components/ContentList";
import styles from "./page.module.css";
import { getContent } from "../_utils/api";

export default function Content() {
  const getPage = () => {
    return 2;
  };
  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["content"],
    queryFn: ({ pageParam }) => getContent(pageParam),
    initialPageParam: 1,
    getNextPageParam: () => getPage(),
  });
  const loadMore = async () => {
    fetchNextPage();
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentBox}>
        <CategoryButton />
        <div className={styles.contentList}>
          {data && (
            <ContentList
              contentData={data.pages.map((page) => page.content).flat()}
              loadMore={loadMore}
              isFetchingNextPage={isFetchingNextPage}
            />
          )}
        </div>
      </div>
    </div>
  );
}
