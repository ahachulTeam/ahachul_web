import { keyframes, type CSSObject, type Theme } from '@emotion/react';

const scaleUp = keyframes`
  from { max-height: 0;}
  to {max-height: 82px;}
`;

const scaleDown = keyframes`
  from { max-height: 82px;}
  to { max-height: 0;}
 `;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-50%);}
  to { opacity: 1; transform: translateY(0)}
`;

const fadeOut = keyframes`
  from { opacity: 1; transform: translateY(0)}
  to { opacity: 0; transform: translateY(50%)}
 `;

const container = (posBottom: number): CSSObject => ({
  position: 'fixed',
  bottom: `${posBottom}px`,
  left: '50%',
  height: 'max-content',
  transform: 'translateX(-50%)',
  zIndex: 4000,

  '& > div:not(:first-of-type)': {
    marginTop: '12px',
  },
});

const wrap = (isClosing: boolean): CSSObject => ({
  width: '608px',
  maxHeight: 0,
  overflow: 'visible',
  animation: `0.6s forwards ${isClosing ? scaleDown : scaleUp}`,

  '& > div': {
    animation: `0.3s forwards ${isClosing ? fadeOut : fadeIn}`,
  },
});

const toast = ({
  color: {
    primary: { tertiary },
  },
}: Theme): CSSObject => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '30px',
  background: tertiary,
  padding: '20px 24px',
  borderRadius: '20px',
});

const text = ({
  color: {
    primary: { white },
  },
  typography: {
    size: { element3 },
    weight: { bold },
  },
}: Theme): CSSObject => ({
  color: white,
  fontSize: element3,
  fontWeight: bold,
  lineHeight: 1.5,
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
});

const closeBtn = ({
  color: {
    primary: { white },
  },
}: Theme): CSSObject => ({
  width: '24px',
  height: '24px',

  '& > svg > path': {
    fill: white,
  },
});

export { container, wrap, toast, text, closeBtn };
