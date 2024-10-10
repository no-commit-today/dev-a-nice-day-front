"use client";

import { ITokenData } from "@/app";
import { refresh } from "@/app/_utils/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function CheckLocalStorage({
  tokenData,
}: {
  tokenData: ITokenData | null;
}) {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const popup = localStorage.getItem("popup");

    if (popup === null) {
      router.push("/onboarding");
    }
    async function checkToken() {
      // 새로운 토큰이 있을 때
      if (tokenData !== null) {
        localStorage.setItem("tokenData", JSON.stringify(tokenData));
        setIsLogin(true);
      } else {
        const localTokenData = localStorage.getItem("tokenData");
        // 기존에 존재하는 토큰이 있을 때
        if (localTokenData !== null) {
          const parsedTokenData = JSON.parse(localTokenData);

          // 엑세스 토큰 유효기간이 남아있을 때
          if (parsedTokenData.accessTokenExpiresAt > new Date().toISOString()) {
            setIsLogin(true);
          }
          // 엑세스 토큰 유효기간 지났고 리프레시 토큰 유효기간 남았을 떄 재발급
          else if (
            parsedTokenData.accessTokenExpiresAt < new Date().toISOString() &&
            parsedTokenData.refreshTokenExpiresAt > new Date().toISOString()
          ) {
            const tokenData = await refresh(parsedTokenData.refreshToken);
            if (tokenData) {
              localStorage.setItem("tokenData", JSON.stringify(tokenData));
              setIsLogin(true);
            }
          }
          // 모두 유효기간 지났을 때
          else if (
            parsedTokenData.accessTokenExpiresAt < new Date().toISOString() &&
            parsedTokenData.refreshTokenExpiresAt < new Date().toISOString()
          ) {
            localStorage.removeItem("tokenData");
          }
        }
      }
    }

    checkToken();
  }, []);

  return isLogin;
}
