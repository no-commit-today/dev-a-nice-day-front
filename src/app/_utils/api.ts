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

export { getShuffledContents, getContents, getContentsCount };
