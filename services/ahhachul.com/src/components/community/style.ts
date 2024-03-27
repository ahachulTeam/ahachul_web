import { f } from 'styles';
import { CSSObject, Theme } from '@emotion/react';

const tabHeight = '68.4px';
const paddingTopHeight = '26px';

const wrap = [f.fullWidth, f.flexColumn, { padding: `${paddingTopHeight} 20px 48px 20px` }];

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
    height: `calc(100% - ${header} - ${navbar} - ${tabHeight} - ${paddingTopHeight})`,
    boxSizing: 'border-box',
  }),
];

export { wrap, err };
