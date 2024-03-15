import { CSSObject, Theme } from '@emotion/react';

const wrap = ({
  size: {
    height: { header, navbar },
  },
}: Theme): CSSObject => ({
  position: 'fixed',
  top: header,
  left: 0,
  right: 0,
  bottom: navbar,
  zIndex: 1000,
});

const backgroundCover =
  (opacity: number, isWhite: boolean) =>
  ({
    color: {
      primary: { white, black_all },
    },
    size: {
      height: { header, navbar },
    },
  }: Theme): CSSObject => ({
    background: isWhite ? white : black_all,
    opacity,
    height: `calc(100vh - ${header} - ${navbar})`,
  });

const background = ({
  size: {
    height: { header, navbar },
  },
}: Theme): CSSObject => ({
  position: 'fixed',
  left: 0,
  top: header,
  right: 0,
  bottom: navbar,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignContent: 'center',
  height: `calc(100vh - ${header} - ${navbar})`,
});

const dialogTitleCss = ({
  color: {
    primary: { black },
  },
  typography: {
    size: { heading4 },
    weight: { bold },
  },
}: Theme): CSSObject => ({
  fontSize: heading4,
  fontWeight: bold,
  color: black,
});

const dialogContentCss = ({
  color: {
    primary: { black },
  },
  typography: {
    size: { paragraph2 },
  },
}: Theme): CSSObject => ({
  fontSize: paragraph2,
  color: black,
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
    primary: { black },
  },
}: Theme) => ({
  color: black,
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
};
