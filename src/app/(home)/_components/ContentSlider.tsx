"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./ContentSlider.module.css";
import "swiper/css";
import IndexIndicator from "./IndexIndicator";

export default function ContentSlider({ contentData }: { contentData: any[] }) {
  return (
    <div className="swiper-container">
      <Swiper autoHeight={true}>
        {contentData.map((content) => {
          const summaryArray = content.summary
            .split("-")
            .map((item: string) => item.trim())
            .filter((item: string) => item);

          return (
            <SwiperSlide key={content.id}>
              <div className={styles.slideContainer}>
                <h1 className={styles.dateText}>{content.publishedDate}</h1>
                <div className={styles.titleBox}>
                  <img
                    src={content.providerIconUrl}
                    width={30}
                    height={30}
                    style={{ borderRadius: 7 }}
                    loading="lazy"
                  ></img>
                  <div className={styles.titleWrap}>
                    <h2 className={styles.providerTitle}>
                      {content.providerTitle}
                    </h2>
                    <h2 className={styles.title}>{content.title}</h2>
                  </div>
                </div>
                <div className={styles.summaryBox}>
                  <img
                    src={content.imageUrl}
                    width={"100%"}
                    height={180}
                    style={{
                      objectFit: "cover",
                      borderTopLeftRadius: 10,
                      borderTopRightRadius: 10,
                    }}
                    loading="lazy"
                  ></img>
                  <div className={styles.summary}>
                    {summaryArray.map((summary: string, index: number) => {
                      return (
                        <div className={styles.summaryTextBox}>
                          <IndexIndicator index={index} />
                          <h2 className={styles.summaryText}>{summary}</h2>
                        </div>
                      );
                    })}
                  </div>
                  <div className={styles.categoryBox}>
                    {content.categories.map((category: string) => {
                      return (
                        <h2 className={styles.categoryText}>{category}</h2>
                      );
                    })}
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
