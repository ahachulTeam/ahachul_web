import type { Interpolation, Theme } from '@emotion/react';
import cssUtils from 'shared/utils.css';

export const wrap = [
  cssUtils.fullWidth,
  cssUtils.flexColumn,
  cssUtils.pagePaddingTop,
  { paddingBottom: '120px' },
] as Interpolation<Theme>;

export const section = [
  cssUtils.flexColumn,
  ({ typography: { fontSize, fontWeight } }: Theme) => ({
    position: 'relative',
    marginBottom: '32px',

    '& > span, & > p': {
      color: '#ffffff',
      fontSize: fontSize[14],
      fontWeight: fontWeight[600],
      marginBottom: '14px',
      paddingLeft: '20px',
    },

    '& > div.editor-container': {
      width: 'calc(100% - 40px)',
      margin: '0 auto',
    },

    '& > input': {
      width: 'calc(100% - 40px)',
      margin: '0 auto',
      border: '1px solid rgb(196, 212, 252, 0.37)',
      height: '44px',
      borderRadius: '6px',
      padding: '0 12px',
      color: '#ffffff',
      fontSize: fontSize[14],
      caretColor: 'rgba(0, 255, 163, 0.5)',

      '&::placeholder': {
        fontSize: fontSize[14],
        color: '#9da5b6',
      },

      '&[aria-invalid="true"]': {
        borderColor: '#E02020',
      },
    },
  }),
] as Interpolation<Theme>;

export const submitGroup = [
  cssUtils.fullWidth,
  {
    position: 'fixed',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    background: '#141517',
    padding: '16px 20px 0',
  },
] as Interpolation<Theme>;

export const submit = ({ typography: { fontSize, fontWeight } }: Theme) =>
  ({
    padding: '0 14px',
    fontSize: fontSize[14],
    width: '100%',
    height: '48px',
    background: 'rgb(196, 212, 252)',
    color: '#141517',
    fontWeight: fontWeight[600],
    borderRadius: '8px',
  }) as Interpolation<Theme>;

export const indicatorArea = {
  height: '34px',
  width: '100%',
} as Interpolation<Theme>;

export const requireMark = ({
  color: { error },
  typography: { fontSize },
}: Theme) => ({
  marginLeft: '2px',
  color: error[50],
  fontSize: fontSize[16],
});

export const errMsgLayout = {
  paddingLeft: '20px',
  marginTop: '12px',
};
