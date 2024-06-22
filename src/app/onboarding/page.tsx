import OnboardingModal from "../_components/OnboardingModal";
import styles from "./page.module.css";

export default function Onboarding() {
  return (
    // 얘는 layout의 page에 들어가므로 기본적인 height를 줘야함.
    <div className={styles.container}>
      <OnboardingModal />
    </div>
  );
}
