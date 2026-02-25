import React, { type PropsWithChildren } from 'react';

import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { QUERY_GC_TIME, QUERY_STALE_TIME } from '@ahhachul/domain';

import { appLogger, createActionLogger, reportClientError } from '@/utils/observability';

const queryLogger = createActionLogger('react-query');

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      const normalizedError = reportClientError(
        'react-query:query',
        error,
        {
          queryKey: query.queryKey,
          queryHash: query.queryHash,
          fetchStatus: query.state.fetchStatus,
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
    onSuccess: (_data, query) => {
      queryLogger.success('query-cache-success', {
        queryKey: query.queryKey,
        queryHash: query.queryHash,
      });
    },
  }),
  mutationCache: new MutationCache({
    onError: (error, _variables, _context, mutation) => {
      reportClientError(
        'react-query:mutation',
        error,
        {
          mutationKey: mutation.options.mutationKey,
          mutationId: mutation.mutationId,
        },
        '요청 처리 중 오류가 발생했습니다.',
      );
    },
    onSuccess: (_data, _variables, _context, mutation) => {
      queryLogger.success('mutation-cache-success', {
        mutationKey: mutation.options.mutationKey,
        mutationId: mutation.mutationId,
      });
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
