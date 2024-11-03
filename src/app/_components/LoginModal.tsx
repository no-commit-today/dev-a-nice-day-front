"use client";
import styles from "./LoginModal.module.css";
import Image from "next/image";
import logo from "../../../public/assets/login_logo.svg";
import githubLogo from "../../../public/assets/github_logo.png";
import dismiss from "../../../public/assets/dismiss.svg";
import { useRouter } from "next/navigation";
export default function LoginModal({
  closeLoginModal,
}: {
  closeLoginModal: () => void;
}) {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <div className={styles.loginContainer}>
        <div className={styles.upperContainer}>
          <div className={styles.dismissButton} onClick={closeLoginModal}>
            <Image src={dismiss.src} alt="dismiss" width={36} height={36} />
          </div>
          <Image src={logo.src} alt="logo" width={301} height={81} />
        </div>
        <div className={styles.lowerContainer}>
          <div
            className={styles.githubButton}
            onClick={() =>
              router.push(
                "https://github.com/login/oauth/authorize?client_id=Iv23lipZn6Q52xQOthNr"
              )
            }
          >
            <div className={styles.githubLogo}>
              <Image
                src={githubLogo.src}
                alt="github logo"
                width={24}
                height={24}
              />
            </div>
            <h1>GitHub로 로그인하기</h1>
          </div>
          <div className={styles.dismissText} onClick={closeLoginModal}>
            <h1>나중에 할래요.</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
