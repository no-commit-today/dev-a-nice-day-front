"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import analytics from "../_utils/firebase";
import queryClient from "../_utils/queryClient";

export default function ReactQueryProvider({
  children,
}: React.PropsWithChildren) {
  useEffect(() => {
    analytics();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
