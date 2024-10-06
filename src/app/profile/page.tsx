"use client";
import styles from "./page.module.css";
import user_frame from "@/../public/assets/user_frame.svg";
import edit from "@/../public/assets/edit.svg";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  return (
    <div className={styles.container}>
      <div className={styles.userInfoWrap}>
        <div className={styles.profileImage}>
          <img src={user_frame.src} alt="user_frame" />
        </div>
        <div className={styles.userNameWrap}>
          <h1 className={styles.userName}>박건태</h1>
          <img
            src={edit.src}
            alt="edit"
            className={styles.editBtn}
            onClick={() =>
              router.push(
                "https://github.com/login/oauth/authorize?client_id=Iv23lipZn6Q52xQOthNr"
              )
            }
          />
        </div>
      </div>
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
