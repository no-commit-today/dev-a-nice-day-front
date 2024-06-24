import styles from "./page.module.css";
import carret_right from "@/../public/assets/carret_right.svg";

export default function Setting() {
  return (
    <div className={styles.container}>
      <div className={styles.contentBox}>
        <div className={styles.termsBox}>
          <h1 className={styles.termsText}>서비스 이용 약관</h1>
          <img src={carret_right.src} />
        </div>
        <div className={styles.termsBox}>
          <h1 className={styles.termsText}>개인정보 처리 방침</h1>
          <img src={carret_right.src} />
        </div>
      </div>
    </div>
  );
}
