import Image from "next/image";
import styles from "./SaveContentModal.module.css";
import Plus from "@/../public/assets/plus.svg";
import Check_White from "@/../public/assets/check_white.svg";
import CheckBox from "@/app/_components/CheckBox";
import { useEffect, useState } from "react";
import { getGroupList, saveContentToGroup } from "../_utils/api";
import { IGroup } from "..";

const SaveContent = ({
  closeSaveModal,
  openNewGroupModal,
}: {
  closeSaveModal: () => void;
  openNewGroupModal: () => void;
}) => {
  const [groupListData, setGroupListData] = useState<{
    content: IGroup[];
  } | null>(null);
  const [checkList, setCheckList] = useState<boolean[]>(
    new Array(groupListData?.content.length).fill(false)
  );

  const handleGroupClick = (index: number) => {
    const updatedCheckList = [...checkList];
    updatedCheckList[index] = !updatedCheckList[index];
    setCheckList(updatedCheckList);
  };

  const handleSaveGroupClick = async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const contentId = urlParams.get("id");

    const localTokenData = localStorage.getItem("tokenData");
    if (localTokenData === null) throw new Error("Token is not found");
    const tokenData = JSON.parse(localTokenData);
    checkList.forEach((v, index) => {
      if (v === true) {
        if (groupListData === null)
          throw new Error("GroupListData is not found");
        console.log(
          groupListData.content[index].name,
          contentId,
          tokenData.accessToken
        );
        saveContentToGroup(
          groupListData.content[index].name,
          contentId,
          tokenData.accessToken
        );
      }
    });
    closeSaveModal();
  };

  useEffect(() => {
    const getGroupListData = async () => {
      const localTokenData = localStorage.getItem("tokenData");
      if (localTokenData !== null) {
        const tokenData = JSON.parse(localTokenData);
        const groupListData = await getGroupList(tokenData.accessToken);
        setGroupListData(groupListData);
        setCheckList(new Array(groupListData.content.length).fill(false));
      }
    };
    getGroupListData();
  }, []);

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
          {groupListData?.content.map((group, index) => (
            <div
              key={index}
              className={styles.group}
              onClick={() => handleGroupClick(index)}
            >
              <CheckBox checked={checkList[index]} />
              <h1 className={styles.groupTitle}>{group.name}</h1>
            </div>
          ))}
        </div>
        <div className={styles.btnWrap} onClick={handleSaveGroupClick}>
          <Image src={Check_White.src} alt="check" width={14} height={14} />
          <h1 className={styles.doneText}>완료</h1>
        </div>
      </div>
    </div>
  );
  return null;
};

export default SaveContent;
