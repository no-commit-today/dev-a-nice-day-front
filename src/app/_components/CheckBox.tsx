import Image from "next/image";
import styles from "./CheckBox.module.css";
import Check from "@/../public/assets/check.svg";
const CheckBox = ({ checked }: { checked: boolean }) => {
  return (
    <>
      {checked ? (
        <div className={styles.checked}>
          <Image src={Check.src} alt="check" width={10} height={10} />
        </div>
      ) : (
        <div className={styles.checkBox} />
      )}
    </>
  );
};
export default CheckBox;
