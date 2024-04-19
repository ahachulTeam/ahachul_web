import { CSSObject, Theme } from '@emotion/react';
import { f } from '@/src/styles';

const wrapper = [f.posAbsFull, f.flexColumn, f.rootLineHeight];

const left = ({ typography: { fontSize, fontWeight } }: Theme): CSSObject => ({
  fontSize: fontSize[16],
  fontWeight: fontWeight[600],
  paddingLeft: '16px',
});

const right = (hasSearch: boolean): CSSObject => ({
  display: 'grid',
  gridTemplateColumns: hasSearch ? '24px 24px 24px' : '24px 24px',
  alignItems: 'center',
  gap: '16px',
  paddingRight: '16px',

  '& img': {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
  },
});

const scrollable = (hasNavbar: boolean) => [
  f.flex1,
  f.overflowScroll,
  ({
    layout: {
      size: {
        height: { navbar },
      },
    },
  }: Theme): CSSObject => ({
    paddingBottom: hasNavbar ? navbar : 0,
  }),
];

export { wrapper, left, right, scrollable };
