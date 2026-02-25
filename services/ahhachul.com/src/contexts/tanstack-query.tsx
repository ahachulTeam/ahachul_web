import React, { type PropsWithChildren } from 'react';

import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { QUERY_GC_TIME, QUERY_STALE_TIME } from '@ahhachul/domain';

import { appLogger, reportClientError } from '@/utils/observability';

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      const normalizedError = reportClientError(
        'react-query:query',
        error,
        {
          queryKey: query.queryKey,
        },
        '데이터를 불러오는 중 오류가 발생했습니다.',
      );

      if (normalizedError.isAuthError) {
        appLogger.warn('[react-query] unauthorized query error', {
          queryKey: query.queryKey,
          code: normalizedError.code,
          status: normalizedError.status,
        });
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: (error, _variables, _context, mutation) => {
      reportClientError(
        'react-query:mutation',
        error,
        {
          mutationKey: mutation.options.mutationKey,
        },
        '요청 처리 중 오류가 발생했습니다.',
      );
    },
  }),
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
