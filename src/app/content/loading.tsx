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
          style={{
            width: "100%",
            height: 80,
            borderRadius: 15,
            marginBottom: 15,
          }}
        ></div>
        <div
          className={styles.loadingItem}
          style={{
            width: "100%",
            height: 80,
            borderRadius: 15,
            marginBottom: 15,
          }}
        ></div>
        <div
          className={styles.loadingItem}
          style={{
            width: "100%",
            height: 80,
            borderRadius: 15,
            marginBottom: 15,
          }}
        ></div>
        <div
          className={styles.loadingItem}
          style={{
            width: "100%",
            height: 80,
            borderRadius: 15,
            marginBottom: 15,
          }}
        ></div>

        <div
          className={styles.loadingItem}
          style={{
            width: "100%",
            height: 80,
            borderRadius: 15,
            marginBottom: 15,
          }}
        ></div>
        <div
          className={styles.loadingItem}
          style={{
            width: "100%",
            height: 80,
            borderRadius: 15,
            marginBottom: 15,
          }}
        ></div>
        <div
          className={styles.loadingItem}
          style={{
            width: "100%",
            height: 80,
            borderRadius: 15,
            marginBottom: 15,
          }}
        ></div>
        <div
          className={styles.loadingItem}
          style={{
            width: "100%",
            height: 80,
            borderRadius: 15,
            marginBottom: 15,
          }}
        ></div>
        <div
          className={styles.loadingItem}
          style={{
            width: "100%",
            height: 80,
            borderRadius: 15,
            marginBottom: 15,
          }}
        ></div>
        <div
          className={styles.loadingItem}
          style={{
            width: "100%",
            height: 80,
            borderRadius: 15,
            marginBottom: 15,
          }}
        ></div>
        <div
          className={styles.loadingItem}
          style={{
            width: "100%",
            height: 80,
            borderRadius: 15,
            marginBottom: 15,
          }}
        ></div>
        <div
          className={styles.loadingItem}
          style={{
            width: "100%",
            height: 80,
            borderRadius: 15,
            marginBottom: 15,
          }}
        ></div>
        <div
          className={styles.loadingItem}
          style={{
            width: "100%",
            height: 80,
            borderRadius: 15,
            marginBottom: 15,
          }}
        ></div>
        <div
          className={styles.loadingItem}
          style={{
            width: "100%",
            height: 80,
            borderRadius: 15,
            marginBottom: 15,
          }}
        ></div>
      </div>
    </div>
  );
}
