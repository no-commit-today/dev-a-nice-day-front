"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const useParams = (queryParam: string) => {
  const searchParamsArray = useSearchParams().getAll(queryParam);

  // 배열의 각 요소를 '${categories}=값' 형태로 매핑하고, 결과를 '&'로 연결
  const arrayToQueryString = (categories: string[] | null) => {
    if (categories == null) {
      throw new Error("queryParam is null");
    } else {
      return categories
        .map((category) => `${queryParam}=${category}`)
        .join("&");
    }
  };

  // 특정 서치 파라미터 문자열을 반환
  const getParamsToString = () => {
    return arrayToQueryString(searchParamsArray);
  };

  // 특정 서치 파라미터 배열을 반환
  const getSearchParamsArray = () => {
    if (queryParam == null) {
      throw new Error("queryParam is null");
    } else {
      return searchParamsArray;
    }
  };

  return { getParamsToString, getSearchParamsArray };
};

export default useParams;
