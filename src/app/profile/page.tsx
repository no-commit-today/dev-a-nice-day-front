import styles from "./page.module.css";
import user_frame from "@/../public/assets/user_frame.svg";
import edit from "@/../public/assets/edit.svg";
const Profile = () => {
  const groupedContentsData = [
    {
      title: "게시글 제목",
    },
    {
      title: "게시글 제목",
    },
    {
      title: "게시글 제목",
    },
    {
      title: "게시글 제목",
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
          <img src={edit.src} alt="edit" className={styles.editBtn} />
        </div>
      </div>
      <div className={styles.groupedContentsContainer}>
        <h1 className={styles.groupText}>저장한 게시글</h1>
        <div className={styles.groupedContents}>
          {groupedContentsData.map((content, index) => (
            <div className={styles.groupedContentBox}>
              <div className={styles.groupedContentImage}></div>
              <h1 className={styles.contentTitle}>{content.title}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
