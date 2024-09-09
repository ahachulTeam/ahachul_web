import { Interpolation, Theme } from '@emotion/react';
import type { ErrorFallbackProps } from 'entities/app-errors/ui/ErrorBoundary';

export const ArticleDetailErrorFallback = (
  props: ErrorFallbackProps & {
    css?: Interpolation<Theme>;
  },
) => {
  const { css, error, reset } = props;

  return (
    <div css={css}>
      <span css={{ color: 'white' }}>{error.message}</span>
      <br />
      <button type="button" onClick={reset}>
        <span css={{ color: 'white' }}>다시 시도</span>
      </button>
    </div>
  );
};
