import styles from "./Home.module.css";
import ContentSlider from "./ContentSlider";
import { Suspense } from "react";
import { getContentsCount } from "@/app/_utils/api";
export default async function Home({
  searchParams,
}: {
  searchParams: { categories: string[]; id?: string };
}) {
  const arrayToQueryString = (categories: string[] | string) => {
    if (categories == null) {
      return "";
    } else if (!Array.isArray(categories)) {
      // 단일 카테고리일 경우, 배열이 아니므로 그대로 처리해서 반환
      return `categories=${categories}`;
    } else {
      return categories.map((category) => `categories=${category}`).join("&");
    }
  };
  const contentsCountData = await getContentsCount(
    arrayToQueryString(searchParams.categories)
  );
  // const randomIndex = getRandomNumber([], contentsCountData);
  // const initialContents = await getShuffledContents(
  //   randomIndex,
  //   arrayToQueryString(searchParams.categories),
  //   searchParams.id
  // );
  // const initialData = {
  //   pages: [initialContents],
  //   pageParams: [randomIndex],
  // };

  return (
    <div className={styles.container}>
      <div className={styles.contentBox}>
        <div className={styles.sliderBox}>
          <ContentSlider contentsCountData={contentsCountData} />
        </div>
      </div>
    </div>
  );
}
