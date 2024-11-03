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
  let tokenData;
  if (typeof window !== "undefined") {
    const localData = localStorage.getItem("tokenData");
    if (localData !== null) {
      tokenData = JSON.parse(localData);
    }
  }
  const data = await fetch(
    `${BASE_URL}/api/content/v1/contents?page=${page}&size=10&${searchParams}`,
    {
      headers: tokenData && {
        Authorization: `Bearer ${tokenData?.accessToken}`,
      },
    }
  );
  if (!data.ok) {
    throw new Error("API Error");
  }
  const ret = await data.json();
  console.log(ret);
  return ret;
};

const getContentById = async (id: string) => {
  let tokenData;
  if (typeof window !== "undefined") {
    const localData = localStorage.getItem("tokenData");
    if (localData !== null) {
      tokenData = JSON.parse(localData);
    }
  }
  const data = await fetch(`${BASE_URL}/api/content/v1/contents/${id}`, {
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
  console.log("getGitHubToken Fn: ", code);
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

const logout = async (refreshToken: string) => {
  const data = await fetch(`${BASE_URL}/api/user/v1/logout`, {
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
  const data = await fetch(`${BASE_URL}/api/bookmark/v1/groups`, {
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
  const data = await fetch(`${BASE_URL}/api/bookmark/v1/groups`, {
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
  const data = await fetch(`${BASE_URL}/api/bookmark/v1/bookmarks`, {
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
  const data = await fetch(
    `${BASE_URL}/api/bookmark/v1/bookmarks?groupName=${groupName}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  if (!data.ok) {
    throw new Error("API Error");
  }
  return await data.json();
};

const deleteGroup = async (groupName: string, access_token: string) => {
  const data = await fetch(`${BASE_URL}/api/bookmark/v1/groups/${groupName}`, {
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
  const data = await fetch(
    `${BASE_URL}/api/bookmark/v1/groups/${groupName}/contents/${contentId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Accept: "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  if (!data.ok) {
    throw new Error("API Error");
  }
  return data;
};

const getContainedGroupList = async (
  contentId: string,
  access_token: string
) => {
  const data = await fetch(
    `${BASE_URL}/api/bookmark/v1/groups-with-contains?contentId=${contentId}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
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
  logout,
  getGroupList,
  createGroup,
  saveContentToGroup,
  getContentListInGroup,
  deleteGroup,
  deleteContentInGroup,
  getContainedGroupList,
};
