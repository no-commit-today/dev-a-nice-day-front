"use client";
import { logout } from "@/app/_utils/api";
import styles from "./LogoutButton.module.css";
import { useEffect, useState } from "react";
import { ITokenData } from "@/app";
import { useRouter } from "next/navigation";
const LogoutButton = () => {
  const [tokenData, setTokenData] = useState<ITokenData | null>(null);
  const router = useRouter();
  useEffect(() => {
    const data = localStorage.getItem("tokenData");
    if (data) {
      const parseData = JSON.parse(data);
      setTokenData(parseData);
    }
  }, []);

  if (!tokenData) return;

  const onLogoutButtonClick = async () => {
    const res = await logout(tokenData.refreshToken);

    if (res) {
      localStorage.removeItem("tokenData");
      setTokenData(null);
      window.location.href = "/";
    }
  };

  return (
    tokenData && (
      <div className={styles.logoutBox} onClick={onLogoutButtonClick}>
        <h1 className={styles.logoutText}>로그아웃</h1>
      </div>
    )
  );
};
export default LogoutButton;
