"use client";

import { useRouter } from "next/navigation";

export default function CheckLocalStorage() {
  const router = useRouter();
  if (typeof window !== "undefined") {
    const popup = localStorage.getItem("popup");

    if (popup === null) {
      console.log("redirect");
      router.push("/onboarding");
    }
  }
  return null;
}
