interface ContentsCountData {
  count: number;
}
const getRandomNumber = (
  allPageParams: number[] | unknown[],
  contentsCountData: ContentsCountData
) => {
  // 전체 콘텐츠 개수를 통해 전체 페이지 개수를 계산
  let pagesCount = Math.ceil(contentsCountData.count / 10);

  // 전체 페이지 개수를 통해 전체 페이지 배열 생성
  let totalPageArray = Array.from({ length: pagesCount }, (_, i) => i + 1);

  // 지금까지 받아왔던 페이지들 배열에서 삭제 (모두 한번씩 다 받아온 경우 그냥 랜덤으로 뿌림)
  if (allPageParams.length < pagesCount) {
    totalPageArray = totalPageArray.filter((n) => !allPageParams.includes(n));
  }

  // 랜덤 인덱스 선택
  const randomIndex = Math.floor(Math.random() * totalPageArray.length);

  return totalPageArray[randomIndex];
};

export default getRandomNumber;
