import React, { type PropsWithChildren } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { QUERY_GC_TIME, QUERY_STALE_TIME } from '@ahhachul/domain';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: QUERY_STALE_TIME.feed,
      gcTime: QUERY_GC_TIME.feed,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  },
});

const QueryProvider = ({ children }: PropsWithChildren) => {
  const [client] = React.useState(() => queryClient);

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

export default QueryProvider;
