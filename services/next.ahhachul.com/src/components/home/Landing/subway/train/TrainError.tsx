import { CSSObject, Theme } from '@emotion/react';
import { ErrorBoundaryFallbackProps } from '@/src/components/error-management';

const TrainError = ({ error, reset }: ErrorBoundaryFallbackProps<Error>) => {
  console.log('error:', error);

  return (
    <div css={errWrap}>
      <p>네트워크 오류가 발생했습니다.</p>
      <button onClick={reset}>새로고침</button>
    </div>
  );
};

const errWrap = ({ color: { gray }, typography: { fontSize, fontWeight, lineHeight } }: Theme): CSSObject => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  width: '100%',
  top: '20px',
  left: '50%',
  transform: 'translateX(-50%)',

  '& > p': {
    color: '#c9cedc',
    fontSize: fontSize[14],
    fontWeight: fontWeight[500],
    lineHeight: lineHeight[150],
    marginBottom: '8px',
    textAlign: 'center',
  },

  '& > button': {
    color: gray[1000],
    fontSize: '14px',
    fontWeight: fontWeight[700],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TrainError;
