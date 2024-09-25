import Image from "next/image";
import styles from "./TobTab.module.css";
import logo from "@/../public/assets/DevaNiceDay.svg";
import CategoryButton from "./CategoryButton";
import setting from "@/../public/assets/setting.svg";
import Link from "next/link";
export default function TobTab() {
  return (
    <div className={styles.container}>
      <Image src={logo} priority={true} alt="logo" className={styles.logo} />
      <div className={styles.rightContainer}>
        <CategoryButton />
        <Link href={"/setting"} className={styles.settingBtn}>
          <Image src={setting} priority={true} alt="setting" />
        </Link>
      </div>
    </div>
  );
}
