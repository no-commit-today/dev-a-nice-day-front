const BASE_URL = "https://2a1a5a16-d662-403d-9785-7430252af234.mock.pstmn.io";

function shuffleArray(array: object[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const getContent = async (page: number, searchParams: string) => {
  const data = await fetch(
    `${BASE_URL}/content?page=${page}&size=10&${searchParams}`
  );
  return data.json();
};

const getShuffledContent = async (page: number, searchParams: string) => {
  const data = await getContent(page, searchParams);
  shuffleArray(data.content);

  return data;
};

export { getShuffledContent, getContent };
