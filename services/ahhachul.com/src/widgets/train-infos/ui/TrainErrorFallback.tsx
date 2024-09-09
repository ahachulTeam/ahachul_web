import type { ErrorFallbackProps } from 'entities/app-errors/ui/ErrorBoundary';

export const TrainErrorFallback = (props: ErrorFallbackProps) => {
  const { error, reset } = props;

  return (
    <div>
      <span css={{ color: 'white' }}>{error.message}</span>
      <br />
      <button type="button" onClick={reset}>
        <span css={{ color: 'white' }}>다시 시도</span>
      </button>
    </div>
  );
};
