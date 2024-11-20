'use client';

import { Suspense, type ComponentProps, type PropsWithChildren } from 'react';
import { BaseErrorBoundary } from './ErrorBoundary';
import { QueryErrorBoundary } from './QueryErrorBoundary';

export const SuspensedQueryBoundary = (
  props: PropsWithChildren<
    ComponentProps<typeof BaseErrorBoundary> & {
      suspenseFallback: React.ReactNode;
    }
  >,
) => {
  return (
    <QueryErrorBoundary
      keys={props.keys}
      resetError={props.resetError}
      errorFallback={props.errorFallback}
    >
      <Suspense fallback={props.suspenseFallback}>{props.children}</Suspense>
    </QueryErrorBoundary>
  );
};
