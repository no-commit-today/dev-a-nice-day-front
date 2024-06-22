import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Link href="/onboarding">온보딩 모달</Link>
    </div>
  );
}
