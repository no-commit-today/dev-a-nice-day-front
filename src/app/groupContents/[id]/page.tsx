import ContentBox from "@/app/_components/ContentBox";
import styles from "./page.module.css";
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
  const contentsData: IContentData[] = [
    {
      id: 1,
      providerIconUrl:
        "https://techswipe-images.s3.ap-northeast-2.amazonaws.com/provider/e3a19019-59f9-43ba-83de-dbffd6b885ad.jpg",
      providerTitle: "youtube",
      publishedDate: "2021-10-20",
      title: "title1",
      categories: ["category1", "category2"],
      imageUrl:
        "https://techswipe-images.s3.ap-northeast-2.amazonaws.com/content/086cc3ea-3c64-4758-b17d-efda968cb16b.jpg",
    },
    {
      id: 2,
      providerIconUrl:
        "https://techswipe-images.s3.ap-northeast-2.amazonaws.com/provider/e3a19019-59f9-43ba-83de-dbffd6b885ad.jpg",
      providerTitle: "youtube",
      publishedDate: "2021-10-20",
      title: "title2",
      categories: ["category1", "category2"],
      imageUrl:
        "https://techswipe-images.s3.ap-northeast-2.amazonaws.com/content/086cc3ea-3c64-4758-b17d-efda968cb16b.jpg",
    },
    {
      id: 3,
      providerIconUrl:
        "https://techswipe-images.s3.ap-northeast-2.amazonaws.com/provider/e3a19019-59f9-43ba-83de-dbffd6b885ad.jpg",
      providerTitle: "youtube",
      publishedDate: "2021-10-20",
      title: "title3",
      categories: ["category1", "category2"],
      imageUrl:
        "https://techswipe-images.s3.ap-northeast-2.amazonaws.com/content/086cc3ea-3c64-4758-b17d-efda968cb16b.jpg",
    },
    {
      id: 4,
      providerIconUrl:
        "https://techswipe-images.s3.ap-northeast-2.amazonaws.com/provider/e3a19019-59f9-43ba-83de-dbffd6b885ad.jpg",
      providerTitle: "youtube",
      publishedDate: "2021-10-20",
      title: "title4",
      categories: ["category1", "category2"],
      imageUrl:
        "https://techswipe-images.s3.ap-northeast-2.amazonaws.com/content/086cc3ea-3c64-4758-b17d-efda968cb16b.jpg",
    },
  ];
  return (
    <div className={styles.container}>
      <div className={styles.contentsCountBox}>
        <h1 className={styles.contentsCount}>4</h1>
        <h1 className={styles.contentsText}>개의 컨텐츠</h1>
      </div>
      <div className={styles.contentBoxWrap}>
        {contentsData.map((contentData, index) => (
          <ContentBox
            key={contentData.id}
            contentData={contentData}
            index={index}
            length={contentsData.length}
          ></ContentBox>
        ))}
      </div>
    </div>
  );
};

export default GroupContents;
