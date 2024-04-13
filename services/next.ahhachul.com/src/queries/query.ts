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

import { base } from '@/src/api';
import { AuthQuery } from '.';
import { useAppSelector } from '@/src/stores';

function useAuthQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options?: Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'queryKey' | 'queryFn'>,
) {
  const { auth } = useAppSelector((state) => state.auth);
  const { mutate, status } = AuthQuery.useRefreshToken();

  if (auth?.accessToken) {
    base.defaults.headers.common['authorization'] = `Bearer ${auth?.accessToken}`;
  }

  const enabled = options?.enabled === undefined ? true : options.enabled;
  const { error, refetch, ...rest } = useQuery({
    queryKey,
    queryFn,
    enabled: enabled && !!auth?.accessToken,
    ...options,
  });

  useEffect(() => {
    if (status === 'success') {
      refetch();
    }

    if (status === 'error') {
      if ((error as AxiosError)?.response?.status === 401 && auth) {
        auth?.refreshToken &&
          mutate({
            refreshToken: auth.refreshToken,
          });
      }
    }
  }, [status]);

  return { refetch, ...rest };
}

function useAuthMutation<TData = unknown, TError = unknown, TVariables = void, TContext = unknown>(
  mutationFn: MutationFunction<TData, TVariables>,
  options?: Omit<UseMutationOptions<TData, TError, TVariables, TContext>, 'mutationKey' | 'mutationFn'>,
) {
  const { auth } = useAppSelector((state) => state.auth);
  if (auth?.accessToken) {
    base.defaults.headers.common['authorization'] = `Bearer ${auth?.accessToken}`;
  }

  return useMutation({
    mutationFn,
    ...options,
  });
}

export * from '@tanstack/react-query';
export { useAuthQuery, useAuthMutation };
