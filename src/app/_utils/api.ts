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
  return data.json();
};

const getContents = async (page: number, searchParams: string) => {
  const data = await fetch(
    `${BASE_URL}/api/content/v1/contents?page=${page}&size=10&${searchParams}`
  );
  if (!data.ok) {
    throw new Error("API Error");
  }
  return data.json();
};

const getContentById = async (id: string) => {
  const data = await fetch(`${BASE_URL}/api/content/v1/contents/${id}`);
  if (!data.ok) {
    throw new Error("API Error");
  }
  return data.json();
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
  if (code === undefined) {
    return null;
  }
  const response: any = await fetch(
    "https://github.com/login/oauth/access_token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: "Iv23lipZn6Q52xQOthNr",
        client_secret: "04b83b0d1f0edf94a62fce5c7f530edb40d4bdec",
        code: code,
      }),
    }
  );
  return await response.json();
};

const login = async (gitHubAccessToken: string | undefined) => {
  if (gitHubAccessToken === undefined) {
    return null;
  }
  const accessToken = await fetch(`${BASE_URL}/api/user/v1/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      Accept: "application/json",
    },
    body: JSON.stringify({
      accessToken: gitHubAccessToken,
    }),
  });
  return await accessToken.json();
};

export {
  getShuffledContents,
  getContents,
  getContentsCount,
  getGitHubToken,
  login,
};
