"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./CategoryModal.module.css";
import dismiss from "@/../public/assets/dismiss.svg";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Categories } from "./Categories";

export default function CategoryModal({
  setOpen,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const categories = Categories;
  const [selectedCategory, setSelectedCategory] = useState<string[]>();
  const router = useRouter();
  const pathName = usePathname();

  const categoryParams = useSearchParams().getAll("category");
  useEffect(() => {
    setSelectedCategory(categoryParams);
  }, []);

  const closeBtnOnClick = () => {
    if (selectedCategory) {
      const queryString = selectedCategory
        .map((category) => `category=${category}`)
        .join("&");
      router.push(pathName + "?" + queryString);
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
              <img src={dismiss.src} alt="close" />
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
