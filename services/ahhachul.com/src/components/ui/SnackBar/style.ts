import { keyframes, type CSSObject, type Theme } from '@emotion/react';

const scaleUp = keyframes`
  from { max-height: 0;}
  to {max-height: 64px;}
`;

const scaleDown = keyframes`
  from { max-height: 64px;}
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
  minWidth: '300px',
  maxWidth: '608px',
  maxHeight: 0,
  overflow: 'visible',
  animation: `0.6s forwards ${isClosing ? scaleDown : scaleUp}`,
  willChange: 'max-height',

  '& > div': {
    animation: `0.3s forwards ${isClosing ? fadeOut : fadeIn}`,
    willChange: 'opacity, transform',
  },
});

const toast = ({
  color: {
    scale: { gray },
  },
}: Theme): CSSObject => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '30px',
  background: gray[700],
  padding: '20px 24px',
  borderRadius: '20px',
});

const text = ({
  color: {
    scale: { gray },
  },
  typography: { fontSize, fontWeight },
}: Theme): CSSObject => ({
  color: gray[1000],
  fontSize: fontSize[16],
  fontWeight: fontWeight[700],
  lineHeight: 1.5,
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
});

const closeBtn = ({
  color: {
    scale: { gray },
  },
}: Theme): CSSObject => ({
  width: '24px',
  height: '24px',

  '& > svg > path': {
    fill: gray[1000],
  },
});

export { container, wrap, toast, text, closeBtn };
