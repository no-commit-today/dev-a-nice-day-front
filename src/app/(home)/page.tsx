import { cookies } from "next/headers";
import Home from "./_components/Home";
import { redirect } from "next/navigation";

export default function Page({ searchParams }: { searchParams: any }) {
  const cookieStore = cookies();
  const popup = cookieStore.has("popup");
  if (!popup) {
    redirect("/onboarding");
  }

  return <Home />;
}
