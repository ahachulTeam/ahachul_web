import { CSSObject, Theme } from '@emotion/react';
import { f } from 'shared/style';

const paddingTopHeight = '26px';

const wrap = [
  f.fullWidth,
  f.flexColumn,
  {
    gap: '36px',
    padding: `${paddingTopHeight} 0 48px`,
    backgroundColor: 'inherit',
  },
];

const pageTitle = ({ color: { text }, typography: { fontSize, fontWeight } }: Theme) => ({
  marginBottom: '16px',
  fontSize: fontSize[16],
  fontWeight: fontWeight[600],
  color: text[50],
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
    dimensions: {
      size: {
        height: { header, navbar },
      },
    },
  }: Theme): CSSObject => ({
    bottom: navbar,
    left: '50%',
    transform: 'translateX(-50%)',
    height: `calc(100% - ${header} - ${navbar} - ${paddingTopHeight})`,
    boxSizing: 'border-box',
  }),
];

export { wrap, pageTitle, grid1, grid2, err };
