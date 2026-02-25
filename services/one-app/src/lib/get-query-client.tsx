import {
  MutationCache,
  QueryCache,
  QueryClient,
  defaultShouldDehydrateQuery,
  isServer,
} from '@tanstack/react-query';

import { QUERY_GC_TIME, QUERY_STALE_TIME } from '@ahhachul/domain';

import { appLogger, createActionLogger, reportClientError } from '@/lib/observability';

const queryLogger = createActionLogger('react-query');

function makeQueryClient() {
  return new QueryClient({
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
            status: normalizedError.status,
            code: normalizedError.code,
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
        gcTime: QUERY_GC_TIME.feed,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        staleTime: QUERY_STALE_TIME.feed,
      },
      dehydrate: {
        // include pending queries in dehydration
        shouldDehydrateQuery: query =>
          defaultShouldDehydrateQuery(query) || query.state.status === 'pending',
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}
