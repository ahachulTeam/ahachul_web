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

import { base } from 'api';
import { AuthQuery } from 'queries';
import { useAppSelector } from 'stores';

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

  if (auth?.token.accessToken) {
    base.defaults.headers.common['authorization'] = `Bearer ${auth?.token.accessToken}`;
  }

  const enabled = options?.enabled === undefined ? true : options.enabled;
  const { refetch, ...rest } = useQuery(queryKey, queryFn, {
    ...options,
    enabled: enabled && !!auth?.token.accessToken,
    onError(err) {
      if ((err as AxiosError)?.response?.status === 401 && auth) {
        auth?.token.refreshToken &&
          mutate({
            memberId: auth.memberId,
            refreshToken: auth.token.refreshToken,
          });
      }

      options?.onError?.(err);
    },
  });

  useEffect(() => {
    if (status === 'success') {
      refetch();
    }
  }, [status]);

  return { refetch, ...rest };
}

function useAuthMutation<TData = unknown, TError = unknown, TVariables = void, TContext = unknown>(
  mutationFn: MutationFunction<TData, TVariables>,
  options?: Omit<UseMutationOptions<TData, TError, TVariables, TContext>, 'mutationKey' | 'mutationFn'>,
) {
  const { auth } = useAppSelector((state) => state.auth);
  if (auth?.token.accessToken) {
    base.defaults.headers.common['authorization'] = `Bearer ${auth?.token.accessToken}`;
  }

  return useMutation(mutationFn, options);
}

export * from '@tanstack/react-query';
export { useAuthQuery, useAuthMutation };
