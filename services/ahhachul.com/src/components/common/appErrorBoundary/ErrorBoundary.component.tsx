import React from 'react';

import type { AxiosError } from 'axios';

import { isChangedArray } from '@ahhachul/utils';

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
    console.error(error);
    return { hasError: true, error };
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps, prevState: ErrorBoundaryState) {
    const { error } = this.state;
    const { keys } = this.props;

    if (error !== null && prevState.error !== null && isChangedArray(prevProps.keys, keys)) {
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
