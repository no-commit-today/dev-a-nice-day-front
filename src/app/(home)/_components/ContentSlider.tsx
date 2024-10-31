"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./ContentSlider.module.css";
import "swiper/css";
import IndexIndicator from "./IndexIndicator";
import Image from "next/image";
import { Categories } from "@/app/_components/Categories";
import { useInfiniteQuery } from "@tanstack/react-query";
import { BASE_URL, getShuffledContents } from "@/app/_utils/api";
import { useEffect } from "react";
import { Mousewheel } from "swiper/modules";
import useParams from "@/app/_hooks/useParams";
import no_image from "@/../public/assets/no_image.svg";
import getRandomNumber from "@/app/_utils/getRandomNumber";
import FloatingBtn from "./FloatingBtn";
import BackImage from "./BackImage";
import { useSearchParams } from "next/navigation";
import ContentFallBack from "./ContentSliderFallback";

export default function ContentSlider({
  // initialData,
  contentsCountData,
}: {
  // initialData: { pages: { content: IContentData[] }[]; pageParams: number[] };
  contentsCountData: { count: number };
}) {
  const searchParams = useParams("categories").getParamsToString();
  const initialId = useSearchParams().get("id");

  const {
    data: shuffledContentsData,
    fetchNextPage,
    isFetchingNextPage,
    isStale,
  } = useInfiniteQuery({
    queryKey: ["shuffledContents", searchParams],
    queryFn: ({ pageParam }) =>
      getShuffledContents(pageParam, searchParams, initialId),
    initialPageParam: getRandomNumber([], contentsCountData),
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
            shuffledContentsData?.pages.map((page) => page.content).flat()[
              index
            ].id
          }`
      );
    } else {
      window.history.replaceState(
        window.history.state,
        "",
        window.location.pathname +
          "?" +
          `id=${
            shuffledContentsData?.pages.map((page) => page.content).flat()[
              index
            ].id
          }`
      );
    }
  };

  return (
    <div>
      {shuffledContentsData ? (
        <Swiper
          modules={[Mousewheel]}
          mousewheel={{
            thresholdDelta: 30,
            forceToAxis: true,
          }}
          autoHeight={true}
          direction={"vertical"}
          initialSlide={getScrollPosition()}
          onInit={(prop) => {
            pushIdParam(prop.activeIndex);
          }}
          onSlideChange={(prop) => {
            pushIdParam(prop.activeIndex);
            sessionStorage.setItem(
              "scrollPosition",
              prop.activeIndex.toString()
            );
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
                  {({ isActive }) => (
                    <>
                      <BackImage
                        imageUrl={content.imageUrl}
                        isActive={isActive}
                      />

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
                            onClick={() =>
                              goToLink({ url: content.providerUrl })
                            }
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
                      <FloatingBtn
                        isSaved={content.bookmarked}
                        contentId={content.id}
                      />
                    </>
                  )}
                </SwiperSlide>
              );
            })}
        </Swiper>
      ) : (
        <ContentFallBack />
      )}
    </div>
  );
}
