import Image from "next/image";
import styles from "./ContentBox.module.css";
import { BASE_URL } from "../_utils/api";
import { Categories } from "./Categories";
import no_image from "@/../public/assets/no_image.svg";
import useIntersect from "../_hooks/useIntersect";
import {
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";

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
}: {
  contentData: IContentData;
  index: number;
  length: number;
  fetchNextPage: ({}) => Promise<
    InfiniteQueryObserverResult<InfiniteData<any, unknown>, Error>
  >;
}) => {
  const ref = useIntersect(() => {
    fetchNextPage({ cancelRefetch: false });
  });
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
      </div>
    </div>
  );
};

export default ContentBox;
