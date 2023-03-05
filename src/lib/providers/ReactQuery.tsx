"use client";

import { QueryClient, QueryClientProvider, Hydrate } from "@tanstack/react-query";
import { PropsWithChildren, useState } from "react";

export default function ReactQuery({ children }: PropsWithChildren) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 2 * 60 * 1000,
            suspense: true,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate>{children}</Hydrate>
    </QueryClientProvider>
  );
}
