import { Metadata } from "next";
import CategoryButton from "../_components/CategoryButton";
import ContentList from "./_components/ContentList";
import styles from "./page.module.css";
import { Suspense } from "react";
import { contentListFallBack } from "./_components/ContentListFallback";
import { categoryFallback } from "../_components/CategoryFallback";

export const metadata: Metadata = {
  title: "테크스와이프 | 콘텐츠 목록",
};

export default function Content() {
  return (
    <div className={styles.container}>
      <div className={styles.contentBox}>
        <Suspense fallback={categoryFallback}>
          <CategoryButton />
        </Suspense>
        <div className={styles.contentList}>
          <Suspense fallback={contentListFallBack}>
            <ContentList />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
