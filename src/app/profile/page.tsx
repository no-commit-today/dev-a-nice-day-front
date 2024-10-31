"use client";
import styles from "./page.module.css";
import Link from "next/link";
import LoginModal from "../_components/LoginModal";
import { getGroupList } from "../_utils/api";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CheckToken from "../(home)/_components/CheckToken";
import { IGroup } from "..";
import No_Image from "@/../public/assets/no_image.svg";
import Image from "next/image";

const Profile = () => {
  const router = useRouter();
  const [groupListData, setGroupListData] = useState<{
    content: IGroup[];
  } | null>(null);
  const [isLoginModalOpened, setIsLoginModalOpened] = useState(false);

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

  return (
    <>
      {isLoginModalOpened && <LoginModal closeLoginModal={closeLoginModal} />}
      <div className={styles.container}>
        <div className={styles.groupedContentsContainer}>
          <h1 className={styles.groupText}>저장한 게시글</h1>
          <div className={styles.groupedContents}>
            {groupListData &&
              groupListData.content.map((content: IGroup, index) => (
                <Link href={`groupContents/${content.name}`} key={index}>
                  <div className={styles.groupedContentBox}>
                    <div className={styles.groupedContentImage}>
                      <Image
                        src={No_Image.src}
                        alt="no_image"
                        fill
                        objectFit="cover"
                        style={{ borderRadius: 10 }}
                      />
                    </div>
                    <h1 className={styles.contentTitle}>{content.name}</h1>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
