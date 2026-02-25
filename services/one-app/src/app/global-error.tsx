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

export default function GlobalError({ error, reset }: Props) {
  useEffect(() => {
    reportClientError(
      'next:global-error-boundary',
      error,
      {
        digest: error.digest,
      },
      '앱 전역 오류가 발생했습니다.',
    );
  }, [error]);

  return (
    <html lang="ko">
      <body>
        <ErrorFallbackView
          title="서비스를 일시적으로 이용할 수 없습니다."
          description={resolveClientErrorMessage(
            error,
            '일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
          )}
          actionLabel="앱 다시 시도"
          onAction={reset}
        />
      </body>
    </html>
  );
}
