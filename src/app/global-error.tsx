"use client";

import { useEffect } from "react";
import styles from "./not-found.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Error({ error }: { error: Error }) {
  const router = useRouter();
  useEffect(() => {
    console.log(error.cause, error.message, error.name);
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.contentBox}>
        <h1 className={styles.text}>알 수 없는 에러가 발생했습니다. ㅠㅠ</h1>\
        <Link href="/" style={{ marginTop: 30 }}>
          <h1 className={styles.linkText} onClick={() => location.reload()}>
            돌아가기
          </h1>
        </Link>
      </div>
    </div>
  );
}
