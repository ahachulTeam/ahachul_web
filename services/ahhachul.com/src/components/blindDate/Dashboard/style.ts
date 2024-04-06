import { CSSObject, Theme } from '@emotion/react';
import { f } from 'styles';

const wrapper = [f.posAbsFull, f.flexColumn, f.rootLineHeight];

const scrollable = [
  f.flex1,
  f.overflowScroll,
  ({
    layout: {
      size: {
        height: { header, navbar },
      },
    },
  }: Theme): CSSObject => ({
    paddingTop: header,
    paddingBottom: navbar,
  }),
];
const title = ({ typography: { fontSize, fontWeight } }: Theme): CSSObject => ({
  fontSize: fontSize[16],
  fontWeight: fontWeight[600],
});

export { wrapper, scrollable, title };
