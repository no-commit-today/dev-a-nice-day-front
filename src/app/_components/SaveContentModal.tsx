import Image from "next/image";
import styles from "./SaveContentModal.module.css";
import Plus from "@/../public/assets/plus.svg";
import Check_White from "@/../public/assets/check_white.svg";
import CheckBox from "@/app/_components/CheckBox";
import { useState } from "react";

const SaveContent = ({
  closeSaveModal,
  openNewGroupModal,
}: {
  closeSaveModal: () => void;
  openNewGroupModal: () => void;
}) => {
  const groupData = [
    { title: "프론트엔드" },
    { title: "백엔드" },
    { title: "아무 자료" },
  ];
  const [checkList, setCheckList] = useState<boolean[]>(
    new Array(groupData.length).fill(false)
  );
  const handleGroupClick = (index: number) => {
    const updatedCheckList = [...checkList];
    updatedCheckList[index] = !updatedCheckList[index];
    setCheckList(updatedCheckList);
  };

  return (
    <div className={styles.background} onClick={closeSaveModal}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h1 className={styles.title}>게시물 저장</h1>
          <div className={styles.newGroup} onClick={openNewGroupModal}>
            <Image src={Plus.src} alt="plus" width={16} height={16} />
            <h1 className={styles.newGroupText}>새 그룹</h1>
          </div>
        </div>
        <div className={styles.groupWrap}>
          {groupData.map((group, index) => (
            <div
              key={index}
              className={styles.group}
              onClick={() => handleGroupClick(index)}
            >
              <CheckBox checked={checkList[index]} />
              <h1 className={styles.groupTitle}>{group.title}</h1>
            </div>
          ))}
        </div>
        <div className={styles.btnWrap} onClick={closeSaveModal}>
          <Image src={Check_White.src} alt="check" width={14} height={14} />
          <h1 className={styles.doneText}>완료</h1>
        </div>
      </div>
    </div>
  );
};

export default SaveContent;
