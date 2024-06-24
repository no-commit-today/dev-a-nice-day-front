"use client";

import { Dispatch, SetStateAction, useState } from "react";
import styles from "./CategoryModal.module.css";
import dismiss from "@/../public/assets/dismiss.svg";

export default function CategoryModal({
  setOpen,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const categories = [
    "서버 개발",
    "웹 개발",
    "앱 개발",
    "데이터 엔지니어링",
    "DevOps",
    "인공지능",
    "SW엔지니어링",
    "개발 툴",
  ];
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<
    number[] | null
  >(null);

  return (
    <div className={styles.categoryModal}>
      <div className={styles.categoryModalContainer}>
        <div className={styles.categoryUpperBox}>
          <div className={styles.categoryTitleBox}>
            <h1 className={styles.categoryTitle}>관심주제 선택</h1>
            <div className={styles.numberBox}>
              <h1 className={styles.categoryTitle} style={{ fontSize: 15 }}>
                {selectedCategoryIndex?.length || 0}
              </h1>
            </div>
          </div>
          <button onClick={() => setOpen(false)}>
            <img src={dismiss.src} alt="close" />
          </button>
        </div>
        <div className={styles.categoryLowerBox}>
          {categories.map((category, index) => (
            <button
              key={index}
              className={styles.categoryItem}
              style={{
                backgroundColor: selectedCategoryIndex?.includes(index)
                  ? "#3E6AFF"
                  : "#5b5b5b",
              }}
              onClick={() => {
                if (selectedCategoryIndex?.includes(index)) {
                  setSelectedCategoryIndex(
                    selectedCategoryIndex.filter((i) => i !== index)
                  );
                } else {
                  setSelectedCategoryIndex(
                    selectedCategoryIndex
                      ? [...selectedCategoryIndex, index]
                      : [index]
                  );
                }
              }}
            >
              <h1 className={styles.categoryItemTitle}>{category}</h1>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
