import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.contentBox}>
        <h1 className={styles.text}>
          404 - 요청하신 페이지를 찾을 수 없어요. ㅠㅠ
        </h1>
        <Link href="/" style={{ marginTop: 30 }}>
          <h1 className={styles.linkText}>돌아가기</h1>
        </Link>
      </div>
    </div>
  );
}
