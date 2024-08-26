import { useEffect } from 'react';
import {
  useQuery,
  QueryKey,
  UseQueryOptions,
  QueryFunction,
  useMutation,
  MutationFunction,
  UseMutationOptions,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { AuthQuery } from 'features/app-authentications';

import { axiosInstance } from 'shared/api';
import { useAppSelector } from 'shared/stores';

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
  options?: Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'queryKey' | 'queryFn'>;
}) {
  const { auth } = useAppSelector((state) => state.auth);
  const { mutate, status: refreshTokenFetchStatus } = AuthQuery.useRefreshToken();

  if (auth?.accessToken) {
    axiosInstance.defaults.headers.common['authorization'] = `Bearer ${auth?.accessToken}`;
  }

  const enabled = options?.enabled === undefined ? true : options.enabled;
  const {
    error,
    status: currentFetchStatus,
    refetch: currentRefetch,
    ...rest
  } = useQuery({
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

function useAuthMutation<TData = unknown, TError = unknown, TVariables = void, TContext = unknown>({
  mutationFn,
  options,
}: {
  mutationFn: MutationFunction<TData, TVariables>;
  options?: Omit<UseMutationOptions<TData, TError, TVariables, TContext>, 'mutationKey' | 'mutationFn'>;
}) {
  const { auth } = useAppSelector((state) => state.auth);
  if (auth?.accessToken) {
    axiosInstance.defaults.headers.common['authorization'] = `Bearer ${auth?.accessToken}`;
  }

  return useMutation({
    mutationFn,
    ...options,
  });
}

export * from '@tanstack/react-query';
export { getQueryKeys, useAuthQuery, useAuthMutation };
