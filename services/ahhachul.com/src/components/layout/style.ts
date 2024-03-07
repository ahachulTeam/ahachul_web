import { CSSObject, Theme } from '@emotion/react';
import { f } from 'styles';

const wrapper = [f.posAbsFull, f.flexColumn, f.rootLineHeight];

const left = ({
  typography: {
    size: { paragraph1 },
    weight: { semibold },
  },
}: Theme): CSSObject => ({
  fontSize: paragraph1,
  fontWeight: semibold,
  paddingLeft: '16px',
});

const right: CSSObject = {
  display: 'grid',
  gridTemplateColumns: '24px 24px',
  alignItems: 'center',
  gap: '16px',
  paddingRight: '16px',

  '& img': {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
  },
};

const scrollable = (hasNavbar: boolean) => [
  f.flex1,
  f.overflowScroll,
  ({
    size: {
      height: { header, navbar },
    },
  }: Theme): CSSObject => ({
    paddingTop: header,
    paddingBottom: hasNavbar ? navbar : 0,
  }),
];

export { wrapper, left, right, scrollable };
