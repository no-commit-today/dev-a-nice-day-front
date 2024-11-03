import Image from "next/image";
import styles from "./SaveContentModal.module.css";
import Plus from "@/../public/assets/plus.svg";
import Check_White from "@/../public/assets/check_white.svg";
import CheckBox from "@/app/_components/CheckBox";
import { useEffect, useState } from "react";
import {
  deleteContentInGroup,
  getContainedGroupList,
  getGroupList,
  saveContentToGroup,
} from "../_utils/api";
import { IGroup } from "..";

const SaveContent = ({
  closeSaveModal,
  openNewGroupModal,
  contentId,
}: {
  closeSaveModal: (isSaved: boolean | null) => void;
  openNewGroupModal: () => void;
  contentId: number;
}) => {
  const [groupListData, setGroupListData] = useState<{
    content: IGroup[];
  } | null>(null);
  const [checkList, setCheckList] = useState<boolean[]>(
    new Array(groupListData?.content.length).fill(false)
  );
  const [containedGroupList, setContainedGroupList] = useState<boolean[]>([]);

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

    let isSaved = false;
    checkList.forEach((v, index) => {
      if (v === true) {
        if (groupListData === null)
          throw new Error("GroupListData is not found");
        // 그룹 추가
        if (containedGroupList[index] === false) {
          saveContentToGroup(
            groupListData.content[index].name,
            contentId,
            tokenData.accessToken
          );
        }
        isSaved = true;
      } else {
        if (containedGroupList[index] === true) {
          if (groupListData === null)
            throw new Error("GroupListData is not found");
          // 그룹 삭제
          deleteContentInGroup(
            groupListData.content[index].name,
            contentId,
            tokenData.accessToken
          );
        }
      }
    });
    console.log(isSaved);
    closeSaveModal(isSaved);
  };

  useEffect(() => {
    const getGroupListData = async () => {
      const localTokenData = localStorage.getItem("tokenData");
      if (localTokenData !== null) {
        const tokenData = JSON.parse(localTokenData);
        const groupListData = await getGroupList(tokenData.accessToken);
        setGroupListData(groupListData);
        setCheckList(new Array(groupListData.content.length).fill(false));
        getContainedGroupListData();
      }
    };
    const getContainedGroupListData = async () => {
      const localTokenData = localStorage.getItem("tokenData");
      if (localTokenData === null) throw new Error("Token is not found");
      const tokenData = JSON.parse(localTokenData);
      const containedGroupList = await getContainedGroupList(
        contentId.toString(),
        tokenData.accessToken
      );

      const updatedCheckList = containedGroupList.content.map(
        (group: { name: string; contains: boolean }) => group.contains
      );
      setContainedGroupList(updatedCheckList);
      setCheckList(updatedCheckList);
    };
    getGroupListData();
  }, []);

  return (
    <div className={styles.background} onClick={() => closeSaveModal(null)}>
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
};

export default SaveContent;
