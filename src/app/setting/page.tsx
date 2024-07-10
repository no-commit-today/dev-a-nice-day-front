import { Metadata } from "next";
import styles from "./page.module.css";
import carret_right from "@/../public/assets/carret_right.svg";
import Link from "next/link";
export const metadata: Metadata = {
  title: "설정 | 테크스와이프",
};
export default function Setting() {
  return (
    <div className={styles.container}>
      <div className={styles.contentBox}>
        <Link
          href="https://hilarious-grass-1f6.notion.site/606a35d0a34047efa89ab323f7a9a6c7"
          passHref
          target="_blank"
        >
          <div className={styles.termsBox}>
            <h1 className={styles.termsText}>서비스 이용 약관</h1>
            <img src={carret_right.src} />
          </div>
        </Link>
        <Link
          href="https://github.com/no-commit-today/tech-swipe-cs"
          passHref
          target="_blank"
        >
          <div className={styles.termsBox}>
            <h1 className={styles.termsText}>고객센터</h1>
            <img src={carret_right.src} />
          </div>
        </Link>
      </div>
    </div>
  );
}
