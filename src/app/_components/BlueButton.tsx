"use client";
import styles from "./BlueButton.module.css";
import SetCookie from "./SetCookie";
export default function BlueButton({
  disabled,
  title,
}: {
  disabled: boolean;
  title: string;
}) {
  const onClick = () => {
    // 서버컴포넌트로 쿠키 설정
    SetCookie();
  };
  return (
    <button className={styles.button} onClick={onClick} disabled={disabled}>
      {title}
    </button>
  );
}
