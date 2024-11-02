import styles from "../loading.module.css";

const ContentFallBack = () => (
  <div className={styles.container}>
    <div className={styles.row} style={{ marginTop: 10, alignItems: "center" }}>
      <div
        className={styles.loadingItem}
        style={{ width: 30, height: 30, borderRadius: 7 }}
      />
      <div
        className={styles.loadingItem}
        style={{ width: 100, height: 20, marginLeft: 10 }}
      />
    </div>

    <div
      className={styles.loadingItem}
      style={{ width: "100%", height: 28, marginTop: 15 }}
    />
    <div
      className={styles.loadingItem}
      style={{ width: 200, height: 28, marginTop: 5 }}
    />
    <div className={styles.row} style={{ marginTop: 10 }}>
      <div className={styles.loadingItem} style={{ width: 100, height: 20 }} />
      <div
        className={styles.loadingItem}
        style={{ width: 70, height: 20, marginLeft: 10 }}
      />
    </div>
    <div className={styles.row} style={{ marginTop: 25 }}>
      <div
        className={styles.loadingItem}
        style={{ width: 23, height: 23, borderRadius: 5 }}
      />
      <div
        className={styles.loadingItem}
        style={{ width: "100%", height: 50, marginLeft: 10 }}
      />
    </div>
    <div className={styles.row} style={{ marginTop: 10 }}>
      <div
        className={styles.loadingItem}
        style={{ width: 23, height: 23, borderRadius: 5 }}
      />
      <div
        className={styles.loadingItem}
        style={{ width: "100%", height: 50, marginLeft: 10 }}
      />
    </div>
    <div className={styles.row} style={{ marginTop: 10 }}>
      <div
        className={styles.loadingItem}
        style={{ width: 23, height: 23, borderRadius: 5 }}
      />
      <div
        className={styles.loadingItem}
        style={{ width: "100%", height: 50, marginLeft: 10 }}
      />
    </div>
    <div className={styles.floatingBtnContainer}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div className={styles.floatingBtnLoadingItem} />
        <div className={styles.floatingTextLoadingItem} />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginLeft: 20,
        }}
      >
        <div className={styles.floatingBtnLoadingItem} />
        <div className={styles.floatingTextLoadingItem} />
      </div>
    </div>
  </div>
);

export default ContentFallBack;
