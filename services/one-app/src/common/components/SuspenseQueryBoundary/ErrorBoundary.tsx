'use client';

import React from 'react';

import { isChangedArray } from '@/common/utils';

type ErrorFallbackProps = {
  error: Error;
  reset: () => void;
};

<<<<<<< HEAD
type ErrorFallbackType = React.ReactNode | ((props: ErrorFallbackProps) => React.ReactNode);
=======
type ErrorFallbackType =
  | React.ReactNode
  | ((props: ErrorFallbackProps) => React.ReactNode);
>>>>>>> develop

interface ErrorBoundaryProps {
  keys?: unknown[];
  children: React.ReactNode;
  errorFallback: ErrorFallbackType;
  resetError?: VoidFunction;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

const errorBoundaryInitialState = { hasError: false, error: null };

<<<<<<< HEAD
export class BaseErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
=======
export class BaseErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
>>>>>>> develop
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = errorBoundaryInitialState;
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    console.error(error);
    return { hasError: true, error };
  }

<<<<<<< HEAD
  componentDidUpdate(prevProps: ErrorBoundaryProps, prevState: ErrorBoundaryState) {
    const { error } = this.state;
    const { keys } = this.props;

    if (error !== null && prevState.error !== null && isChangedArray(prevProps.keys, keys)) {
=======
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
>>>>>>> develop
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
