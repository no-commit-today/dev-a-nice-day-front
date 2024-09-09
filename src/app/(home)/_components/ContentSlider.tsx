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
import FloatingBtn from "./FloatingBtn";

export default function ContentSlider({
  initialData,
  contentsCountData,
}: {
  initialData: { pages: { content: IContentData[] }[]; pageParams: number[] };
  contentsCountData: { count: number };
}) {
  const searchParams = useParams("categories").getParamsToString();
  const [mainImage, setMainImage] = useState<string | null>(null);
  const {
    data: shuffledContentsData,
    fetchNextPage,
    isFetchingNextPage,
    isStale,
  } = useInfiniteQuery({
    queryKey: ["shuffledContents", searchParams],
    queryFn: ({ pageParam }) => getShuffledContents(pageParam, searchParams),
    initialPageParam: getRandomNumber([], contentsCountData),
    initialData: initialData,
    getNextPageParam: (_, __, ___, allPageParams) => {
      return getRandomNumber(allPageParams, contentsCountData);
    },
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

  // 새로고침 시 슬라이더 위치 초기화
  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.removeItem("scrollPosition");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const getScrollPosition = (): number => {
    if (typeof window !== "undefined") {
      const scrollPosition = Number(sessionStorage.getItem("scrollPosition"));
      if (scrollPosition) {
        if (isStale) {
          sessionStorage.removeItem("scrollPosition");
          return 0;
        } else {
          return scrollPosition;
        }
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  };
  // url에 id 파라미터 추가
  const pushIdParam = (index: number) => {
    if (searchParams) {
      window.history.replaceState(
        window.history.state,
        "",
        window.location.pathname +
          "?" +
          `${searchParams}&id=${
            shuffledContentsData.pages.map((page) => page.content).flat()[index]
              .id
          }`
      );
    } else {
      window.history.replaceState(
        window.history.state,
        "",
        window.location.pathname +
          "?" +
          `id=${
            shuffledContentsData.pages.map((page) => page.content).flat()[index]
              .id
          }`
      );
    }
  };

  const [animate, setAnimate] = useState(false);

  const handleAnimation = () => {
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
    }, 200);
  };

  return (
    <div className="swiper-container">
      {/* 이 부분 이미지가 바뀔 때 커진 상태에서 작아지는 애니메이션 추가 */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
          overflow: "hidden",
        }}
      >
        <Image
          src={mainImage ? mainImage : no_image.src}
          alt={"provider icon"}
          fill
          priority={true}
          style={{
            objectFit: "cover",
            opacity: 0.2,
          }}
          className={animate ? styles["image-animation"] : ""}
        ></Image>
      </div>
      {shuffledContentsData && (
        <Swiper
          modules={[Mousewheel]}
          mousewheel={{
            thresholdDelta: 20,
            forceToAxis: true,
          }}
          autoHeight={true}
          direction={"vertical"}
          initialSlide={getScrollPosition()}
          onInit={(prop) => {
            pushIdParam(prop.activeIndex);
            setMainImage(
              shuffledContentsData.pages.map((page) => page.content).flat()[
                prop.activeIndex
              ].imageUrl
            );
          }}
          onSlideChange={(prop) => {
            pushIdParam(prop.activeIndex);
            setMainImage(
              shuffledContentsData.pages.map((page) => page.content).flat()[
                prop.activeIndex
              ].imageUrl
            );
            sessionStorage.setItem(
              "scrollPosition",
              prop.activeIndex.toString()
            );
            handleAnimation();
          }}
          onReachEnd={pushMore}
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
                      <h2
                        className={styles.providerTitle}
                        onClick={() => goToLink({ url: content.providerUrl })}
                      >
                        {content.providerTitle}
                      </h2>
                    </div>
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
                    <div className={styles.summaryBox}>
                      <div
                        className={styles.summaryBtn}
                        onClick={() =>
                          goToLink({
                            url: `${BASE_URL}/contents/${content.id}/link`,
                          })
                        }
                      >
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
                    </div>
                  </div>
                  <FloatingBtn />
                </SwiperSlide>
              );
            })}
        </Swiper>
      )}
    </div>
  );
}
