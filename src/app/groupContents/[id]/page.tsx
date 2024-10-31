"use client";

import ContentBox from "@/app/_components/ContentBox";
import styles from "./page.module.css";
import { getContentListInGroup } from "@/app/_utils/api";
import { useEffect, useState } from "react";
interface IContentData {
  id: number;
  providerIconUrl: string;
  providerTitle: string;
  publishedDate: string;
  title: string;
  categories: string[];
  imageUrl: string;
}
const GroupContents = ({ params }: { params: { id: string } }) => {
  const [contentsData, setContentsData] = useState<{ content: IContentData[] }>(
    { content: [] }
  );
  useEffect(() => {
    const getContentList = async () => {
      const localTokenData = localStorage.getItem("tokenData");
      if (localTokenData === null) throw new Error("Token is not found");
      const tokenData = JSON.parse(localTokenData);
      const contentsData: { content: IContentData[] } =
        await getContentListInGroup(params.id, tokenData.accessToken);
      setContentsData(contentsData);
    };
    getContentList();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.contentsCountBox}>
        <h1 className={styles.contentsCount}>{contentsData.content.length}</h1>
        <h1 className={styles.contentsText}>개의 컨텐츠</h1>
      </div>
      <div>
        {contentsData &&
          contentsData.content.map((contentData, index) => (
            <ContentBox
              key={contentData.id}
              contentData={contentData}
              index={index}
              length={contentsData.content.length}
              isDeletable={true}
            />
          ))}
      </div>
    </div>
  );
};

export default GroupContents;
