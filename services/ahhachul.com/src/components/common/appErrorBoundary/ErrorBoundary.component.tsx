import React from 'react';

import type { AxiosError } from 'axios';

import { isChangedArray } from '@ahhachul/utils';

import { reportClientError } from '@/utils/observability';

type ErrorFallbackProps = {
  error: AxiosError;
  reset: () => void;
};

type ErrorFallbackType = React.ReactNode | ((props: ErrorFallbackProps) => React.ReactNode);

interface ErrorBoundaryProps {
  keys?: unknown[];
  children: React.ReactNode;
  errorFallback: ErrorFallbackType;
  resetError?: VoidFunction;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: AxiosError | null;
}

const errorBoundaryInitialState = { hasError: false, error: null };

class BaseErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = errorBoundaryInitialState;
  }

  static getDerivedStateFromError(error: AxiosError): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    reportClientError(
      'vite:suspense-query-boundary',
      error,
      {
        componentStack: info.componentStack,
      },
      '데이터를 불러오는 중 오류가 발생했습니다.',
    );
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps, prevState: ErrorBoundaryState) {
    const { error } = this.state;
    const { keys } = this.props;
    const shouldResetOnKeyChange =
      error !== null && prevState.error !== null && isChangedArray(prevProps.keys, keys);

    if (shouldResetOnKeyChange) {
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

    if (hasError && error !== null) {
      return typeof errorFallback === 'function'
        ? errorFallback({ error, reset: this.resetBoundary })
        : errorFallback;
    }
    return children;
  }
}

export default BaseErrorBoundary;
