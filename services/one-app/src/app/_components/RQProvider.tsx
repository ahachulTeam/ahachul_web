'use client';

import React from 'react';
import {
  QueryClientProvider,
  QueryClient,
  QueryCache,
  MutationCache,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { useAppErrorStore } from '@/store/appErrorStore';
import { RequestGetError } from '@/common/errors/RequestGetError';

type Props = {
  children: React.ReactNode;
};

export const RQProvider = ({ children }: Props) => {
  const { updateAppError } = useAppErrorStore();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        throwOnError: true,
        refetchOnWindowFocus: false,
      },
    },
    queryCache: new QueryCache({
      onError: (error: Error) => {
        if (
          error instanceof RequestGetError &&
          // errorBoundary로 처리해야하는 에러인 경우 updateAppError를 하지 못하도록 얼리리턴
          error.errorHandlingStrategy === 'fallback'
        )
          return;

        updateAppError(error);
      },
    }),
    mutationCache: new MutationCache({
      onError: (error: Error) => {
        updateAppError(error);
      },
    }),
  });

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools
        initialIsOpen={process.env.NODE_ENV === 'development'}
      />
    </QueryClientProvider>
  );
};
