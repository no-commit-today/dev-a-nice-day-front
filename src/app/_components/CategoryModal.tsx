"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./CategoryModal.module.css";
import dismiss from "@/../public/assets/dismiss.svg";
import { usePathname, useSearchParams } from "next/navigation";
import { Categories } from "./Categories";
import Image from "next/image";

export default function CategoryModal({
  setOpen,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const categories = Categories;

  const pathName = usePathname();

  const categoryParams = useSearchParams().getAll("categories");
  const [selectedCategory, setSelectedCategory] =
    useState<string[]>(categoryParams);

  const closeBtnOnClick = () => {
    if (selectedCategory) {
      // 선택한 카테고리가 없으면 모달 닫기만 함.
      if (selectedCategory.toString() == categoryParams.toString()) {
        setOpen(false);
        return;
      }
      const queryString = selectedCategory
        .map((category) => `categories=${category}`)
        .join("&");

      // 새로고침하면서 이동하려고 router 안씀.
      location.href = pathName + "?" + queryString;
      setOpen(false);
    } else {
      setOpen(false);
    }
  };

  return (
    <div className={styles.categoryModal}>
      <div className={styles.categoryModalContainer}>
        <div className={styles.categoryUpperBox}>
          <div className={styles.categoryTitleBox}>
            <h1 className={styles.categoryTitle}>관심주제 선택</h1>
            <div className={styles.numberBox}>
              <h1 className={styles.categoryTitle} style={{ fontSize: 15 }}>
                {selectedCategory?.length || 0}
              </h1>
            </div>
          </div>
          <div className={styles.closeBtn}>
            <button onClick={closeBtnOnClick}>
              <Image src={dismiss.src} alt="close" width={40} height={40} />
            </button>
          </div>
        </div>
        <div className={styles.categoryLowerBox}>
          {Object.keys(categories).map((categoryKey, index) => (
            <button
              key={index}
              className={styles.categoryItem}
              style={{
                backgroundColor: selectedCategory?.includes(categoryKey)
                  ? "#3E6AFF"
                  : "#5b5b5b",
              }}
              onClick={() => {
                if (selectedCategory?.includes(categoryKey)) {
                  setSelectedCategory(
                    selectedCategory.filter(
                      (category) => category !== categoryKey
                    )
                  );
                } else {
                  setSelectedCategory([
                    ...(selectedCategory || []),
                    categoryKey,
                  ]);
                }
              }}
            >
              <h1 className={styles.categoryItemTitle}>
                {categories[categoryKey]}
              </h1>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
