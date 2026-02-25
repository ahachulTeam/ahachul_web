'use client';

import { useEffect } from 'react';

import ErrorFallbackView from '@/components/Error/ErrorFallbackView';
import { reportClientError, resolveClientErrorMessage } from '@/lib/observability';

type Props = {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
};

export default function AppError({ error, reset }: Props) {
  useEffect(() => {
    reportClientError(
      'next:error-boundary',
      error,
      {
        digest: error.digest,
      },
      '페이지를 불러오는 중 오류가 발생했습니다.',
    );
  }, [error]);

  return (
    <ErrorFallbackView
      title="페이지를 불러오지 못했습니다."
      description={resolveClientErrorMessage(error, '잠시 후 다시 시도해주세요.')}
      actionLabel="다시 시도"
      onAction={reset}
    />
  );
}
