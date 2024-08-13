import { CSSObject, Theme } from '@emotion/react';
import { f } from 'styles';

const wrapper = [
  f.posAbsFull,
  f.flexColumn,
  f.rootLineHeight,
  {
    width: '100%',
    maxWidth: '390px',
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
  },
];

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
    dimensions: {
      size: {
        height: { header, navbar },
      },
    },
  }: Theme): CSSObject => ({
    paddingTop: header,
    paddingBottom: hasNavbar ? navbar : 0,
  }),
];

export { wrapper, left, right, scrollable };
