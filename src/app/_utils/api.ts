const mockData = {
  content: [
    {
      id: "1",
      title: "AI Agent와 개발자 - 카카오테크가 만난 Thomas Dohmke",
      publishedDate: "2025-04-03",
      summary:
        "1. AI Agent와 개발자 간의 관계 탐구\n2. GitHub CEO Thomas Dohmke와의 만남 내용 요약\n3. 카카오테크 관점에서 본 AI Agent의 미래",
      imageUrl: null,
      categories: ["AI", "SW_ENGINEERING", "SERVER"],
      providerId: "1",
      providerTitle: "Kakao Tech",
      providerUrl: "https://tech.kakao.com/blog",
      providerIconUrl: null,
      bookmarked: false,
      url: "https://tech.kakao.com/blog",
    },
    {
      id: "2",
      title: "2025년 1분기 카카오테크 블로그 글 모음",
      publishedDate: "2025-03-31",
      summary:
        "1. 2025년 1분기 발행된 카카오테크 블로그 글 요약\n2. 주요 기술 아티클 소개\n3. 기간 내 인기 글 및 동향 정리",
      imageUrl: null,
      categories: ["SW_ENGINEERING", "SERVER", "WEB"],
      providerId: "1",
      providerTitle: "Kakao Tech",
      providerUrl: "https://tech.kakao.com/blog",
      providerIconUrl: null,
      bookmarked: false,
      url: "https://tech.kakao.com/blog",
    },
    {
      id: "3",
      title: "LLM as a Judge를 활용한 CodeBuddy 성능 평가",
      publishedDate: "2025-03-07",
      summary:
        "1. CodeBuddy 성능 평가에 LLM as a Judge 기법 활용\n2. 평가 방법론 및 과정 설명\n3. 성능 평가 결과 및 분석",
      imageUrl: null,
      categories: ["AI", "SW_ENGINEERING", "DEV_TOOL"],
      providerId: "1",
      providerTitle: "Kakao Tech",
      providerUrl: "https://tech.kakao.com/blog",
      providerIconUrl: null,
      bookmarked: false,
      url: "https://tech.kakao.com/blog",
    },
    {
      id: "4",
      title: "카카오의 언어모델, Kanana 테크니컬 리포트 공개",
      publishedDate: "2025-02-27",
      summary:
        "1. 카카오 자체 언어모델 Kanana 소개\n2. 기술적 특징 및 개발 과정 설명\n3. 테크니컬 리포트의 주요 내용 요약",
      imageUrl: null,
      categories: ["AI", "DATA_ENGINEERING", "SW_ENGINEERING"],
      providerId: "1",
      providerTitle: "Kakao Tech",
      providerUrl: "https://tech.kakao.com/blog",
      providerIconUrl: null,
      bookmarked: false,
      url: "https://tech.kakao.com/blog",
    },
    {
      id: "5",
      title: "코파일럿 “열일”하게 만드는 방법",
      publishedDate: "2025-02-06",
      summary:
        "1. GitHub Copilot 활용 극대화 팁 소개\n2. 인라인 채팅을 통한 페어 프로그래밍 경험\n3. 효과적인 프롬프트 예시 제공",
      imageUrl: null,
      categories: ["AI", "DEV_TOOL", "SW_ENGINEERING"],
      providerId: "2",
      providerTitle: "우아한형제들 기술블로그",
      providerUrl: "https://techblog.woowahan.com/",
      providerIconUrl: null,
      bookmarked: false,
      url: "https://techblog.woowahan.com/21240/",
    },
    {
      id: "6",
      title:
        "NELO Alaska: 대용량 로그 데이터 저장을 위한 Apache Iceberg 도입기",
      publishedDate: "2025-03-11",
      summary:
        "1. 대용량 로그 데이터 저장의 어려움 설명\n2. Apache Iceberg 도입 배경 및 과정\n3. 도입 결과 및 효과 분석",
      imageUrl: null,
      categories: ["DATA_ENGINEERING", "SERVER", "DEVOPS"],
      providerId: "3",
      providerTitle: "NAVER D2",
      providerUrl: "https://d2.naver.com/home",
      providerIconUrl: null,
      bookmarked: false,
      url: "https://d2.naver.com/helloworld",
    },
    {
      id: "7",
      title: "토스 피플: 이것도 '나니까' 할 수 있다고 생각하기",
      publishedDate: "2025-03-30",
      summary:
        "1. 토스 구성원의 성장 스토리 (지윤님 인터뷰)\n2. 다양한 팀 경험과 새로운 역할 도전 과정\n3. 도전을 마주하는 마음가짐과 극복 방법 공유",
      imageUrl: null,
      categories: ["SW_ENGINEERING", "WEB", "APP"],
      providerId: "4",
      providerTitle: "토스 기술 블로그, 토스 테크",
      providerUrl: "https://toss.tech/",
      providerIconUrl: null,
      bookmarked: false,
      url: "https://toss.tech/",
    },
    {
      id: "8",
      title: "코로나 시대 원격 QA! 오픈소스 디바이스팜 STF 도입기",
      publishedDate: "2021-01-07",
      summary:
        "1. 원격 근무 환경에서의 QA 단말기 테스트 어려움\n2. 오픈소스 디바이스팜 STF(Smartphone Test Farm) 소개\n3. STF 구축 및 테스트 자동화 활용 사례 공유",
      imageUrl: null,
      categories: ["APP", "DEV_TOOL", "SW_ENGINEERING"],
      providerId: "5",
      providerTitle: "LINE ENGINEERING",
      providerUrl: "https://engineering.linecorp.com/ko/blog/",
      providerIconUrl: null,
      bookmarked: false,
      url: "https://engineering.linecorp.com/ko/blog/page/13",
    },
    {
      id: "9",
      title:
        "Kubernetes를 이용한 효율적인 데이터 엔지니어링(Airflow on Kubernetes VS Airflow Kubernetes Executor) - 2",
      publishedDate: "2021-01-05",
      summary:
        "1. Kubernetes 기반 데이터 엔지니어링 효율화 방법 소개\n2. Airflow on Kubernetes와 Airflow Kubernetes Executor 비교 분석 (2부)\n3. LINE Financial Data Platform 운영 경험 공유",
      imageUrl: null,
      categories: ["DATA_ENGINEERING", "DEVOPS", "SERVER"],
      providerId: "5",
      providerTitle: "LINE ENGINEERING",
      providerUrl: "https://engineering.linecorp.com/ko/blog/",
      providerIconUrl: null,
      bookmarked: false,
      url: "https://engineering.linecorp.com/ko/blog/page/13",
    },
    {
      id: "10",
      title:
        "토스 쇼핑 추천 시스템: 수백만 사용자와 상품을 잇는 멀티 스테이지 접근법",
      publishedDate: "2025-04-17",
      summary:
        "1. 토스 쇼핑의 개인화 상품 추천 시스템 소개\n2. 멀티 스테이지 접근법 (Retrieval, Ranking 등) 설명\n3. 수백만 사용자 및 상품 처리 기술 공유",
      imageUrl: null,
      categories: ["AI", "DATA_ENGINEERING", "SERVER"],
      providerId: "4",
      providerTitle: "토스",
      providerUrl: "https://toss.tech/",
      providerIconUrl: null,
      bookmarked: false,
      url: "https://www.velopers.kr/",
    },
    {
      id: "11",
      title: "Amazon FSx 파일 시스템 선택 및 DR 가이드",
      publishedDate: "2025-04-17",
      summary:
        "1. Amazon FSx 파일 시스템 종류 및 선택 기준 제시\n2. 재해 복구(DR) 전략 가이드라인\n3. 베스핀글로벌 SRE팀의 경험 기반 작성",
      imageUrl: null,
      categories: ["DEVOPS", "SERVER", "DATA_ENGINEERING"],
      providerId: "6",
      providerTitle: "베스핀글로벌",
      providerUrl: "https://www.bespinglobal.com/kr-tech-blog/",
      providerIconUrl: null,
      bookmarked: false,
      url: "https://www.velopers.kr/",
    },
    {
      id: "12",
      title: "안드로이드 크롬에서 CSS vh 단위가 이상하게 동작했던 이유",
      publishedDate: "2025-03-02",
      summary:
        "1. 안드로이드 크롬 108+ 버전에서의 vh 단위 동작 변경 설명\n2. 레이아웃 표시 영역(viewport) 동작 차이 분석\n3. 문제 발생 원인 및 해결 방안 제시",
      imageUrl: null,
      categories: ["WEB", "APP", "SW_ENGINEERING"],
      providerId: "7",
      providerTitle: "재그지그의 개발 블로그",
      providerUrl: "https://wormwlrm.github.io/",
      providerIconUrl: null,
      bookmarked: false,
      url: "https://wormwlrm.github.io/",
    },
    {
      id: "13",
      title:
        "Gemini 2.5 Flash 및 Pro, Live API 및 Gemini API의 Veo 2 최신 출시 소식",
      publishedDate: "2025-04-11",
      summary:
        "1. Google Gemini 모델 업데이트 (Flash, Pro) 소개\n2. Gemini Live API 및 Veo 2 모델 출시 발표\n3. 개발자 대상 최신 AI/ML 기술 동향 요약",
      imageUrl: null,
      categories: ["AI", "SW_ENGINEERING", "DEV_TOOL"],
      providerId: "8",
      providerTitle: "구글 개발자 블로그",
      providerUrl: "https://developers-kr.googleblog.com/",
      providerIconUrl: null,
      bookmarked: false,
      url: "https://developers-kr.googleblog.com/",
    },
    {
      id: "14",
      title: "Firebase Studio 소개합니다",
      publishedDate: "2025-04-11",
      summary:
        "1. 새로운 Firebase 도구 'Firebase Studio' 발표\n2. 주요 기능 및 개발 워크플로우 개선점 소개\n3. Cloud Next 2025 발표 내용 기반 정보",
      imageUrl: null,
      categories: ["DEV_TOOL", "APP", "WEB"],
      providerId: "8",
      providerTitle: "구글 개발자 블로그",
      providerUrl: "https://developers-kr.googleblog.com/",
      providerIconUrl: null,
      bookmarked: false,
      url: "https://developers-kr.googleblog.com/",
    },
    {
      id: "15",
      title: "프론트엔드를 위한 API 프로토콜, GraphQL 맛보기",
      publishedDate: "2022-05-29",
      summary:
        "1. REST API의 Overfetching/Underfetching 문제점 제시\n2. API 쿼리 언어 GraphQL 소개\n3. GraphQL의 기본 개념 및 장점 설명",
      imageUrl: null,
      categories: ["WEB", "SERVER", "SW_ENGINEERING"],
      providerId: "9",
      providerTitle: "개발블로그 (jihyundev.tistory.com)",
      providerUrl: "https://jihyundev.tistory.com/",
      providerIconUrl: null,
      bookmarked: false,
      url: "https://jihyundev.tistory.com/",
    },
    {
      id: "16",
      title: "[쓰면서 배우는 obsidian] 001. obsidian 설치해보기",
      publishedDate: "2024-12-10",
      summary:
        "1. 노트 앱 Obsidian 소개 및 Notion과의 비교\n2. Obsidian 설치 방법 안내\n3. 개발 지식 데이터베이스 구축 목표 제시",
      imageUrl: null,
      categories: ["DEV_TOOL", "SW_ENGINEERING", "WEB"],
      providerId: "10",
      providerTitle: "직접 쓰는 개발 블로그 (kimmayer.tistory.com)",
      providerUrl: "https://kimmayer.tistory.com/",
      providerIconUrl: null,
      bookmarked: false,
      url: "https://kimmayer.tistory.com/",
    },
    {
      id: "17",
      title: "mysql limit, offset과 id 기반 조회 비교 분석",
      publishedDate: "2024-11-01",
      summary:
        "1. MySQL 페이징 처리 방식 (limit/offset vs id 기반) 비교\n2. 100만 건 데이터 환경 테스트 결과 공유\n3. 성능 차이 분석 및 결론 제시",
      imageUrl: null,
      categories: ["SERVER", "DATA_ENGINEERING", "SW_ENGINEERING"],
      providerId: "10",
      providerTitle: "직접 쓰는 개발 블로그 (kimmayer.tistory.com)",
      providerUrl: "https://kimmayer.tistory.com/",
      providerIconUrl: null,
      bookmarked: false,
      url: "https://kimmayer.tistory.com/",
    },
  ],
};

import { IContentData } from "..";
import getAuth from "./getAuth";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const fetchUrl = new URL(BASE_URL || "");

const { getAccessToken, isLoggedIn } = getAuth();

function shuffleArray(array: object[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const getContentsCount = async (searchParams: string) => {
  fetchUrl.pathname = "/api/content/v1/contents-count";
  fetchUrl.search = searchParams;

  const data = await fetch(fetchUrl.href);

  if (!data.ok) {
    throw new Error("API Error");
  }

  return await data.json();
};

const getContents = async (page: number, searchParams: string) => {
  // fetchUrl.pathname = "/api/content/v1/contents";
  // fetchUrl.search = `page=${page}&size=10&${searchParams}`;

  // const access_token = await getAccessToken();

  // const data = await fetch(fetchUrl.href, {
  //   headers: access_token
  //     ? {
  //         Authorization: `Bearer ${access_token}`,
  //       }
  //     : undefined,
  // });

  // if (!data.ok) {
  //   throw new Error("API Error");
  // }

  // return await data.json();
  return (await mockData) as any;
};

const getContentById = async (
  id: string | undefined
): Promise<IContentData> => {
  fetchUrl.pathname = `/api/content/v1/contents/${id}`;

  const access_token = await getAccessToken();

  const data = await fetch(fetchUrl.href, {
    headers: access_token
      ? {
          Authorization: `Bearer ${access_token}`,
        }
      : undefined,
  });

  if (!data.ok) {
    throw new Error("API Error");
  }

  return await data.json();
};

const getShuffledContents = async (
  page: number,
  searchParams: string,
  firstContentId: string | null
) => {
  if (typeof window !== "undefined") {
    const data = await getContents(page, searchParams);
    if (firstContentId) {
      const firstContent = await getContentById(firstContentId);
      shuffleArray(data.content);

      return { content: [firstContent, ...data.content] };
    }

    shuffleArray(data.content);

    return data;
  }
};

const getGitHubToken = async (code?: string) => {
  const data = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",

      Accept: "application/json",
    },
    body: JSON.stringify({
      client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
      client_secret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET,
      code: code,
    }),
  });

  if (!data.ok) {
    throw new Error("API Error");
  }

  return await data.json();
};

const signup = async (gitHubAccessToken: string) => {
  fetchUrl.pathname = "/api/user/v1/signup";

  const data = await fetch(fetchUrl.href, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      Accept: "application/json",
    },
    body: JSON.stringify({
      accessToken: gitHubAccessToken,
    }),
  });

  if (!data.ok) {
    throw new Error("API Error");
  }

  return data;
};

const login = async (gitHubAccessToken: string) => {
  fetchUrl.pathname = "/api/user/v1/login";

  const data = await fetch(fetchUrl.href, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      Accept: "application/json",
    },
    body: JSON.stringify({
      accessToken: gitHubAccessToken,
    }),
  });

  if (!data.ok) {
    if (data.status === 404) {
      await signup(gitHubAccessToken);
      const ret: Response = await login(gitHubAccessToken);
      return ret;
    } else {
      throw new Error("API Error");
    }
  }

  return await data.json();
};

const refresh = async (refreshToken: string) => {
  fetchUrl.pathname = "/api/user/v1/refresh";

  const data = await fetch(fetchUrl.href, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      Accept: "application/json",
    },
    body: JSON.stringify({
      refreshToken: refreshToken,
    }),
  });

  if (!data.ok) {
    throw new Error("API Error");
  }

  return await data.json();
};

const logout = async (refreshToken: string) => {
  fetchUrl.pathname = "/api/user/v1/logout";

  const data = await fetch(fetchUrl.href, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      Accept: "application/json",
    },
    body: JSON.stringify({
      refreshToken: refreshToken,
    }),
  });

  if (!data.ok) {
    throw new Error("API Error");
  }

  return data;
};

const getGroupList = async () => {
  fetchUrl.pathname = "/api/bookmark/v1/groups";

  const access_token = await getAccessToken();
  const data = await fetch(fetchUrl.href, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (!data.ok) {
    if (data.status === 401) {
      throw new Error("Auth Error");
    }
    throw new Error("API Error");
  }

  return await data.json();
};

const createGroup = async (groupName: string) => {
  fetchUrl.pathname = "/api/bookmark/v1/groups";

  const access_token = await getAccessToken();
  const data = await fetch(fetchUrl.href, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      Accept: "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify({
      name: groupName,
    }),
  });

  if (!data.ok) {
    throw new Error("API Error");
  }

  return data;
};

const saveContentToGroup_Deprecated = async (
  groupName: string | null,
  contentId: string | null,
  access_token: string
) => {
  fetchUrl.pathname = "/api/bookmark/v1/bookmarks";

  const data = await fetch(fetchUrl.href, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      Accept: "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify({
      groupName: groupName,
      contentId: contentId,
    }),
  });

  if (!data.ok) {
    throw new Error("API Error");
  }

  return data;
};

const saveContentToGroup = async (
  groupName: string | null,
  contentId: string | null
) => {
  fetchUrl.pathname = `/api/bookmark/v1/groups/${groupName}/contents/${contentId}`;

  const access_token = await getAccessToken();
  const data = await fetch(fetchUrl.href, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      Accept: "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (!data.ok) {
    throw new Error("API Error");
  }

  return data;
};

const getContentListInGroup = async (groupName: string) => {
  fetchUrl.pathname = "/api/bookmark/v1/bookmarks";
  fetchUrl.search = `groupName=${groupName}`;
  const access_token = await getAccessToken();
  const data = await fetch(fetchUrl.href, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (!data.ok) {
    throw new Error("API Error");
  }

  return await data.json();
};

const deleteGroup = async (groupName: string) => {
  fetchUrl.pathname = `/api/bookmark/v1/groups/${groupName}`;
  const access_token = await getAccessToken();
  const data = await fetch(fetchUrl.href, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      Accept: "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (!data.ok) {
    throw new Error("API Error");
  }

  return data;
};

const deleteContentInGroup = async (
  groupName: string,
  contentId: string | null
) => {
  fetchUrl.pathname = `/api/bookmark/v1/groups/${groupName}/contents/${contentId}`;
  const access_token = await getAccessToken();
  const data = await fetch(fetchUrl.href, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      Accept: "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (!data.ok) {
    throw new Error("API Error");
  }

  return data;
};

const getContainedGroupList = async (contentId: string) => {
  fetchUrl.pathname = "/api/bookmark/v1/groups-with-contains";
  fetchUrl.search = `contentId=${contentId}`;
  const access_token = await getAccessToken();
  const data = await fetch(fetchUrl.href, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (!data.ok) {
    throw new Error("API Error");
  }

  return await data.json();
};

export {
  getShuffledContents,
  getContents,
  getContentById,
  getContentsCount,
  getGitHubToken,
  login,
  refresh,
  logout,
  getGroupList,
  createGroup,
  saveContentToGroup,
  getContentListInGroup,
  deleteGroup,
  deleteContentInGroup,
  getContainedGroupList,
};
