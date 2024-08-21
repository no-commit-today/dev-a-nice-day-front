import CategoryButton from "@/app/_components/CategoryButton";
import styles from "./Home.module.css";
import ContentSlider from "./ContentSlider";
import { Suspense } from "react";
import { contentFallBack } from "./ContentSliderFallback";
import { categoryFallback } from "@/app/_components/CategoryFallback";
import { getContentsCount, getShuffledContents } from "@/app/_utils/api";
import getRandomNumber from "@/app/_utils/getRandomNumber";
export default async function Home() {
  const contentsCountData = await getContentsCount("");
  const randomIndex = getRandomNumber([], contentsCountData);
  const initialContents = await getShuffledContents(randomIndex, "");
  const initialData = {
    pages: [initialContents],
    pageParams: [randomIndex],
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentBox}>
        <Suspense fallback={categoryFallback}>
          <CategoryButton />
        </Suspense>
        <div className={styles.sliderBox}>
          <Suspense fallback={contentFallBack}>
            <ContentSlider
              initialData={initialData}
              contentsCountData={contentsCountData}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
