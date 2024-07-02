"use client";
import Image from "next/image";
import styles from "./ContentList.module.css";
import { Categories } from "@/app/_components/Categories";
import useIntersect from "@/app/_hooks/useIntersect";

export default function ContentList({
  contentData,
  loadMore,
  isFetchingNextPage,
}: {
  contentData: any[];
  loadMore: () => void;
  isFetchingNextPage: boolean;
}) {
  const categories = Categories;
  const ref = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    if (!isFetchingNextPage) {
      loadMore();
    }
  });
  //tech.kakaoenterprise.com/149 [카카오엔터프라이즈 기술블로그 Tech&(테크앤):티스토리]
  출처: https: return (
    <div className={styles.container}>
      {contentData.map((content) => (
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
              <h1 className={styles.providerTitle}>{content.providerTitle}</h1>
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
      <div ref={ref} style={{ height: 1 }} />
    </div>
  );
}
