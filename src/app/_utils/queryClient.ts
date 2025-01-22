import { QueryClient } from "@tanstack/react-query";
import { useState } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      throwOnError: true,
      retry: 1,
    },
  },
});

export default queryClient;
