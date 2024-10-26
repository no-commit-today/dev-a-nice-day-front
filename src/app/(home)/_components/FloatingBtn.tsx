"use client";
import Image from "next/image";
import styles from "./FloatingBtn.module.css";
import share from "@/../public/assets/share.svg";
import save from "@/../public/assets/save.svg";
import SaveContentModal from "../../_components/SaveContentModal";
import { createPortal } from "react-dom";
import { useState } from "react";
import NewGroupModal from "@/app/_components/NewGroupModal";
import ShareModal from "@/app/_components/ShareModal";

const FloatingBtn = () => {
  const [isSaveModalOpened, setIsSaveModalOpened] = useState(false);
  const [isShareModalOpened, setIsShareModalOpened] = useState(false);
  const [isNewGroupModalOpened, setIsNewGroupModalOpened] = useState(false);

  const closeSaveModal = () => {
    setIsSaveModalOpened(false);
  };

  const openNewGroupModal = () => {
    setIsSaveModalOpened(false);
    setIsNewGroupModalOpened(true);
  };

  const closeNewGroupModal = () => {
    setIsNewGroupModalOpened(false);
  };

  const closeShareModal = () => {
    setIsShareModalOpened(false);
  };

  return (
    <>
      {isSaveModalOpened &&
        createPortal(
          <SaveContentModal
            closeSaveModal={closeSaveModal}
            openNewGroupModal={openNewGroupModal}
          />,
          document.body
        )}
      {isNewGroupModalOpened &&
        createPortal(
          <NewGroupModal closeNewGroupModal={closeNewGroupModal} />,
          document.body
        )}
      {isShareModalOpened &&
        createPortal(
          <ShareModal closeShareModal={closeShareModal} />,
          document.body
        )}
      <div className={styles.container}>
        <div className={styles.floatingWrap}>
          <div className={styles.btnWrap}>
            <div
              className={styles.floatingBtn}
              onClick={() => setIsShareModalOpened(true)}
            >
              <Image
                src={share.src}
                alt="shareBtn"
                width={20}
                height={20}
                style={{ zIndex: 2 }}
              />
            </div>
            <h6 className={styles.text}>공유</h6>
          </div>
          <div className={styles.btnWrap}>
            <div
              className={styles.floatingBtn}
              onClick={() => setIsSaveModalOpened(true)}
            >
              <Image
                src={save.src}
                alt="saveContentBtn"
                width={20}
                height={20}
                style={{ zIndex: 2 }}
              />
            </div>
            <h6 className={styles.text}>저장</h6>
          </div>
        </div>
      </div>
    </>
  );
};

export default FloatingBtn;
