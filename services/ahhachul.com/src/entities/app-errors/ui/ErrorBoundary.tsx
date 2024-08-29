import React from 'react';
import themes from 'shared/themes.css';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class BaseErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    console.error(error);
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <h3 style={{ color: themes.color.text[50] }}>Something went wrong.</h3>
      );
    }

    return this.props.children;
  }
}

export { BaseErrorBoundary };
