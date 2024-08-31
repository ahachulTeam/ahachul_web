import { css, CSSObject, Theme } from '@emotion/react';

const nonDraggableCss = {
  '& [data-rsbs-header]': {
    display: 'none',
  },
};

const zIndexCss = ({ dimensions: { zIndexes } }: Theme) => ({
  '& [data-rsbs-backdrop]': {
    zIndex: zIndexes.bottomSheetDimmed,
  },
  '& [data-rsbs-overlay]': {
    zIndex: zIndexes.bottomSheet,
  },
});

const contentCss = (isFullHeight: boolean) => ({
  height: isFullHeight ? 'calc(100vh)' : 'auto',
});

const bottomSheetCss = ({ color: { background } }: Theme): CSSObject => ({
  '--rsbs-backdrop-bg': 'rgba(0, 0, 0, 0.60)',
  '--rsbs-max-w': '475px',
  '--rsbs-ml': 'auto',
  '--rsbs-mr': 'auto',
  '--rsbs-bg': background[50],
  '--rsbs-overlay-rounded': '28px',
  '--rsbs-handle-bg': '#3C3D47',

  '& [data-rsbs-header="true"]': {
    boxShadow: 'none',
  },
});

const safeAreaCss = css({
  height: '16px',
  width: '100%',
});
const indicatorAreaCss = css({
  height: '34px',
  width: '100%',
});

export { nonDraggableCss, zIndexCss, contentCss, bottomSheetCss, safeAreaCss, indicatorAreaCss };
