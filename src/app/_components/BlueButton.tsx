"use client";
import { redirect, useRouter } from "next/navigation";
import styles from "./BlueButton.module.css";
export default function BlueButton({
  disabled,
  title,
}: {
  disabled: boolean;
  title: string;
}) {
  const router = useRouter();
  const onClick = () => {
    if (typeof window !== "undefined") {
      const popup = localStorage.setItem("popup", "true");
      router.back();
    }
  };
  return (
    <button className={styles.button} onClick={onClick} disabled={disabled}>
      {title}
    </button>
  );
}
