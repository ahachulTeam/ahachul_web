'use client';

import { type PropsWithChildren } from 'react';

import { ErrorBoundary } from 'react-error-boundary';
import AlertCircleIcon from '@/common/assets/icons/alert-circle';
import { captureError } from '@/common/utils/error/captureError';

export const UnPredictableErrorBoundary = ({ children }: PropsWithChildren) => {
  return (
    <ErrorBoundary
      fallback={<PartialError />}
      onError={(error) => {
        captureError(error);
      }}
    >
      {children}
    </ErrorBoundary>
  );
};

export const PartialError = () => (
  <span className="flex items-center justify-center">
    <AlertCircleIcon />
  </span>
);
