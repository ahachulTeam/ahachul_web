'use client';

import { useEffect } from 'react';

import { reportClientError } from '@/lib/observability';

export default function GlobalErrorListeners() {
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      reportClientError(
        'window:error',
        event.error ?? new Error(event.message),
        {
          source: event.filename,
          line: event.lineno,
          column: event.colno,
        },
        '브라우저 런타임 오류가 발생했습니다.',
      );
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      reportClientError(
        'window:unhandledrejection',
        event.reason,
        undefined,
        '처리되지 않은 비동기 오류가 발생했습니다.',
      );
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  return null;
}
