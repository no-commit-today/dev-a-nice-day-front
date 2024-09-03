"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./ContentSlider.module.css";
import "swiper/css";
import IndexIndicator from "./IndexIndicator";
import Image from "next/image";
import { Categories } from "@/app/_components/Categories";
import { useInfiniteQuery } from "@tanstack/react-query";
import { BASE_URL, getShuffledContents } from "@/app/_utils/api";
import { useEffect, useState } from "react";
import { Mousewheel } from "swiper/modules";
import useParams from "@/app/_hooks/useParams";
import { IContentData } from "@/app";
import no_image from "@/../public/assets/no_image.svg";
import getRandomNumber from "@/app/_utils/getRandomNumber";
import { useRouter } from "next/navigation";

export default function ContentSlider({
  initialData,
  contentsCountData,
}: {
  initialData: { pages: { content: IContentData[] }[]; pageParams: number[] };
  contentsCountData: { count: number };
}) {
  const router = useRouter();
  // 몇페이지 전에 패치할 것인지.
  const pagesBeforeFetch = 3;
  const searchParams = useParams("categories").getParamsToString();
  const [scrollPosition, setScrollPosition] = useState(0);

  const {
    data: shuffledContentsData,
    fetchNextPage,
    isFetchingNextPage,
    isStale,
    isFetchedAfterMount,
  } = useInfiniteQuery({
    queryKey: ["shuffledContents", searchParams],
    queryFn: ({ pageParam }) => getShuffledContents(pageParam, searchParams),
    initialPageParam: getRandomNumber([], contentsCountData),
    initialData: initialData,
    getNextPageParam: (_, __, ___, allPageParams) => {
      return getRandomNumber(allPageParams, contentsCountData);
    },
    enabled: contentsCountData !== undefined,
    staleTime: 5 * 1000 * 60,
    gcTime: 30 * 1000 * 60,
  });

  // 데이터 추가 요청
  const pushMore = async () => {
    if (!isFetchingNextPage) {
      await fetchNextPage();
    }
  };
  const goToLink = ({ url }: { url: string }) => {
    window.open(url);
  };

  useEffect(() => {
    router.push(
      `/?${searchParams}&id=${shuffledContentsData.pages[0].content[0].id}`
    );
  }, []);

  // 스크롤 포지션 받아오기
  useEffect(() => {
    if (shuffledContentsData) {
      if (isStale || isFetchedAfterMount) {
        // 캐싱 시간 지나서 리패치 or 마운트 이후 리패치(새로고침 시)
        // 스크롤 포지션 초기화
        setScrollPosition(0);
        sessionStorage.removeItem("scrollPosition");
      } else {
        // 데이터가 캐싱되어 있는 경우
        // 스크롤 포지션 복구
        const scrollPosition = Number(sessionStorage.getItem("scrollPosition"));
        if (scrollPosition) {
          setScrollPosition(scrollPosition);
        }
      }
    }
  }, [shuffledContentsData, isStale, isFetchedAfterMount]);

  return (
    <div className="swiper-container">
      {shuffledContentsData.pages.map((page) => page.content).flat() && (
        <Swiper
          modules={[Mousewheel]}
          mousewheel={{
            thresholdDelta: 20,
            forceToAxis: true,
          }}
          autoHeight={true}
          direction={"vertical"}
          initialSlide={scrollPosition}
          onSlideChange={(prop) => {
            router.push(
              `/?${searchParams}&id=${
                shuffledContentsData.pages.map((page) => page.content).flat()[
                  prop.activeIndex
                ].id
              }`
            );
            sessionStorage.setItem(
              "scrollPosition",
              prop.activeIndex.toString()
            );
            if (
              prop.activeIndex ===
              shuffledContentsData.pages.map((page) => page.content).flat()
                .length -
                pagesBeforeFetch
            ) {
              pushMore();
            }
          }}
        >
          {shuffledContentsData.pages
            .map((page) => page.content)
            .flat()
            .map((content) => {
              const summaryArray = content.summary
                .split("\n")
                .map((item: any) => item.trim())
                .filter((item: any) => item);

              return (
                <SwiperSlide key={content.id} className={styles.swiperSlide}>
                  <div className={styles.slideContainer}>
                    <h1 className={styles.dateText}>{content.publishedDate}</h1>
                    <div className={styles.titleBox}>
                      <Image
                        src={
                          content.providerIconUrl
                            ? content.providerIconUrl
                            : no_image.src
                        }
                        alt={"provider icon"}
                        width={30}
                        height={30}
                        priority={true}
                        style={{ borderRadius: 7 }}
                        className={styles.providerIcon}
                        onClick={() =>
                          goToLink({
                            url: content.providerUrl,
                          })
                        }
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
                          onClick={() =>
                            goToLink({
                              url: `${BASE_URL}/contents/${content.id}/link`,
                            })
                          }
                        >
                          {content.title}
                        </h2>
                      </div>
                    </div>
                    <div className={styles.summaryBox}>
                      <div
                        className={styles.summaryBtn}
                        onClick={() =>
                          goToLink({
                            url: `${BASE_URL}/contents/${content.id}/link`,
                          })
                        }
                      >
                        <div className={styles.imgBox}>
                          <Image
                            src={
                              content.imageUrl ? content.imageUrl : no_image.src
                            }
                            alt="content image"
                            fill
                            sizes="(max-height:250px)"
                            priority={true}
                            style={{
                              objectFit: "cover",
                              borderTopLeftRadius: 10,
                              borderTopRightRadius: 10,
                              width: "100%",
                            }}
                          ></Image>
                        </div>
                        <div className={styles.summary}>
                          {summaryArray.map(
                            (summary: string, index: number) => {
                              return (
                                <div
                                  key={index}
                                  className={styles.summaryTextBox}
                                >
                                  <IndexIndicator index={index} />
                                  <h2 className={styles.summaryText}>
                                    {summary.replace(/^\d+\.\s*/, "")}
                                  </h2>
                                </div>
                              );
                            }
                          )}
                        </div>
                      </div>

                      <div className={styles.categoryBox}>
                        {content.categories.map(
                          (category: string, index: number) => {
                            return (
                              <h2 key={index} className={styles.categoryText}>
                                #{Categories[category]}
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
      )}
    </div>
  );
}
