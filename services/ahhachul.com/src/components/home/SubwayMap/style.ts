import { CSSObject, Theme } from '@emotion/react';
import { f } from 'shared/style';

const wrap = [f.fullWidth, f.flexColumn, { padding: '14px 20px 48px 20px' }];

const title = ({ typography: { fontSize, fontWeight } }: Theme): CSSObject => ({
  color: '#e6e6e6',
  fontSize: fontSize[16],
  fontWeight: fontWeight[600],
});

export { wrap, title };
