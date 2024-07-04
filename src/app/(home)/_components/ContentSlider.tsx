"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./ContentSlider.module.css";
import "swiper/css";
import IndexIndicator from "./IndexIndicator";
import Image from "next/image";
import { Categories } from "@/app/_components/Categories";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getPageCount, getShuffledContent } from "@/app/_utils/api";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Mousewheel } from "swiper/modules";

export default function ContentSlider() {
  const searchParams = useSearchParams().toString();
  const categories = Categories;

  const goToLink = ({ url }: { url: string }) => {
    window.open(url);
  };
  const { data: totalPageData, isLoading } = useQuery({
    queryKey: ["totalPageData", searchParams],
    queryFn: () => getPageCount(searchParams),
    staleTime: 5 * 1000 * 60,
    gcTime: 30 * 1000 * 60,
  });
  const getRandomNumber = (allPageParams: number[]) => {
    var pageCount = 50;
    if (totalPageData) {
      pageCount = totalPageData.count;
    }
    // 전체 페이지 개수를 통해 전체 페이지 배열 생성
    const totalNumber = Math.ceil(pageCount / 10);
    var totalPageArray = Array.from({ length: totalNumber }, (_, i) => i + 1);

    // 지금까지 받아왔던 페이지들 배열에서 삭제 (모두 한번씩 다 받아온 경우 그냥 랜덤으로 뿌림)
    if (allPageParams.length < totalNumber) {
      totalPageArray = totalPageArray.filter((n) => !allPageParams.includes(n));
    }

    // 랜덤 인덱스 선택
    const randomIndex = Math.floor(Math.random() * totalPageArray.length);
    const selectedNumber = totalPageArray[randomIndex];

    return selectedNumber;
  };

  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    isStale,
    isFetchedAfterMount,
  } = useInfiniteQuery({
    queryKey: ["shuffledContent", searchParams],
    queryFn: ({ pageParam }) => getShuffledContent(pageParam, searchParams),
    initialPageParam: getRandomNumber([]),
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
      return getRandomNumber(allPageParams);
    },
    enabled: totalPageData !== undefined,
    staleTime: 5 * 1000 * 60,
    gcTime: 30 * 1000 * 60,
  });
  const [contentData, setContentData] = useState<any[] | undefined>(undefined);
  const [scrollPosition, setScrollPosition] = useState(0);
  const swiperRef = useRef<any>(null);

  // 데이터 추가 요청
  const pushMore = async () => {
    if (!isFetchingNextPage) {
      fetchNextPage();
    }
  };

  // 스크롤 포지션 받아오기
  useEffect(() => {
    if (data) {
      if (isStale || isFetchedAfterMount) {
        // 캐싱 시간 지나서 리패치 or 마운트 이후 리패치(새로고침 시)
        // 스크롤 포지션 초기화
        setScrollPosition(0);
        swiperRef.current?.swiper.slideTo(0);
        sessionStorage.removeItem("scrollPosition");
      } else {
        // 데이터가 캐싱되어 있는 경우
        // 스크롤 포지션 복구
        const scrollPosition = Number(sessionStorage.getItem("scrollPosition"));
        if (scrollPosition) {
          setScrollPosition(Number(sessionStorage.getItem("scrollPosition")));
        }
      }
      setContentData(data.pages.map((page) => page.content).flat());
    }
  }, [data]);

  return (
    <div className="swiper-container">
      {contentData && (
        <Swiper
          ref={swiperRef}
          modules={[Mousewheel]}
          mousewheel={{
            thresholdDelta: 20,
            forceToAxis: true,
          }}
          autoHeight={true}
          direction={"vertical"}
          initialSlide={scrollPosition}
          onSlideChange={(prop) => {
            sessionStorage.setItem(
              "scrollPosition",
              prop.activeIndex.toString()
            );
            if (prop.activeIndex === contentData.length - 3) {
              pushMore();
            }
          }}
        >
          {contentData.map((content) => {
            const summaryArray = content.summary
              .split("\n")
              .map((item: string) => item.trim())
              .filter((item: string) => item);

            return (
              <SwiperSlide key={content.id} className={styles.swiperSlide}>
                <div className={styles.slideContainer}>
                  <h1 className={styles.dateText}>{content.publishedDate}</h1>
                  <div className={styles.titleBox}>
                    <Image
                      src={"https://picsum.photos/1000/1000"}
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
                        src={"https://picsum.photos/200/300"}
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
      )}
    </div>
  );
}
