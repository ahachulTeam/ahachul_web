import { CSSObject, Theme } from '@emotion/react';
import { f } from '@/src/styles';

const titleSectionHeight = '18.4px';
const filterSectionHeight = '46px';
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
  }: Theme) => ({ gap: '36px', padding: `${paddingTopHeight} 0 48px`, backgroundColor: gray[200] }),
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

const grid1 = [
  f.sideGutter,
  {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '10px',

    '& > li:nth-of-type(1)': {
      gridColumn: '1 / 2',
      gridRow: '1 / 2',
      height: '100px',
    },
    '& > li:nth-of-type(2)': {
      gridColumn: '2 / 3',
      gridRow: '1 / 3',
    },
    '& > li:nth-of-type(3)': {
      gridColumn: '1 / 2',
      gridRow: '2 / 3',
      height: '100px',
    },
    '& > li:nth-of-type(4)': {
      gridColumn: '1 / 3',
      gridRow: '3 / 4',
      height: '84px',
    },
  },
];

const grid2 = [
  f.sideGutter,
  {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '10px',

    '& > li:nth-of-type(1)': {
      gridColumn: '1 / 2',
      gridRow: '1 / 2',
      height: '100px',
    },
    '& > li:nth-of-type(2)': {
      gridColumn: '2 / 3',
      gridRow: '1 / 2',
      height: '100px',
    },
    '& > li:nth-of-type(3)': {
      gridColumn: '1 / 3',
      gridRow: '2 / 3',
      height: '84px',
    },
  },
];

const err = [
  f.posAbs,
  ({
    layout: {
      size: {
        height: { header, navbar },
      },
    },
  }: Theme): CSSObject => ({
    bottom: navbar,
    left: '50%',
    transform: 'translateX(-50%)',
    minHeight: `calc(100vh - ${header} - ${navbar} - ${titleSectionHeight} - ${filterSectionHeight} - ${paddingTopHeight})`,
    boxSizing: 'border-box',
  }),
];

export { wrap, pageTitle, grid1, grid2, err };
