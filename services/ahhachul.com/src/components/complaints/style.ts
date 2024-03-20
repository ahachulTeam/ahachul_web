import { Theme } from '@emotion/react';
import { f } from 'styles';

const wrap = [
  f.fullWidth,
  f.fullHeight,
  f.flexColumn,
  ({
    color: {
      static: {
        dark: { gray },
      },
    },
  }: Theme) => ({ gap: '36px', padding: '26px 20px 48px 20px', backgroundColor: gray[200] }),
];

const sectionLabel = {
  marginBottom: '16px',
  fontWeight: 600,
  color: '#FFFFFF !important',
};

const grid = {
  gap: '8px',
};

export { wrap, sectionLabel, grid };
