import { Theme } from '@emotion/react';
import { f } from 'styles';

const wrap = [
  f.fullWidth,
  f.flexColumn,
  ({
    color: {
      static: {
        dark: { gray },
      },
    },
  }: Theme) => ({ gap: '36px', padding: '32px 20px 48px 20px', backgroundColor: gray[200] }),
];

const sectionLabel = ({
  color: {
    scale: { gray },
  },
  typography: { fontSize, fontWeight },
}: Theme) => ({
  marginBottom: '16px',
  fontSize: fontSize[16],
  fontWeight: fontWeight[600],
  color: gray[1000],
});

const grid = {
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
};

const grid2 = {
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
};

export { wrap, sectionLabel, grid, grid2 };
