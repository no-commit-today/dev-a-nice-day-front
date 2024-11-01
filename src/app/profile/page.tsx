"use client";
import styles from "./page.module.css";
import LoginModal from "../_components/LoginModal";
import { deleteGroup, getGroupList } from "../_utils/api";
import { MouseEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CheckToken from "../(home)/_components/CheckToken";
import { IGroup } from "..";
import no_image from "@/../public/assets/no_image.svg";
import dots from "@/../public/assets/dots.svg";
import plus_gray from "@/../public/assets/plus_gray.svg";
import Image from "next/image";
import NewGroupModal from "../_components/NewGroupModal";

const Profile = () => {
  const router = useRouter();
  const [groupListData, setGroupListData] = useState<{
    content: IGroup[];
  } | null>(null);
  const [isLoginModalOpened, setIsLoginModalOpened] = useState(false);
  const [isDotMenuOpened, setIsDotMenuOpened] = useState<boolean[]>([]);
  const [isNewGroupModalOpened, setIsNewGroupModalOpened] = useState(false);

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
  const handleDeleteGroup = async (e: MouseEvent, name: string) => {
    //name만 뺀 새로운 groupListData를 만들어서 setGroupListData
    if (groupListData !== null) {
      const newGroupListData = groupListData.content.filter(
        (content) => content.name !== name
      );
      setGroupListData({ content: newGroupListData });
    }

    e.stopPropagation();
    const localTokenData = localStorage.getItem("tokenData");
    if (localTokenData !== null) {
      const tokenData = JSON.parse(localTokenData);
      await deleteGroup(name, tokenData.accessToken);
      const groupListData = await getGroupList(tokenData.accessToken);
      setGroupListData(groupListData);
    }
  };
  const closeNewGroupModal = async () => {
    setIsNewGroupModalOpened(false);
    const localTokenData = localStorage.getItem("tokenData");
    if (localTokenData !== null) {
      const tokenData = JSON.parse(localTokenData);
      const groupListData = await getGroupList(tokenData.accessToken);
      setGroupListData(groupListData);
    }
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
                      <div
                        className={styles.dotMenuContent}
                        onClick={(e) => handleDeleteGroup(e, content.name)}
                      >
                        <h1>삭제</h1>
                      </div>
                    )}
                  </div>
                  <h1 className={styles.contentTitle}>{content.name}</h1>
                </div>
              ))}
            <div
              className={styles.groupedContentBox}
              onClick={() => setIsNewGroupModalOpened(true)}
            >
              <div
                className={styles.groupedContentImage}
                style={{ backgroundColor: "#63667A" }}
              >
                <Image
                  src={plus_gray.src}
                  alt="newGroup"
                  width={100}
                  height={100}
                />
              </div>
              <h1 className={styles.contentTitle}>새 그룹</h1>
            </div>
            {isNewGroupModalOpened && (
              <NewGroupModal closeNewGroupModal={closeNewGroupModal} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
