import { CSSObject, Theme } from '@emotion/react';

const wrap = ({
  layout: {
    size: {
      height: { header },
    },
    dimensions: {
      zIndexes: { dimmed },
    },
  },
}: Theme): CSSObject => ({
  position: 'fixed',
  top: header,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: dimmed,
});

const backgroundCover =
  (opacity: number, isWhite: boolean) =>
  ({
    color: {
      static: {
        dark: { gray },
      },
    },
    layout: {
      size: {
        height: { header },
      },
    },
  }: Theme): CSSObject => ({
    background: isWhite ? gray[1000] : gray[200],
    opacity,
    height: `calc(100vh - ${header})`,
  });

const background = ({
  layout: {
    size: {
      height: { header },
    },
    dimensions: {
      zIndexes: { dialog },
    },
  },
}: Theme): CSSObject => ({
  position: 'fixed',
  left: 0,
  top: header,
  right: 0,
  bottom: 0,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignContent: 'center',
  height: `calc(100vh - ${header})`,
  zIndex: dialog,
});

const dialogTitleCss = ({
  color: {
    scale: { gray },
  },
  typography: { fontSize, fontWeight },
}: Theme): CSSObject => ({
  fontSize: fontSize[20],
  fontWeight: fontWeight[700],
  color: gray[0],
});

const dialogContentCss = ({
  color: {
    scale: { gray },
  },
  typography: { fontSize },
}: Theme): CSSObject => ({
  fontSize: fontSize[14],
  color: gray[0],
});

const dialogWrapperCss: CSSObject = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
};

const textWrapperCss: CSSObject = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
};

const buttonWrapperCss: CSSObject = {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '4px',
};

const dialogButtonTextCss = ({
  color: {
    scale: { gray },
  },
}: Theme) => ({
  color: gray[0],
});

const loader = ({
  layout: {
    size: {
      height: { header },
    },
  },
}: Theme): CSSObject => ({
  width: '130px',
  position: 'relative',
  top: `-${header}`,
});

export {
  wrap,
  background,
  backgroundCover,
  dialogTitleCss,
  dialogContentCss,
  dialogWrapperCss,
  textWrapperCss,
  buttonWrapperCss,
  dialogButtonTextCss,
  loader,
};
