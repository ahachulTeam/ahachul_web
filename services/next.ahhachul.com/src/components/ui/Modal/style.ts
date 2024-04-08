import { css } from '@emotion/react';

const modalOverlayCss = css({
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  background: 'rgba(0, 0, 0, 0.60)',
  padding: '28px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 9999,
});

const modalContentCss = css({
  background: '#141517',
  borderRadius: '14px',
  maxWidth: '300px',
  width: '100%',
  padding: '20px 24px',
});

export { modalContentCss, modalOverlayCss };
