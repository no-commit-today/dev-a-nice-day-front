import styles from "./CategoryFallback.module.css";

export const categoryFallback = (
  <div className={styles.container}>
    <div
      className={styles.loadingItem}
      style={{ width: 86, height: 16, borderRadius: 5 }}
    ></div>
  </div>
);
