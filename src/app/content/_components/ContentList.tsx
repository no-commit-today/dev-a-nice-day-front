import Image from "next/image";
import styles from "./ContentList.module.css";
export default function ContentList({ contentData }: { contentData: any[] }) {
  return (
    <div className={styles.container}>
      {contentData.map((content) => (
        <div key={content.id} className={styles.contentBox}>
          <div className={styles.leftBox}>
            <div className={styles.titleBox}>
              <Image
                src={content.providerIconUrl}
                alt={"provider icon"}
                width={20}
                height={20}
                style={{ borderRadius: 4 }}
              ></Image>
              <h1 className={styles.providerTitle}>{content.providerTitle}</h1>
              <h2 className={styles.dateText}>{content.publishedDate}</h2>
            </div>
            <h1 className={styles.contentTitle}>{content.title}</h1>
            <div className={styles.categoryBox}>
              {content.categories.map((category: string) => (
                <div key={category} className={styles.category}>
                  {category}
                </div>
              ))}
            </div>
          </div>
          <div className={styles.rightBox}>
            <Image
              src={content.imageUrl}
              alt={"content image"}
              width={90}
              height={60}
              style={{ borderRadius: 10 }}
            ></Image>
          </div>
        </div>
      ))}
    </div>
  );
}
