import React, { type PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const QueryProvider = ({ children }: PropsWithChildren) => {
  const [client] = React.useState(() => queryClient);

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

export default QueryProvider;
