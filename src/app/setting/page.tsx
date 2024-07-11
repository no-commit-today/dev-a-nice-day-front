import { Metadata } from "next";
import styles from "./page.module.css";
import carret_right from "@/../public/assets/carret_right.svg";
import Link from "next/link";
import Image from "next/image";
export const metadata: Metadata = {
  title: "설정 | 테크스와이프",
};
export default function Setting() {
  return (
    <div className={styles.container}>
      <div className={styles.contentBox}>
        <Link
          href="https://github.com/no-commit-today/tech-swipe-cs/blob/main/약관/서비스%20이용%20약관.md"
          passHref
          target="_blank"
        >
          <div className={styles.termsBox}>
            <h1 className={styles.termsText}>서비스 이용 약관</h1>
            <Image
              alt={"carret_right"}
              src={carret_right.src}
              width={24}
              height={24}
            />
          </div>
        </Link>
        <Link
          href="https://github.com/no-commit-today/tech-swipe-cs"
          passHref
          target="_blank"
        >
          <div className={styles.termsBox}>
            <h1 className={styles.termsText}>고객센터</h1>
            <Image
              alt={"carret_right"}
              src={carret_right.src}
              width={24}
              height={24}
            />
          </div>
        </Link>
      </div>
    </div>
  );
}
