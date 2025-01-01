"use client";

import { ITokenData } from "@/app";
import { refresh } from "@/app/_utils/api";

export default function CheckLocalStorage({
  tokenData,
}: {
  tokenData: ITokenData | null;
}) {
  if (typeof window === "undefined") return false;

  async function checkToken() {
    // 새로운 토큰이 있을 때
    if (tokenData !== null) {
      localStorage.setItem("tokenData", JSON.stringify(tokenData));
      console.log(tokenData);
      return true;
    } else {
      const localTokenData = localStorage.getItem("tokenData");
      const now = new Date();
      const localTime = new Date(now.getTime());

      // 기존에 존재하는 토큰이 있을 때
      if (localTokenData !== null) {
        const parsedTokenData = JSON.parse(localTokenData);
        // 엑세스 토큰 유효기간이 남아있을 때
        const accessTokenExpiresAt = new Date(
          parsedTokenData.accessTokenExpiresAt
        );
        const refreshTokenExpiresAt = new Date(
          parsedTokenData.refreshTokenExpiresAt
        );
        if (accessTokenExpiresAt > localTime) {
          return true;
        }
        // 엑세스 토큰 유효기간 지났고 리프레시 토큰 유효기간 남았을 떄 재발급
        else if (
          accessTokenExpiresAt < localTime &&
          refreshTokenExpiresAt > localTime
        ) {
          const tokenData = await refresh(parsedTokenData.refreshToken);
          if (tokenData) {
            console.log(tokenData);
            localStorage.setItem("tokenData", JSON.stringify(tokenData));
            return true;
          }
        }
        // 모두 유효기간 지났을 때
        else if (
          accessTokenExpiresAt < localTime &&
          refreshTokenExpiresAt < localTime
        ) {
          console.log("c");
          console.log(localTime, parsedTokenData.accessTokenExpiresAt);
        }
      } else {
        console.log("d");
      }
    }
  }

  checkToken();

  return false;
}
