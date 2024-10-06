import Home from "./_components/Home";
import CheckLocalStorage from "./_components/CheckLocalStorage";
import { BASE_URL, getGitHubToken, getToken } from "../_utils/api";

export default async function Page({
  searchParams,
}: {
  searchParams: { categories: string[]; id?: string; code?: string };
}) {
  const { code } = searchParams;

  const gitTokenData = await getGitHubToken(code);
  const tokenData = await getToken(gitTokenData?.accessToken);

  return (
    <>
      <Home searchParams={searchParams} />
      <CheckLocalStorage />
    </>
  );
}
