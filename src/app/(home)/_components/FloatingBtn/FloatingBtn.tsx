"use client";
import Image from "next/image";
import styles from "./FloatingBtn.module.css";
import share from "../../../../../public/assets/share.svg";
import save from "../../../../../public/assets/save.svg";
import SaveContentModal from "../../../_components/SaveContentModal/SaveContentModal";
import { createPortal } from "react-dom";
import { useState } from "react";
import NewGroupModal from "@/app/_components/NewGroupModal/NewGroupModal";
import ShareModal from "@/app/_components/ShareModal/ShareModal";
import LoginModal from "@/app/_components/LoginModal/LoginModal";
import CheckToken from "../../../_utils/CheckToken";
import queryClient from "@/app/_utils/queryClient";
import useParams from "@/app/_hooks/useParams";
import { InfiniteData } from "@tanstack/react-query";
import { IContentData } from "@/app";

const FloatingBtn = ({
  isSaved,
  contentId,
}: {
  isSaved: boolean;
  contentId: number;
}) => {
  const [isLoginModalOpened, setIsLoginModalOpened] = useState(false);
  const [isSaveModalOpened, setIsSaveModalOpened] = useState(false);
  const [isShareModalOpened, setIsShareModalOpened] = useState(false);
  const [isNewGroupModalOpened, setIsNewGroupModalOpened] = useState(false);
  const [isSavedContent, setIsSavedContent] = useState(isSaved);
  const searchParams = useParams("categories").getParamsToString();

  const handleSaveBtnClick = async () => {
    const isLogin = await CheckToken();
    if (isLogin) {
      setIsSaveModalOpened(true);
    } else {
      setIsLoginModalOpened(true);
    }
  };

  const updateQueryData = (bookmarked: boolean) =>
    queryClient.setQueryData(
      ["shuffledContents", searchParams],
      (oldData: InfiniteData<{ content: IContentData[] }, unknown>) => {
        const updatedPages = oldData.pages.map((page) => {
          const updatedContent = page.content.map((item) => {
            if (item.id === contentId) {
              return { ...item, bookmarked }; // 새로운 객체 반환
            }
            return item; // 원본 객체 반환
          });
          return { ...page, content: updatedContent }; // 새로운 페이지 객체 반환
        });
        return { ...oldData, pages: updatedPages }; // 새로운 oldData 객체 반환
      }
    );
  const closeSaveModal = (isSaved: boolean | null) => {
    setIsSaveModalOpened(false);
    if (isSaved === true) {
      setIsSavedContent(true);
      updateQueryData(true);
    } else if (isSaved === false) {
      setIsSavedContent(false);
      updateQueryData(false);
    }
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
  const closeLoginModal = () => {
    setIsLoginModalOpened(false);
  };

  return (
    <>
      {isLoginModalOpened &&
        createPortal(
          <LoginModal closeLoginModal={closeLoginModal} />,
          document.body
        )}
      {isSaveModalOpened &&
        createPortal(
          <SaveContentModal
            closeSaveModal={closeSaveModal}
            openNewGroupModal={openNewGroupModal}
            contentId={contentId}
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
          <ShareModal
            closeShareModal={closeShareModal}
            contentId={contentId}
          />,
          document.body
        )}
      <div className={styles.container}>
        <div className={styles.floatingWrap}>
          <div className={styles.btnWrap}>
            <button
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
            </button>
            <h6 className={styles.text}>공유</h6>
          </div>
          <div className={styles.btnWrap}>
            <button
              className={styles.floatingBtn}
              style={isSavedContent ? { backgroundColor: "#DE6985" } : {}}
              onClick={handleSaveBtnClick}
            >
              <Image
                src={save.src}
                alt="saveContentBtn"
                width={20}
                height={20}
                style={{ zIndex: 2 }}
              />
            </button>
            <h6 className={styles.text}>저장</h6>
          </div>
        </div>
      </div>
    </>
  );
};

export default FloatingBtn;
