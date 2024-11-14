import Home from "./_components/Home";
import CheckLocalStorage from "./_components/CheckLocalStorage";
import { getContentById, getGitHubToken, login } from "../_utils/api";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  searchParams: { categories: string[]; id?: string; code?: string };
};

export async function generateMetadata(
  { searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = searchParams.id;
  if (!id) {
    return {};
  }
  const product = await getContentById(id);
  const previousImages = (await parent).openGraph?.images || [];

  return {
    openGraph: {
      title: `${product.title} #devniceday`,
      description: product.summary,
      images: [product.imageUrl, ...previousImages],
    },
  };
}

export default async function Page({
  searchParams,
}: {
  searchParams: { categories: string[]; id?: string; code?: string };
}) {
  const { code } = searchParams;
  let tokenData = null;
  if (code) {
    const gitTokenData = await getGitHubToken(code);
    tokenData = await login(gitTokenData?.access_token);
    console.log("tokenData: ", tokenData);
  }

  return (
    <>
      <Home searchParams={searchParams} />
      <CheckLocalStorage tokenData={tokenData} />
    </>
  );
}
