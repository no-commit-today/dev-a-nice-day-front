import Home from "./_components/Home";
import CheckLocalStorage from "./_components/CheckLocalStorage";

export default function Page({
  searchParams,
}: {
  searchParams: { categories: string[]; id?: string };
}) {
  return (
    <>
      <Home searchParams={searchParams} />
      <CheckLocalStorage />
    </>
  );
}
