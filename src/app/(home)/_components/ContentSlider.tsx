"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./ContentSlider.module.css";
import "swiper/css";
import IndexIndicator from "./IndexIndicator";
import Image from "next/image";
import { Categories } from "@/app/_components/Categories";
import { useRouter } from "next/navigation";

export default function ContentSlider({ contentData }: { contentData: any[] }) {
  const categories = Categories;
  const router = useRouter();
  const goToLink = ({ url }: { url: string }) => {
    window.open(url);
  };
  return (
    <div className="swiper-container">
      <Swiper autoHeight={true} direction={"vertical"}>
        {contentData.map((content) => {
          const summaryArray = content.summary
            .split("-")
            .map((item: string) => item.trim())
            .filter((item: string) => item);

          return (
            <SwiperSlide key={content.id} className={styles.swiperSlide}>
              <div className={styles.slideContainer}>
                <h1 className={styles.dateText}>{content.publishedDate}</h1>
                <div className={styles.titleBox}>
                  <Image
                    src={content.providerIconUrl}
                    alt={"provider icon"}
                    width={30}
                    height={30}
                    style={{ borderRadius: 7 }}
                    className={styles.providerIcon}
                    onClick={() => goToLink({ url: content.providerUrl })}
                  ></Image>
                  <div className={styles.titleWrap}>
                    <h2
                      className={styles.providerTitle}
                      onClick={() => goToLink({ url: content.providerUrl })}
                    >
                      {content.providerTitle}
                    </h2>
                    <h2
                      className={styles.title}
                      onClick={() => goToLink({ url: content.url })}
                    >
                      {content.title}
                    </h2>
                  </div>
                </div>
                <div className={styles.summaryBox}>
                  <div
                    className={styles.summaryBtn}
                    onClick={() => goToLink({ url: content.url })}
                  >
                    <Image
                      src={content.imageUrl}
                      alt="content image"
                      width={560}
                      height={350}
                      style={{
                        objectFit: "cover",
                        borderRadius: 10,
                        width: "100%",
                      }}
                    ></Image>
                    <div className={styles.summary}>
                      {summaryArray.map((summary: string, index: number) => {
                        return (
                          <div key={index} className={styles.summaryTextBox}>
                            <IndexIndicator index={index} />
                            <h2 className={styles.summaryText}>{summary}</h2>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className={styles.categoryBox}>
                    {content.categories.map(
                      (category: string, index: number) => {
                        return (
                          <h2 key={index} className={styles.categoryText}>
                            {categories[category]}
                          </h2>
                        );
                      }
                    )}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
