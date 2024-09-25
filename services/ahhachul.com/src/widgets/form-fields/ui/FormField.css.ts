import type { Interpolation, Theme } from '@emotion/react';
import cssUtils from 'shared/utils.css';

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

export const errMsgWrap = ({
  color: { error },
  typography: { fontSize, fontWeight },
}: Theme) => ({
  display: 'inline-flex',
  alignItems: 'center',
  color: error[50],
  fontSize: fontSize[14],
  fontWeight: fontWeight[400],
  gap: '6px',

  '& > div > svg > path': {
    fill: '#E02020',
    stroke: '#ffffff',

    '&:first-of-type': {
      stroke: '#E02020',
    },
  },
});

export const submitGroup = {
  position: 'fixed',
  top: 0,
  right: '20px',
  background: '#141517',
  zIndex: 15,
} as Interpolation<Theme>;

export const submit = ({ typography: { fontSize, fontWeight } }: Theme) =>
  ({
    color: '#ffffff',
    fontSize: fontSize[16],
    fontWeight: fontWeight[500],
    width: 'max-content',
    height: '58px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }) as Interpolation<Theme>;
