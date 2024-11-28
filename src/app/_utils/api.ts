import { IContentData } from "..";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const fetchUrl = new URL(BASE_URL || "");

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
  fetchUrl.pathname = "/api/content/v1/contents";
  fetchUrl.search = `page=${page}&size=10&${searchParams}`;

  let tokenData;

  if (typeof window !== "undefined") {
    const localData = localStorage.getItem("tokenData");
    if (localData !== null) {
      tokenData = JSON.parse(localData);
    }
  }

  const data = await fetch(fetchUrl.href, {
    headers: tokenData && {
      Authorization: `Bearer ${tokenData?.accessToken}`,
    },
  });

  if (!data.ok) {
    throw new Error("API Error");
  }

  return await data.json();
};

const getContentById = async (
  id: string | undefined
): Promise<IContentData> => {
  fetchUrl.pathname = `/api/content/v1/contents/${id}`;

  let tokenData;

  if (typeof window !== "undefined") {
    const localData = localStorage.getItem("tokenData");
    if (localData !== null) {
      tokenData = JSON.parse(localData);
    }
  }

  const data = await fetch(fetchUrl.href, {
    headers: tokenData && {
      Authorization: `Bearer ${tokenData?.accessToken}`,
    },
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

const getGroupList = async (access_token: string) => {
  fetchUrl.pathname = "/api/bookmark/v1/groups";

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

const createGroup = async (groupName: string, access_token: string) => {
  fetchUrl.pathname = "/api/bookmark/v1/groups";

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

const saveContentToGroup = async (
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

const getContentListInGroup = async (
  groupName: string,
  access_token: string
) => {
  fetchUrl.pathname = "/api/bookmark/v1/bookmarks";
  fetchUrl.search = `groupName=${groupName}`;

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

const deleteGroup = async (groupName: string, access_token: string) => {
  fetchUrl.pathname = `/api/bookmark/v1/groups/${groupName}`;

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
  contentId: string | null,
  access_token: string
) => {
  fetchUrl.pathname = `/api/bookmark/v1/groups/${groupName}/contents/${contentId}`;

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

const getContainedGroupList = async (
  contentId: string,
  access_token: string
) => {
  fetchUrl.pathname = "/api/bookmark/v1/groups-with-contains";
  fetchUrl.search = `contentId=${contentId}`;

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
