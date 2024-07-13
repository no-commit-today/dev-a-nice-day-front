import CategoryButton from "@/app/_components/CategoryButton";
import styles from "./Home.module.css";
import ContentSlider from "./ContentSlider";
import { Suspense } from "react";
import { contentFallBack } from "./ContentSliderFallback";
import { categoryFallback } from "@/app/_components/CategoryFallback";
export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.contentBox}>
        <Suspense fallback={categoryFallback}>
          <CategoryButton />
        </Suspense>
        <div className={styles.sliderBox}>
          <Suspense fallback={contentFallBack}>
            <ContentSlider />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
