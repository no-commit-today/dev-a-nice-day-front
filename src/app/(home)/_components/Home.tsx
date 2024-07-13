import CategoryButton from "@/app/_components/CategoryButton";
import styles from "./Home.module.css";
import ContentSlider from "./ContentSlider";
import { Suspense } from "react";
import { contentFallBack } from "./contentFallback";
export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.contentBox}>
        <Suspense>
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
