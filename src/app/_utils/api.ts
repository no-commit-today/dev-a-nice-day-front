export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

function shuffleArray(array: object[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const getContentsCount = async (searchParams: string) => {
  const data = await fetch(
    `${BASE_URL}/api/content/v1/contents-count?${searchParams}`
  );
  if (!data.ok) {
    throw new Error("API Error");
  }
  return await data.json();
};

const getContents = async (page: number, searchParams: string) => {
  const data = await fetch(
    `${BASE_URL}/api/content/v1/contents?page=${page}&size=10&${searchParams}`
  );
  if (!data.ok) {
    throw new Error("API Error");
  }
  return await data.json();
};

const getContentById = async (id: string) => {
  const data = await fetch(`${BASE_URL}/api/content/v1/contents/${id}`);
  if (!data.ok) {
    throw new Error("API Error");
  }
  return await data.json();
};

const getShuffledContents = async (
  page: number,
  searchParams: string,
  firstContentId?: string
) => {
  const data = await getContents(page, searchParams);
  if (firstContentId) {
    const firstContent = await getContentById(firstContentId);
    shuffleArray(data.content);

    return { content: [firstContent, ...data.content] };
  }
  shuffleArray(data.content);

  return data;
};

const getGitHubToken = async (code?: string) => {
  console.log("getGitHubToken Fn: ", code);
  const data = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",

      Accept: "application/json",
    },
    body: JSON.stringify({
      client_id: "Iv23lipZn6Q52xQOthNr",
      client_secret: "7efa5c65398a198caf376cb1ecb09c6942b13dcf",
      code: code,
    }),
  });
  if (!data.ok) {
    throw new Error("API Error");
  }
  return await data.json();
};

const signup = async (gitHubAccessToken: string) => {
  console.log("signup Fn: ", gitHubAccessToken);
  const data = await fetch(`${BASE_URL}/api/user/v1/signup`, {
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
  console.log("login fn: ", gitHubAccessToken);
  const data = await fetch(`${BASE_URL}/api/user/v1/login`, {
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
      console.log("가입되지 않은 회원");
      await signup(gitHubAccessToken);
      const ret: Response = await login(gitHubAccessToken);
      return ret;
    } else {
      console.log("login Fn Error: ", data);
      throw new Error("API Error");
    }
  }
  return await data.json();
};

const refresh = async (refreshToken: string) => {
  const data = await fetch(`${BASE_URL}/api/user/v1/refresh`, {
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

export {
  getShuffledContents,
  getContents,
  getContentsCount,
  getGitHubToken,
  login,
  refresh,
};
