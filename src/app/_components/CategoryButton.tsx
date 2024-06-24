"use client";

import styles from "./CategoryButton.module.css";
import category from "@/../public/assets/categories.svg";

import { useState } from "react";
import CategoryModal from "./CategoryModal";

export default function CategoryButton() {
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.categoryBox}>
      <button className={styles.categoryBtn} onClick={() => setOpen(true)}>
        <img src={category.src} />
        <h1 className={styles.grayMediumText}>관심주제 변경</h1>
      </button>
      {open && <CategoryModal setOpen={setOpen} />}
    </div>
  );
}
