import Image from "next/image";
import styles from "./ContentBox.module.css";
import { BASE_URL } from "../_utils/api";
import { Categories } from "./Categories";
import no_image from "@/../public/assets/no_image.svg";
import dots from "@/../public/assets/dots.svg";
import useIntersect from "../_hooks/useIntersect";
import {
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import { MouseEvent, useState } from "react";

interface IContentData {
  id: number;
  providerIconUrl: string;
  providerTitle: string;
  publishedDate: string;
  title: string;
  categories: string[];
  imageUrl: string;
}

const ContentBox = ({
  contentData,
  index,
  length,
  fetchNextPage,
  handleDelete,
}: {
  contentData: IContentData;
  index: number;
  length: number;
  fetchNextPage?: ({}) => Promise<
    InfiniteQueryObserverResult<InfiniteData<any, unknown>, Error>
  >;
  handleDelete?: ({ contentId }: { contentId: number }) => void;
}) => {
  const ref = useIntersect(() => {
    if (fetchNextPage) fetchNextPage({ cancelRefetch: false });
  });
  const [isDotMenuOpened, setIsDotMenuOpened] = useState(false);
  const handleDotMenu = (e: MouseEvent) => {
    e.stopPropagation();
    setIsDotMenuOpened((prev) => !prev);
  };
  return (
    <div
      key={contentData.id}
      ref={index === length - 2 ? ref : null}
      className={styles.contentBox}
      onClick={() => window.open(`${BASE_URL}/contents/${contentData.id}/link`)}
    >
      <div className={styles.leftBox}>
        <div className={styles.titleBox}>
          <Image
            src={
              contentData.providerIconUrl
                ? contentData.providerIconUrl
                : no_image.src
            }
            alt={"provider icon"}
            width={20}
            height={20}
            style={{ borderRadius: 4 }}
          ></Image>
          <h1 className={styles.providerTitle}>{contentData.providerTitle}</h1>
          <h2 className={styles.dateText}>{contentData.publishedDate}</h2>
        </div>
        <h1 className={styles.contentTitle}>{contentData.title}</h1>
        <div className={styles.categoryBox}>
          {contentData.categories.map((category) => `${Categories[category]} `)}
        </div>
      </div>
      <div className={styles.rightBox}>
        <Image
          src={contentData.imageUrl ? contentData.imageUrl : no_image.src}
          alt={"content image"}
          width={90}
          height={60}
          style={{ borderRadius: 10 }}
        ></Image>
        {handleDelete && (
          <>
            <div className={styles.dotMenu} onClick={(e) => handleDotMenu(e)}>
              <Image src={dots.src} alt="dot_menu" width={20} height={20} />
            </div>
            {isDotMenuOpened && (
              <div
                className={styles.dotMenuContent}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete({ contentId: contentData.id });
                }}
              >
                <h1>삭제</h1>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ContentBox;
