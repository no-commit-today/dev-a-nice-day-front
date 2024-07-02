import CategoryButton from "../_components/CategoryButton";
import ContentList from "./_components/ContentList";
import styles from "./page.module.css";

export default function Content() {
  return (
    <div className={styles.container}>
      <div className={styles.contentBox}>
        <CategoryButton />
        <div className={styles.contentList}>
          <ContentList />
        </div>
      </div>
    </div>
  );
}
