import { Metadata } from "next";
import styles from "./page.module.css";
import carrot_right from "@/../public/assets/carrot_right.svg";
import Link from "next/link";
import Image from "next/image";
import LogoutButton from "./_components/LogoutButton";
export const metadata: Metadata = {
  title: "Dev a Nice Day | 설정",
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
              alt={"carrot_right"}
              src={carrot_right.src}
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
              alt={"carrot_right"}
              src={carrot_right.src}
              width={24}
              height={24}
            />
          </div>
        </Link>
        <LogoutButton />
      </div>
    </div>
  );
}
