"use client";
import styles from "./page.module.css";
import LoginModal from "../_components/LoginModal";
import { getGroupList } from "../_utils/api";
import { MouseEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CheckToken from "../(home)/_components/CheckToken";
import { IGroup } from "..";
import no_image from "@/../public/assets/no_image.svg";
import dots from "@/../public/assets/dots.svg";
import Image from "next/image";

const Profile = () => {
  const router = useRouter();
  const [groupListData, setGroupListData] = useState<{
    content: IGroup[];
  } | null>(null);
  const [isLoginModalOpened, setIsLoginModalOpened] = useState(false);
  const [isDotMenuOpened, setIsDotMenuOpened] = useState<boolean[]>([]);

  useEffect(() => {
    const getGroupListData = async () => {
      const isLogin = await CheckToken();
      if (isLogin) {
        const localTokenData = localStorage.getItem("tokenData");
        if (localTokenData !== null) {
          const tokenData = JSON.parse(localTokenData);
          const groupListData = await getGroupList(tokenData.accessToken);
          setGroupListData(groupListData);
        }
      } else {
        setIsLoginModalOpened(true);
      }
    };
    getGroupListData();
  }, []);

  const closeLoginModal = () => {
    setIsLoginModalOpened(false);
    router.push("/");
  };
  const handleDotMenu = (e: MouseEvent, index: number) => {
    e.stopPropagation();
    const newIsDotMenuOpened = [...isDotMenuOpened];
    newIsDotMenuOpened[index] = !newIsDotMenuOpened[index];
    setIsDotMenuOpened(newIsDotMenuOpened);
  };
  const handleRouteToGroupContents = (name: string) => {
    router.push(`/groupContents/${name}`);
  };
  const handleCloseDotMenu = () => {
    const newIsDotMenuOpened = new Array(isDotMenuOpened.length).fill(false);
    setIsDotMenuOpened(newIsDotMenuOpened);
  };
  return (
    <>
      {isLoginModalOpened && <LoginModal closeLoginModal={closeLoginModal} />}
      <div className={styles.container} onClick={handleCloseDotMenu}>
        <div className={styles.groupedContentsContainer}>
          <h1 className={styles.groupText}>저장한 게시글</h1>
          <div className={styles.groupedContents}>
            {groupListData &&
              groupListData.content.map((content: IGroup, index) => (
                <div
                  className={styles.groupedContentBox}
                  key={index}
                  onClick={() => handleRouteToGroupContents(content.name)}
                >
                  <div className={styles.groupedContentImage}>
                    <Image
                      src={no_image.src}
                      alt="no_image"
                      fill
                      objectFit="cover"
                      style={{ borderRadius: 10 }}
                    />
                    <div
                      className={styles.dotMenu}
                      onClick={(e) => handleDotMenu(e, index)}
                    >
                      <Image
                        src={dots.src}
                        alt="dot_menu"
                        width={20}
                        height={20}
                      />
                    </div>
                    {isDotMenuOpened[index] && (
                      <div className={styles.dotMenuContent}>
                        <h1>삭제</h1>
                      </div>
                    )}
                  </div>
                  <h1 className={styles.contentTitle}>{content.name}</h1>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
