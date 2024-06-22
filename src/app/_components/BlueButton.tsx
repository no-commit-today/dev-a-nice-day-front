"use client";
import { useRouter } from "next/navigation";
import styles from "./BlueButton.module.css";
export default function BlueButton({
  onClick,
  disabled,
  title,
}: {
  onClick?: () => void;
  disabled: boolean;
  title: string;
}) {
  const router = useRouter();
  return (
    <button
      className={styles.button}
      onClick={() => router.push("/")}
      disabled={disabled}
    >
      {title}
    </button>
  );
}
