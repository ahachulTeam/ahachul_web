import type { Theme, CSSObject, Interpolation } from '@emotion/react';
import cssUtils from 'shared/utils.css';

export const wrapper = [
  cssUtils.top0,
  cssUtils.posAbsFull,
  cssUtils.rootLineHeight,
  cssUtils.flexColumn,
  cssUtils.fullWidth,
  cssUtils.maxWidth,
] as Interpolation<Theme>;

export const scrollable = (navigationSlot: boolean) =>
  [
    cssUtils.flex1,
    cssUtils.overflowScroll,
    ({
      dimensions: {
        size: {
          height: { header, navbar },
        },
      },
    }: Theme): CSSObject => ({
      paddingTop: header,
      paddingBottom: navigationSlot ? navbar : 0,
    }),
  ] as Interpolation<Theme>;

export const composeLayout = {
  width: '100%',
  height: '100vh',
} as Interpolation<Theme>;
