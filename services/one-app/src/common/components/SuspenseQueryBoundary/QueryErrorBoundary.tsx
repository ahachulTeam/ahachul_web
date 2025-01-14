'use client';

import type { ComponentProps, PropsWithChildren } from 'react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';

import { BaseErrorBoundary } from './ErrorBoundary';

export const QueryErrorBoundary = (
  props: PropsWithChildren<ComponentProps<typeof BaseErrorBoundary>>,
) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <BaseErrorBoundary {...props} resetError={reset}>
          {props.children}
        </BaseErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};
