const BASE_URL = "https://api.techswipe.zooneon.dev/api/content/v1";

function shuffleArray(array: object[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const getPageCount = async (searchParams: string) => {
  //const data = await fetch(`${BASE_URL}/contents-count?${searchParams}`);
  const data = {
    count: 297,
  };
  return data;
};

const getContent = async (page: number, searchParams: string) => {
  console.log(page);
  const data = await fetch(
    `${BASE_URL}/contents?page=${page}&size=10&${searchParams}`
  );
  return data.json();
};

const getShuffledContent = async (page: number, searchParams: string) => {
  const data = await getContent(page, searchParams);
  shuffleArray(data.content);

  return data;
};

export { getShuffledContent, getContent, getPageCount };
