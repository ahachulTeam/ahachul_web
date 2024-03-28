import { CSSObject, Theme } from '@emotion/react';
import { f } from 'styles';

const wrap = [f.fullWidth, f.flexColumn, { padding: '26px 20px 48px 20px' }];

const title = ({ typography: { fontSize, fontWeight } }: Theme): CSSObject => ({
  fontSize: fontSize[16],
  fontWeight: fontWeight[600],
});

export { wrap, title };
