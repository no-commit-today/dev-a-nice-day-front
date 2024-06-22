import Link from "next/link";
import styles from "./page.module.css";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Home() {
  const cookieStore = cookies();
  const popup = cookieStore.has("popup");

  if (!popup) {
    redirect("/onboarding");
  }
  return (
    <div className={styles.container}>
      <Link href="/onboarding">온보딩 모달</Link>
    </div>
  );
}
