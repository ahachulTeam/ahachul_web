import { f } from 'styles';
import { CSSObject, Theme } from '@emotion/react';

const tabHeight = '68.4px';
const paddingTopHeight = '14px';

const wrap = [f.fullWidth, f.flexColumn, { padding: `${paddingTopHeight} 0 48px` }];

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
