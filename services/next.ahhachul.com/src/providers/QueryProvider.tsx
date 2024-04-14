import React, { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider, HydrationBoundary } from '@tanstack/react-query';
import type { AppProps } from 'next/app';

function QueryProvider({ pageProps, children }: PropsWithChildren<{ pageProps: AppProps['pageProps'] }>) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>{children}</HydrationBoundary>
    </QueryClientProvider>
  );
}

export default QueryProvider;
