import { CSSObject, keyframes, Theme } from '@emotion/react';
import { f } from 'styles';

export const wrapper = [
  f.posRel,
  {
    display: 'inline-block',
    width: '24px',
    height: '24px',
  },
];

const spinKeyframes = keyframes`
  to: {
    transform: "rotate(360deg)",
  }
`;

export const inner: [CSSObject, CSSObject, ({ color }: Theme) => CSSObject] = [
  f.fullWidth,
  f.posAbs,
  ({
    color: {
      static: {
        dark: { gray },
      },
    },
  }: Theme) => ({
    boxSizing: 'border-box',
    display: 'block',
    height: '100%',
    borderRadius: '50%',
    border: `3px solid ${gray[900]}`,
    borderTopColor: 'transparent',
    animation: `${spinKeyframes} 1s linear infinite`,
  }),
];
