"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./ContentSlider.module.css";
import "swiper/css";
import IndexIndicator from "./IndexIndicator";
import Image from "next/image";
import { Categories } from "@/app/_components/Categories";

export default function ContentSlider({ contentData }: { contentData: any[] }) {
  const categories = Categories;
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
                  ></Image>
                  <div className={styles.titleWrap}>
                    <h2 className={styles.providerTitle}>
                      {content.providerTitle}
                    </h2>
                    <h2 className={styles.title}>{content.title}</h2>
                  </div>
                </div>
                <div className={styles.summaryBox}>
                  <div
                    style={{
                      height: 350,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      position: "relative",
                    }}
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
