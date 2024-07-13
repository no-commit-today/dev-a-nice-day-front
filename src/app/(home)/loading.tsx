import { categoryFallback } from "../_components/CategoryFallback";
import styles from "./loading.module.css";
export default function Loading() {
  const CategoryBar = () => categoryFallback;
  return (
    <div className={styles.container}>
      <CategoryBar />
      <div className={styles.contentBox}>
        <div
          className={styles.loadingItem}
          style={{ width: 100, height: 20 }}
        ></div>
        <div className={styles.titleBox}>
          <div
            className={styles.loadingItem}
            style={{ width: 30, height: 30, borderRadius: 5 }}
          ></div>
          <div className={styles.titleWrap}>
            <div
              className={styles.loadingItem}
              style={{ width: 60, height: 10 }}
            ></div>
            <div
              className={styles.loadingItem}
              style={{ width: 200, height: 16 }}
            ></div>
          </div>
        </div>
        <div
          className={styles.loadingItem}
          style={{
            width: "100%",
            height: 350,
            borderRadius: 15,
            marginTop: 10,
          }}
        />
        <div style={{ display: "flex", flexDirection: "row", marginTop: 10 }}>
          <div
            className={styles.loadingItem}
            style={{ width: 70, height: 15, marginLeft: 7 }}
          ></div>
          <div
            className={styles.loadingItem}
            style={{ width: 70, height: 15, marginLeft: 7 }}
          ></div>
        </div>
      </div>
    </div>
  );
}
