"use client";
import styles from "./page.module.css";
import LoginModal from "../_components/LoginModal/LoginModal";
import { deleteGroup, getGroupList } from "../_utils/api";
import { MouseEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IGroup } from "..";
import no_image from "@/../public/assets/no_image.svg";
import dots from "@/../public/assets/dots.svg";
import plus_gray from "@/../public/assets/plus_gray.svg";
import Image from "next/image";
import NewGroupModal from "../_components/NewGroupModal/NewGroupModal";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createPortal } from "react-dom";
import queryClient from "../_utils/queryClient";

const Profile = () => {
  const router = useRouter();

  const localTokenData = localStorage.getItem("tokenData");
  if (localTokenData === null) throw new Error("Token is not found");
  const tokenData = JSON.parse(localTokenData);

  const { data: groupListData, isSuccess: isListDataFetched } = useQuery<{
    content: IGroup[];
  }>({
    queryKey: ["groupListData"],
    queryFn: () => getGroupList(tokenData.accessToken),
    enabled: !!tokenData,
  });

  const { mutate: deleteGroupFn } = useMutation({
    mutationFn: ({ groupName }: { groupName: string }) =>
      deleteGroup(groupName, tokenData.accessToken),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["groupListData"] }),
  });

  const [isLoginModalOpened, setIsLoginModalOpened] = useState(false);
  const [isDotMenuOpened, setIsDotMenuOpened] = useState<boolean[]>([]);
  const [isNewGroupModalOpened, setIsNewGroupModalOpened] = useState(false);

  useEffect(() => {
    if (isListDataFetched) {
      setIsDotMenuOpened(new Array(groupListData.content.length).fill(false));
    }
  }, [isListDataFetched]);

  const handleDotMenu = (e: MouseEvent, index: number) => {
    e.stopPropagation();
    const newIsDotMenuOpened = [...isDotMenuOpened].map((value, idx) => {
      if (index === idx) {
        value = !value;
      } else {
        value = false;
      }
      return value;
    });
    setIsDotMenuOpened(newIsDotMenuOpened);
  };
  const handleRouteToGroupContents = (name: string) => {
    router.push(`/groupContents/${name}`);
  };
  const handleCloseDotMenu = () => {
    const newIsDotMenuOpened = new Array(isDotMenuOpened.length).fill(false);
    setIsDotMenuOpened(newIsDotMenuOpened);
  };
  const handleDeleteGroup = (e: MouseEvent, name: string) => {
    e.stopPropagation();
    deleteGroupFn({ groupName: name });
    handleCloseDotMenu();
  };
  const closeNewGroupModal = () => {
    setIsNewGroupModalOpened(false);
  };
  return (
    <>
      {isLoginModalOpened && <LoginModal />}
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
            {isNewGroupModalOpened &&
              createPortal(
                <NewGroupModal closeNewGroupModal={closeNewGroupModal} />,
                document.body
              )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
