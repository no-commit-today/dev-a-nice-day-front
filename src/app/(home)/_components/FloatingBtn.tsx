import Image from "next/image";
import styles from "./FloatingBtn.module.css";
import share from "@/../public/assets/share.svg";
import save from "@/../public/assets/save.svg";
const FloatingBtn = () => {
  return (
    <div className={styles.container}>
      <div className={styles.floatingWrap}>
        <div className={styles.floatingBtn}>
          <Image
            src={share.src}
            alt="shareBtn"
            width={20}
            height={20}
            style={{ zIndex: 2 }}
          />
        </div>
        <h6 className={styles.text}>공유</h6>
        <div className={styles.floatingBtn}>
          <Image
            src={save.src}
            alt="shareBtn"
            width={20}
            height={20}
            style={{ zIndex: 2 }}
          />
        </div>
        <h6 className={styles.text}>저장</h6>
      </div>
    </div>
  );
};

export default FloatingBtn;
