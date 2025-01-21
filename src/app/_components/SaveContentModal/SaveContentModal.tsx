import Image from "next/image";
import styles from "./SaveContentModal.module.css";
import Plus from "../../../../public/assets/plus.svg";
import Check_White from "../../../../public/assets/check_white.svg";
import CheckBox from "@/app/_components/CheckBox/CheckBox";
import { useEffect, useState } from "react";
import {
  deleteContentInGroup,
  getContainedGroupList,
  getGroupList,
  saveContentToGroup,
} from "../../_utils/api";
import { IGroup } from "../../index";
import { useMutation, useQuery } from "@tanstack/react-query";

const SaveContent = ({
  closeSaveModal,
  openNewGroupModal,
  contentId,
}: {
  closeSaveModal: (isSaved: boolean | null) => void;
  openNewGroupModal: () => void;
  contentId: number;
}) => {
  // const localTokenData = localStorage.getItem("tokenData");
  // if (localTokenData === null) throw new Error("Token is not found");
  // const tokenData = JSON.parse(localTokenData);

  const { data: groupListData } = useQuery<{ content: IGroup[] }>({
    queryKey: ["groupListData"],
    queryFn: () => getGroupList(),
    // enabled: !!tokenData,
  });

  const { data: containedGroupList, refetch: refetchContainedGroupList } =
    useQuery({
      queryKey: ["containedGroupList", contentId],
      queryFn: () => getContainedGroupList(contentId.toString()),
      enabled: !!groupListData,
    });

  const { mutate: saveContent } = useMutation({
    mutationFn: ({
      index,
      contentId,
    }: {
      index: number;
      contentId: number;
    }) => {
      if (groupListData === undefined)
        throw new Error("GroupListData is not found");
      return saveContentToGroup(groupListData.content[index].name, contentId);
    },
    onSuccess: () => refetchContainedGroupList(),
  });

  const { mutate: deleteContent } = useMutation({
    mutationFn: ({
      index,
      contentId,
    }: {
      index: number;
      contentId: number;
    }) => {
      if (groupListData === undefined)
        throw new Error("GroupListData is not found");
      return deleteContentInGroup(groupListData.content[index].name, contentId);
    },
    onSuccess: () => refetchContainedGroupList(),
  });

  const [checkList, setCheckList] = useState<boolean[]>(
    new Array(groupListData?.content.length).fill(false)
  );

  const handleGroupClick = (index: number) => {
    const updatedCheckList = [...checkList];
    updatedCheckList[index] = !updatedCheckList[index];
    setCheckList(updatedCheckList);
  };

  const handleSaveGroupClick = async () => {
    let isSaved = false;
    checkList.forEach((v, index) => {
      if (v === true) {
        // 그룹 추가
        if (containedGroupList.content[index].contains === false) {
          saveContent({ index, contentId });
        }
        isSaved = true;
      } else {
        // 그룹 삭제
        if (containedGroupList.content[index].contains === true) {
          deleteContent({ index, contentId });
        }
      }
    });
    closeSaveModal(isSaved);
  };

  useEffect(() => {
    if (containedGroupList) {
      const updatedCheckList = containedGroupList.content.map(
        (group: { name: string; contains: boolean }) => group.contains
      );

      setCheckList(updatedCheckList);
    }
  }, [containedGroupList]);

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
