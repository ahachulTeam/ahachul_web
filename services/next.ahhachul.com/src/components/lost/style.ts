import { f } from '@/src/styles';
import { CSSObject, Theme } from '@emotion/react';

const tabHeight = '68.4px';
const filterSectionHeight = '46px';
const paddingTopHeight = '14px';

const wrap = [f.fullWidth, f.flexColumn, { padding: `${paddingTopHeight} 0 48px` }];

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
    height: `calc(100% - ${header} - ${navbar} - ${tabHeight} - ${filterSectionHeight} - ${paddingTopHeight})`,
    boxSizing: 'border-box',
  }),
];

export { wrap, err };
