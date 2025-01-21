"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import LoginModal from "../_components/LoginModal/LoginModal";

export default function Error({ error }: { error: Error }) {
  const router = useRouter();
  const [isLoginModalOpened, setIsLoginModalOpened] = useState(false);
  const closeLoginModal = () => {
    setIsLoginModalOpened(false);
    router.replace("/");
  };
  useEffect(() => {
    if (error.message === "Auth Error") {
      setIsLoginModalOpened(true);
    }
  }, []);

  return (
    <>
      {isLoginModalOpened &&
        createPortal(
          <LoginModal closeLoginModal={closeLoginModal} />,
          document.body
        )}
    </>
  );
}
