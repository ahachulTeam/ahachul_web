import { ErrorBoundaryFallbackProps } from './ErrorBoundary';
import { errWrap } from './style';

function ErrorDefault({ error, fallbackCss, reset }: ErrorBoundaryFallbackProps<Error>) {
  console.log('error:', error);

  return (
    <div css={[errWrap, fallbackCss]}>
      <p>
        네트워크 오류가 발생했습니다.
        <br />
        다시 시도해 주세요.
      </p>
      <button onClick={reset}>새로고침</button>
    </div>
  );
}

export default ErrorDefault;
