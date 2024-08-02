"use client";

import { useEffect } from "react";
import styles from "./not-found.module.css";
import Link from "next/link";

export default function Error({ error }: { error: Error }) {
  useEffect(() => {
    console.log(error);
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.contentBox}>
        <h1 className={styles.text}>서버 에러가 발생했습니다. ㅠㅠ</h1>
        <Link href="/" style={{ marginTop: 30 }}>
          <h1 className={styles.linkText}>돌아가기</h1>
        </Link>
      </div>
    </div>
  );
}
