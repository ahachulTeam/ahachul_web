import { Interpolation, Theme } from '@emotion/react';
import cssUtils from 'shared/utils.css';

export const wrap = [
  cssUtils.fullWidth,
  cssUtils.flexColumn,
  cssUtils.sideGutter,
  ({ color: { background } }: Theme) => ({
    gap: '36px',
    backgroundColor: background[50],
  }),
] as Interpolation<Theme>;

export const label = ({
  color: { text },
  typography: { fontSize, fontWeight },
}: Theme) =>
  ({
    color: text[50],
    fontSize: fontSize[16],
    fontWeight: fontWeight[600],
    marginBottom: '16px',
  }) as Interpolation<Theme>;

const commonGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '10px',

  '& > li:nth-of-type(1)': {
    gridColumn: '1 / 2',
    gridRow: '1 / 2',
    height: '100px',
  },
};

export const topGridSection = {
  ...commonGrid,

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
} as Interpolation<Theme>;

export const bottomGridSection = {
  ...commonGrid,

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
} as Interpolation<Theme>;
