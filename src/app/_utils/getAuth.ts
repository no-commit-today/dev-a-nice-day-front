import { ITokenData } from "..";
import { refresh } from "./api";

const getAccessToken = async () => {
  if (typeof window === "undefined") return false;

  const localTokenData = localStorage.getItem("tokenData");
  const now = new Date();
  const localTime = new Date(now.getTime());

  // 기존에 존재하는 토큰이 있을 때
  if (localTokenData !== null) {
    const parsedTokenData: ITokenData = JSON.parse(localTokenData);
    // 엑세스 토큰 유효기간이 남아있을 때
    const accessTokenExpiresAt = new Date(parsedTokenData.accessTokenExpiresAt);
    const refreshTokenExpiresAt = new Date(
      parsedTokenData.refreshTokenExpiresAt
    );

    if (accessTokenExpiresAt > localTime) {
      return parsedTokenData.accessToken;
    }
    // 엑세스 토큰 유효기간 지났고 리프레시 토큰 유효기간 남았을 떄 재발급
    else if (
      accessTokenExpiresAt < localTime &&
      refreshTokenExpiresAt > localTime
    ) {
      const tokenData = await refresh(parsedTokenData.refreshToken);
      if (tokenData) {
        localStorage.setItem("tokenData", JSON.stringify(tokenData));
        return parsedTokenData.accessToken;
      }
    }
    // 모두 유효기간 지났을 때
  }
  return false;
};

const isLoggedIn = async () => {
  if (typeof window === "undefined") return false;

  const localTokenData = localStorage.getItem("tokenData");
  const now = new Date();
  const localTime = new Date(now.getTime());

  // 기존에 존재하는 토큰이 있을 때
  if (localTokenData !== null) {
    const parsedTokenData = JSON.parse(localTokenData);
    // 엑세스 토큰 유효기간이 남아있을 때
    const accessTokenExpiresAt = new Date(parsedTokenData.accessTokenExpiresAt);
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
        localStorage.setItem("tokenData", JSON.stringify(tokenData));
        return true;
      }
    }
    // 모두 유효기간 지났을 때
  }
  return false;
};
const getAuth = () => {
  return { getAccessToken, isLoggedIn };
};

export default getAuth;
