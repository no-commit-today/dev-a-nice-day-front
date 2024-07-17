"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./ContentSlider.module.css";
import "swiper/css";
import IndexIndicator from "./IndexIndicator";
import Image from "next/image";
import { Categories } from "@/app/_components/Categories";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  BASE_URL,
  getContentsCount,
  getShuffledContents,
} from "@/app/_utils/api";
import { useEffect, useState } from "react";
import { Mousewheel } from "swiper/modules";
import useParams from "@/app/_hooks/useParams";
import { IContentData } from "@/app";
import no_image from "@/../public/assets/no_image.svg";

export default function ContentSlider() {
  // 몇페이지 전에 패치할 것인지.
  const pagesBeforeFetch = 3;
  const searchParams = useParams("category").getParamsToString();
  const [contentsData, setContentsData] = useState<IContentData[] | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const getRandomNumber = (allPageParams: number[]) => {
    if (contentsCountData) {
      // 전체 콘텐츠 개수를 통해 전체 페이지 개수를 계산
      let pagesCount = Math.ceil(contentsCountData.count / 10);

      // 전체 페이지 개수를 통해 전체 페이지 배열 생성
      let totalPageArray = Array.from({ length: pagesCount }, (_, i) => i + 1);

      // 지금까지 받아왔던 페이지들 배열에서 삭제 (모두 한번씩 다 받아온 경우 그냥 랜덤으로 뿌림)
      if (allPageParams.length < pagesCount) {
        totalPageArray = totalPageArray.filter(
          (n) => !allPageParams.includes(n)
        );
      }

      // 랜덤 인덱스 선택
      const randomIndex = Math.floor(Math.random() * totalPageArray.length);

      return totalPageArray[randomIndex];
    }
    return 1;
  };

  const goToLink = ({ url }: { url: string }) => {
    window.open(url);
  };

  // 데이터 추가 요청
  const pushMore = async () => {
    if (!isFetchingNextPage) {
      await fetchNextPage();
    }
  };

  const { data: contentsCountData } = useQuery({
    queryKey: ["contentsCountData", searchParams],
    queryFn: () => getContentsCount(searchParams),
    staleTime: 5 * 1000 * 60,
    gcTime: 30 * 1000 * 60,
  });

  const {
    data: shuffledContentsData,
    fetchNextPage,
    isFetchingNextPage,
    isStale,
    isFetchedAfterMount,
  } = useInfiniteQuery({
    queryKey: ["shuffledContents", searchParams],
    queryFn: ({ pageParam }) => getShuffledContents(pageParam, searchParams),
    initialPageParam: getRandomNumber([]),
    getNextPageParam: (_, __, ___, allPageParams) => {
      return getRandomNumber(allPageParams);
    },
    enabled: contentsCountData !== undefined,
    staleTime: 5 * 1000 * 60,
    gcTime: 30 * 1000 * 60,
  });

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
      setContentsData(
        shuffledContentsData.pages.map((page) => page.content).flat()
      );
    }
  }, [shuffledContentsData, isStale, isFetchedAfterMount]);

  return (
    <div className="swiper-container">
      {contentsData && (
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
            sessionStorage.setItem(
              "scrollPosition",
              prop.activeIndex.toString()
            );
            if (prop.activeIndex === contentsData.length - pagesBeforeFetch) {
              pushMore();
            }
          }}
        >
          {contentsData.map((content) => {
            const summaryArray = content.summary
              .split("\n")
              .map((item) => item.trim())
              .filter((item) => item);

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
                      <Image
                        src={content.imageUrl ? content.imageUrl : no_image.src}
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
                        {summaryArray.map((summary, index) => {
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
                      {content.categories.map((category, index) => {
                        return (
                          <h2 key={index} className={styles.categoryText}>
                            {Categories[category]}
                          </h2>
                        );
                      })}
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
