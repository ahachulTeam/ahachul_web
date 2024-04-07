import { Theme } from '@emotion/react';
import { f } from 'styles';

const paddingTopHeight = '14px';

const wrap = [
  f.fullWidth,
  f.flexColumn,
  ({
    color: {
      static: {
        dark: { gray },
      },
    },
  }: Theme) => ({ gap: '36px', padding: `${paddingTopHeight} 0 48px`, backgroundColor: gray[0] }),
];

const pageTitle = ({
  color: {
    scale: { gray },
  },
  typography: { fontSize, fontWeight },
}: Theme) => ({
  marginBottom: '16px',
  fontSize: fontSize[16],
  fontWeight: fontWeight[600],
  color: gray[1000],
  paddingLeft: '20px',
});

const ticketWrap = [
  f.fullWidth,
  f.flexColumn,
  f.sideGutter,
  ({
    color: {
      static: {
        dark: { gray },
      },
    },
  }: Theme) => ({
    backgroundColor: gray[200],
  }),
];

export { wrap, pageTitle, ticketWrap };
