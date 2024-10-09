"use client";
import styles from "./page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CheckLocalStorage from "../(home)/_components/CheckLocalStorage";
import LoginModal from "../_components/LoginModal";

const Profile = () => {
  const router = useRouter();
  const groupedContentsData = [
    {
      title: "게시글 제목",
      id: 1,
    },
    {
      title: "게시글 제목",
      id: 2,
    },
    {
      title: "게시글 제목",
      id: 3,
    },
    {
      title: "게시글 제목",
      id: 4,
    },
  ];
  const isLogin = CheckLocalStorage({ tokenData: null });

  if (!isLogin) {
    return <LoginModal />;
  }
  return (
    <div className={styles.container}>
      <div className={styles.groupedContentsContainer}>
        <h1 className={styles.groupText}>저장한 게시글</h1>
        <div className={styles.groupedContents}>
          {groupedContentsData.map((content) => (
            <Link href={`groupContents/${content.id}`} key={content.id}>
              <div className={styles.groupedContentBox}>
                <div className={styles.groupedContentImage}></div>
                <h1 className={styles.contentTitle}>{content.title}</h1>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
