import { CSSObject } from '@emotion/react';

function BottomDim() {
  return <article css={containerCss}></article>;
}

const containerCss: CSSObject = {
  width: '100vw',
  maxWidth: '475px',
  margin: '0 auto',
  position: 'fixed',
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 'bottomDim',
  pointerEvents: 'none',
  background:
    'linear-gradient(180deg, rgba(24, 24, 29, 0.00) 0%, rgba(24, 24, 29, 0.09) 7.58%, rgba(24, 24, 29, 0.59) 34.59%, rgba(24, 24, 29, 0.69) 41.18%, rgba(24, 24, 29, 0.83) 51.39%, #18181D 63.25%)',
  height: '200px',
};

export default BottomDim;
