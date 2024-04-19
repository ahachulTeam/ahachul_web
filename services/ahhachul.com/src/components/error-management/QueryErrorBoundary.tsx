import React, { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { type ComponentPropsWithoutRef, type ComponentRef, forwardRef } from 'react';
import { ErrorBoundary } from './ErrorBoundary';

export const QueryErrorBoundary = forwardRef<
  ComponentRef<typeof ErrorBoundary>,
  ComponentPropsWithoutRef<typeof ErrorBoundary>
>(({ onReset, ...props }, resetRef) => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary
      {...props}
      onReset={() => {
        onReset?.();
        reset();
      }}
      ref={resetRef}
    />
  );
});
if (process.env.NODE_ENV === 'development') {
  QueryErrorBoundary.displayName = 'QueryErrorBoundary';
}
