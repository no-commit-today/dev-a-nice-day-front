import { Metadata } from "next";
import CategoryButton from "../_components/CategoryButton";
import ContentList from "./_components/ContentList";
import styles from "./page.module.css";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "콘텐츠 목록 | 테크스와이프",
};

export default function Content() {
  return (
    <div className={styles.container}>
      <div className={styles.contentBox}>
        <Suspense>
          <CategoryButton />
        </Suspense>
        <div className={styles.contentList}>
          <Suspense>
            <ContentList />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
