const BASE_URL = "https://2a1a5a16-d662-403d-9785-7430252af234.mock.pstmn.io";

const getContent = async (page: number) => {
  const data = await fetch(`${BASE_URL}/content?page=${page}&size=10`);
  return data.json();
};

export { getContent };
