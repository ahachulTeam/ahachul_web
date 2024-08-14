import { CSSObject, Theme } from '@emotion/react';

const wrap = ({
  dimensions: {
    size: {
      height: { header },
    },
    zIndexes: { dimmed },
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
    color: { text, background },
    dimensions: {
      size: {
        height: { header },
      },
    },
  }: Theme): CSSObject => ({
    background: isWhite ? text[50] : background[50],
    opacity,
    height: `calc(100vh - ${header})`,
  });

const background = ({
  dimensions: {
    zIndexes: { dialog },
    size: {
      height: { header },
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

const dialogTitleCss = ({ color: { gray }, typography: { fontSize, fontWeight } }: Theme): CSSObject => ({
  fontSize: fontSize[20],
  fontWeight: fontWeight[700],
  color: gray[50],
});

const dialogContentCss = ({ color: { gray }, typography: { fontSize } }: Theme): CSSObject => ({
  fontSize: fontSize[14],
  color: gray[50],
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

const dialogButtonTextCss = ({ color: { gray } }: Theme) => ({
  color: gray[50],
});

const loader = ({
  dimensions: {
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
