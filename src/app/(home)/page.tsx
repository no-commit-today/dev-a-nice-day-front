import Home from "./_components/Home";
import CheckLocalStorage from "./_components/CheckLocalStorage";
import { getGitHubToken, login } from "../_utils/api";

export default async function Page({
  searchParams,
}: {
  searchParams: { categories: string[]; id?: string; code?: string };
}) {
  const { code } = searchParams;

  const gitTokenData = await getGitHubToken(code);
  const tokenData = await login(gitTokenData?.access_token);
  console.log(tokenData);
  return (
    <>
      <Home searchParams={searchParams} />
      <CheckLocalStorage />
    </>
  );
}
