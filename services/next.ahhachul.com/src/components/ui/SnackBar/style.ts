import { type CSSObject, type Theme } from '@emotion/react';

const container =
  (posBottom: number) =>
  ({
    dimensions: {
      zIndexes: { toast },
    },
  }: Theme): CSSObject => ({
    position: 'fixed',
    bottom: `${posBottom}px`,
    left: 0,
    height: 'max-content',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: toast,

    '& > div:not(:first-of-type)': {
      marginTop: '12px',
    },
  });

const wrap = {
  minWidth: 'max-content',
  maxWidth: '608px',
};

const toast: CSSObject = {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '30px',
  background: 'linear-gradient(91deg, rgba(35, 40, 52, 0.87) 0%, rgba(39, 40, 62, 0.87) 100%)',
  padding: '8px 36px',
  borderRadius: '10px',
  position: 'relative',
};

const text = ({ typography: { fontSize, fontWeight } }: Theme): CSSObject => ({
  width: '100%',
  textAlign: 'center',
  color: 'rgb(196, 212, 252, 0.87)',
  fontSize: fontSize[12],
  fontWeight: fontWeight[400],
  lineHeight: 1.5,
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
});

const closeBtn: CSSObject = {
  width: '16px',
  height: '16px',
  position: 'absolute',
  top: '50%',
  right: '12px',
  transform: 'translateY(-50%)',
  alignItems: 'center',

  '& > svg > path': {
    fill: 'rgb(196, 212, 252, 0.87)',
  },
};

export { container, wrap, toast, text, closeBtn };
