import { Suspense, type ComponentProps, type PropsWithChildren } from 'react';

import { BaseErrorBoundary, QueryErrorBoundary } from '../appErrorBoundary';

const SuspenseQueryBoundary = (
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

export default SuspenseQueryBoundary;
