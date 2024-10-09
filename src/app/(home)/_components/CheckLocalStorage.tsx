"use client";

import { refresh } from "@/app/_utils/api";
import { useRouter } from "next/navigation";
interface TokenData {
  userId: string;
  accessToken: string;
  refreshToken: string;
  accessTokenIssuedAt: string;
  accessTokenExpiresAt: string;
  refreshTokenIssuedAt: string;
  refreshTokenExpiresAt: string;
}
export default async function CheckLocalStorage({
  tokenData,
}: {
  tokenData: TokenData | null;
}) {
  const router = useRouter();

  if (typeof window !== "undefined") {
    const popup = localStorage.getItem("popup");

    if (popup === null) {
      router.push("/onboarding");
    }
    // 새로운 토큰이 있을 때
    if (tokenData !== null) {
      localStorage.setItem("tokenData", JSON.stringify(tokenData));
    } else {
      const localTokenData = localStorage.getItem("tokenData");
      // 기존에 존재하는 토큰이 있을 때
      if (localTokenData) {
        const parsedTokenData = JSON.parse(localTokenData);
        // 엑세스 토큰 유효기간 지났고 리프레시 토큰 유효기간 남았을 떄 재발급
        if (
          parsedTokenData.accessTokenExpiresAt < new Date().toISOString() &&
          parsedTokenData.refreshTokenExpiresAt > new Date().toISOString()
        ) {
          const token = await refresh(parsedTokenData.refreshToken);
          if (token)
            localStorage.setItem("tokenData", JSON.stringify(tokenData));
        }
        // 모두 유효기간 지났을 때
        else {
          localStorage.removeItem("tokenData");
        }
      }
    }
    return null;
  }
}
