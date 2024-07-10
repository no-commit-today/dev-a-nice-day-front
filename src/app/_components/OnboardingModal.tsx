import Image from "next/image";
import BlueButton from "./BlueButton";
import styles from "./OnboardingModal.module.css";
import GPT_Icon from "@/../public/assets/gpt_icon.svg";

export default function OnboardingModal() {
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.contentBox}>
          <div className={styles.titleBox}>
            <Image alt={"gpt icon"} src={GPT_Icon.src} width={24} height={24} />
            <span className={styles.title}>ChatGPT가 아티클을 요약했어요</span>
          </div>
          <div className={styles.detailBox}>
            <ul>
              <li className={styles.detailText}>
                빠르게 정보 습득을 하실 수 있게 요약했어요.
              </li>
              <li className={styles.detailText}>
                기술 특성상 아티클의 주요 내용이 제외되거나 사실과 다를 수
                있어요. AI도 실수할 수 있으니 자세한 정보를 확인하기 위해 아티클
                본문 전체 보기를 권장드려요.
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.btnBox}>
          <BlueButton title="확인했어요" disabled={false} />
        </div>
      </div>
    </div>
  );
}
