"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function SetCookie() {
  const cookieStore = cookies();
  const oneDay = 24 * 60 * 60 * 1000;
  const popup = () => {
    cookieStore.set({
      name: "popup",
      value: "true",
      httpOnly: false,
      path: "/",
      expires: new Date(Date.now() + oneDay),
    });
  };
  popup();
  redirect("/");
}
