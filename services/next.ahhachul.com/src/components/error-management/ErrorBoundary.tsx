import { Interpolation, Theme } from '@emotion/react';
import React, {
  Component,
  type ErrorInfo,
  type FunctionComponent,
  type PropsWithChildren,
  type ReactNode,
  createContext,
  forwardRef,
  useContext,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';

import type { ConstructorType, Nullable } from '@/src/types';
import {
  AssertionError,
  useErrorBoundary_this_hook_should_be_called_in_ErrorBoundary_props_children,
} from './AssertionError';
import { ErrorBoundaryGroupContext } from './ErrorBoundaryGroup';
import ErrorDefault from './ErrorDefault';
import { hasResetKeysChanged } from './utils';

export interface ErrorBoundaryFallbackProps<TError extends Error = Error> {
  /**
   * when ErrorBoundary catch error, you can use this error
   */
  error: TError;
  /**
   * when you want to reset caught error, you can use this reset
   */
  reset: () => void;

  fallbackCss?: Interpolation<Theme>;
}

type ShouldCatchCallback = (error: Error) => boolean;
type ShouldCatch = ConstructorType<Error> | ShouldCatchCallback | boolean;
const checkErrorBoundary = (shouldCatch: ShouldCatch, error: Error) => {
  if (typeof shouldCatch === 'boolean') {
    return shouldCatch;
  }
  if (shouldCatch.prototype instanceof Error) {
    return error instanceof shouldCatch;
  }
  return (shouldCatch as ShouldCatchCallback)(error);
};

export type ErrorBoundaryProps = PropsWithChildren<{
  /**
   * an array of elements for the ErrorBoundary to check each render. If any of those elements change between renders, then the ErrorBoundary will reset the state which will re-render the children
   */
  resetKeys?: unknown[];
  /**
   * when ErrorBoundary is reset by resetKeys or fallback's props.reset, onReset will be triggered
   */
  onReset?(): void;
  /**
   * when ErrorBoundary catch error, onError will be triggered
   */
  onError?(error: Error, info: ErrorInfo): void;
  /**
   * when ErrorBoundary catch error, fallback will be render instead of children
   */
  fallback?: ReactNode | FunctionComponent<ErrorBoundaryFallbackProps>;
  /**
   * @experimental This is experimental feature.
   * @default true
   */
  /**
   * when ErrorBoundary catch error, fallback will be render instead of children
   */
  fallbackCss?: Interpolation<Theme>;
  shouldCatch?: ShouldCatch | [ShouldCatch, ...ShouldCatch[]];
}>;

type ErrorBoundaryState<TError extends Error = Error> =
  | { isError: true; error: TError }
  | { isError: false; error: null };

const initialErrorBoundaryState: ErrorBoundaryState = {
  isError: false,
  error: null,
};
class BaseErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { isError: true, error };
  }

  state = initialErrorBoundaryState;

  componentDidUpdate(prevProps: ErrorBoundaryProps, prevState: ErrorBoundaryState) {
    const { isError } = this.state;
    const { resetKeys } = this.props;
    if (isError && prevState.isError && hasResetKeysChanged(prevProps.resetKeys, resetKeys)) {
      this.reset();
    }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (error instanceof AssertionError) {
      throw error;
    }
    const { shouldCatch = true } = this.props;
    const isCatch = Array.isArray(shouldCatch)
      ? shouldCatch.some((shouldCatch) => checkErrorBoundary(shouldCatch, error))
      : checkErrorBoundary(shouldCatch, error);
    if (!isCatch) {
      throw error;
    }
    this.props.onError?.(error, info);
  }

  reset = () => {
    this.props.onReset?.();
    this.setState(initialErrorBoundaryState);
  };

  render() {
    const { children, fallback, fallbackCss } = this.props;
    const { isError, error } = this.state;

    let childrenOrFallback = children;

    if (isError) {
      if (typeof fallback === 'undefined') {
        if (process.env.NODE_ENV === 'development') {
          console.error('ErrorBoundary requires a defined fallback');
        }
      }

      if (typeof fallback === 'function') {
        const FallbackComponent = fallback;
        childrenOrFallback = <FallbackComponent error={error} reset={this.reset} fallbackCss={fallbackCss} />;
      } else {
        childrenOrFallback = <ErrorDefault error={error} reset={this.reset} />;
      }
    }

    return (
      <ErrorBoundaryContext.Provider value={{ ...this.state, reset: this.reset }}>
        {childrenOrFallback}
      </ErrorBoundaryContext.Provider>
    );
  }
}

export const ErrorBoundary = Object.assign(
  (() => {
    const ErrorBoundary = forwardRef<{ reset(): void }, ErrorBoundaryProps>(
      ({ fallback, fallbackCss, children, onError, onReset, resetKeys, ...props }, ref) => {
        const group = useContext(ErrorBoundaryGroupContext) ?? { resetKey: 0 };
        const baseErrorBoundaryRef = useRef<BaseErrorBoundary>(null);
        useImperativeHandle(ref, () => ({
          reset: () => baseErrorBoundaryRef.current?.reset(),
        }));

        return (
          <BaseErrorBoundary
            {...props}
            fallback={fallback}
            onError={onError}
            onReset={onReset}
            resetKeys={[group.resetKey, ...(resetKeys || [])]}
            ref={baseErrorBoundaryRef}
            fallbackCss={fallbackCss}
          >
            {children}
          </BaseErrorBoundary>
        );
      },
    );

    if (process.env.NODE_ENV === 'development') {
      ErrorBoundary.displayName = 'ErrorBoundary';
    }

    return ErrorBoundary;
  })(),
  {
    Consumer: ({ children }: { children: (errorBoundary: ReturnType<typeof useErrorBoundary>) => ReactNode }) =>
      children(useErrorBoundary()),
  },
);

const ErrorBoundaryContext = createContext<Nullable<{ reset: () => void } & ErrorBoundaryState>>(null);
if (process.env.NODE_ENV === 'development') {
  ErrorBoundaryContext.displayName = 'ErrorBoundaryContext';
}

export const useErrorBoundary = <TError extends Error = Error>() => {
  const [state, setState] = useState<ErrorBoundaryState<TError>>({
    isError: false,
    error: null,
  });
  if (state.isError) {
    throw state.error;
  }

  const errorBoundary = useContext(ErrorBoundaryContext);
  AssertionError.assert(
    errorBoundary != null && !errorBoundary.isError,
    useErrorBoundary_this_hook_should_be_called_in_ErrorBoundary_props_children,
  );

  return useMemo(
    () => ({
      setError: (error: TError) => setState({ isError: true, error }),
    }),
    [],
  );
};
