import type { ErrorInfo, ReactNode } from 'react';
import React from 'react';

import { normalizeClientError, reportClientError } from '@/utils/observability';

import AppErrorFallback from './AppErrorFallback.component';

type GlobalAppErrorBoundaryProps = {
  children: ReactNode;
};

type GlobalAppErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};

const initialState: GlobalAppErrorBoundaryState = {
  hasError: false,
  error: null,
};

class GlobalAppErrorBoundary extends React.Component<
  GlobalAppErrorBoundaryProps,
  GlobalAppErrorBoundaryState
> {
  constructor(props: GlobalAppErrorBoundaryProps) {
    super(props);
    this.state = initialState;
  }

  static getDerivedStateFromError(error: Error): GlobalAppErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    reportClientError(
      'global-react-boundary',
      error,
      {
        componentStack: info.componentStack,
      },
      '화면 렌더링 중 오류가 발생했습니다.',
    );
  }

  private resetBoundary = () => {
    this.setState(initialState);
  };

  render() {
    if (this.state.hasError) {
      const normalizedError = normalizeClientError(
        this.state.error,
        '화면 렌더링 중 오류가 발생했습니다.',
      );

      return (
        <AppErrorFallback
          title="일시적인 화면 오류가 발생했습니다."
          description={normalizedError.userMessage}
          actionLabel="다시 그리기"
          onAction={this.resetBoundary}
        />
      );
    }

    return this.props.children;
  }
}

export default GlobalAppErrorBoundary;
