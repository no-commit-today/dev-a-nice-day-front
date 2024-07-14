"use client";

import { useSearchParams } from "next/navigation";

export default function useParams() {
  function arrayToQueryString(categories: string[], queryParam: string) {
    // 배열의 각 요소를 '${categories}=값' 형태로 매핑하고, 결과를 '&'로 연결
    return categories.map((category) => `${queryParam}=${category}`).join("&");
  }
  // 특정 서치 파라미터 문자열을 반환
  const getParamsToString = (queryParam: string) => {
    const searchParamsArray = useSearchParams().getAll(queryParam);
    return arrayToQueryString(searchParamsArray, queryParam);
  };

  // 특정 서치 파라미터 배열을 반환
  const getSearchParamsArray = (queryParam: string) =>
    useSearchParams().getAll(queryParam);

  // 현재 서치 파라미터 전체 문자열을 반환
  const getAllParamsToString = () => useSearchParams().toString();

  return { getParamsToString, getSearchParamsArray, getAllParamsToString };
}
