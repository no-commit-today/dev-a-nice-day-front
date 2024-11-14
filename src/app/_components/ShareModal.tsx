"use client";
import { useEffect, useState } from "react";
import styles from "./ShareModal.module.css";
import Image from "next/image";
import Check_White from "@/../public/assets/check_white.svg";

const ShareModal = ({
  closeShareModal,
  contentId,
}: {
  closeShareModal: () => void;
  contentId: string;
}) => {
  // const [href, setHref] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  // useEffect(() => {
  //   setHref(window.location.href);
  // }, []);
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(
        `${process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URI}/?id=${contentId}`
      );
      setIsCopied(true);
      alert("복사되었습니다.");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={styles.background} onClick={closeShareModal}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h1 className={styles.title}>공유</h1>
        </div>
        <div className={styles.shareWrap}>
          <input
            type="text"
            className={styles.input}
            value={`${process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URI}/?id=${contentId}`}
            readOnly
          />
          <button className={styles.copyBtn} onClick={copyToClipboard}>
            {isCopied ? (
              <Image src={Check_White.src} alt="check" width={14} height={14} />
            ) : (
              "복사"
            )}
          </button>
        </div>
        <button className={styles.btnWrap} onClick={closeShareModal}>
          <Image src={Check_White.src} alt="check" width={14} height={14} />
          <h1 className={styles.doneText}>완료</h1>
        </button>
      </div>
    </div>
  );
};

export default ShareModal;
