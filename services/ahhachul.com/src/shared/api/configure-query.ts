import { useEffect } from 'react';
import {
  useQuery,
  QueryKey,
  UseQueryOptions,
  QueryFunction,
  useMutation,
  MutationFunction,
  UseMutationOptions,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { base } from 'shared/api/configure-axios';
import { useRefreshToken } from 'entities/app-authentications';
import { useAuthStore } from 'entities/app-authentications/slice';

function getQueryKeys(type: string[]) {
  return {
    all: type,
    lists() {
      return [...this.all, 'list'] as const;
    },
    list(filters: Record<string, unknown>) {
      return [...this.lists(), filters] as const;
    },
    details() {
      return [...this.all, 'detail'] as const;
    },
    detail(id: number | string) {
      return [...this.details(), id] as const;
    },
    comments(id: number | string) {
      return [...this.detail(id), 'comments'] as const;
    },
  };
}

function useAuthQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>({
  queryKey,
  queryFn,
  options,
}: {
  queryKey: TQueryKey;
  queryFn: QueryFunction<TQueryFnData, TQueryKey>;
  options?: Omit<
    UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    'queryKey' | 'queryFn'
  > & { suspense?: boolean };
}) {
  const auth = useAuthStore(({ state }) => state);
  const { mutate, status: refreshTokenFetchStatus } = useRefreshToken();

  if (auth?.accessToken) {
    base.defaults.headers.common['authorization'] =
      `Bearer ${auth?.accessToken}`;
  }

  const callAPI = options?.suspense ? useSuspenseQuery : useQuery;
  const enabled = options?.enabled === undefined ? true : options.enabled;
  const {
    error,
    status: currentFetchStatus,
    refetch: currentRefetch,
    ...rest
  } = callAPI({
    queryKey,
    queryFn,
    enabled,
    ...options,
  });

  useEffect(() => {
    if (currentFetchStatus === 'error') {
      if ((error as AxiosError)?.response?.status === 401 && auth) {
        auth?.refreshToken &&
          mutate({
            refreshToken: auth.refreshToken,
          });
      }
    }
  }, [currentFetchStatus]);

  useEffect(() => {
    if (refreshTokenFetchStatus === 'success') {
      currentRefetch();
    }
  }, [refreshTokenFetchStatus]);

  return { refetch: currentRefetch, ...rest };
}

function useAuthMutation<
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown,
>({
  mutationFn,
  options,
}: {
  mutationFn: MutationFunction<TData, TVariables>;
  options?: Omit<
    UseMutationOptions<TData, TError, TVariables, TContext>,
    'mutationKey' | 'mutationFn'
  >;
}) {
  const auth = useAuthStore(({ state }) => state);
  if (auth?.accessToken) {
    base.defaults.headers.common['authorization'] =
      `Bearer ${auth?.accessToken}`;
  }

  return useMutation({
    mutationFn,
    ...options,
  });
}

export * from '@tanstack/react-query';
export { getQueryKeys, useAuthQuery, useAuthMutation };
