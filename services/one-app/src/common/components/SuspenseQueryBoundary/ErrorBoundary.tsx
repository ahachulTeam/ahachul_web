'use client';

import React from 'react';
import { isChangedArray } from '@/common/utils/array';

type ErrorFallbackType = <ErrorType extends Error>(
  props: ErrorFallbackProps<ErrorType>,
) => React.ReactNode;

interface ErrorFallbackProps<ErrorType extends Error = Error> {
  error: ErrorType;
  reset: VoidFunction;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  errorFallback?: ErrorFallbackType;
  resetError?: VoidFunction;
  keys?: unknown[];
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

const errorBoundaryInitialState = { hasError: false, error: null };

export class BaseErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = errorBoundaryInitialState;
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    console.error(error);
    return { hasError: true, error };
  }

  componentDidUpdate(
    prevProps: ErrorBoundaryProps,
    prevState: ErrorBoundaryState,
  ) {
    const { error } = this.state;
    const { keys } = this.props;

    if (
      error !== null &&
      prevState.error !== null &&
      isChangedArray(prevProps.keys, keys)
    ) {
      this.resetBoundary();
    }
  }

  resetBoundary = () => {
    const { resetError } = this.props;
    resetError?.();
    this.setState(errorBoundaryInitialState);
  };

  render() {
    const { hasError, error } = this.state;
    const { children, errorFallback } = this.props;

    const isErrExist = hasError && error !== null;
    const fallbackUI = (err: ErrorFallbackProps['error']) =>
      errorFallback?.({ error: err, reset: this.resetBoundary });

    if (isErrExist) return fallbackUI(error);
    return children;
  }
}
