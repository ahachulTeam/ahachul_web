import { Interpolation, Theme } from '@emotion/react';
import cssUtils from 'shared/utils.css';

export const form = [cssUtils.fullWidth, cssUtils.flexColumn] as Interpolation<Theme>;

export const inputGroup = [
  cssUtils.flexColumn,
  ({ color: { text, error, blueDarkGray }, typography: { fontSize, fontWeight } }: Theme) => ({
    position: 'relative',
    marginBottom: '32px',

    '& > span': {
      color: text[50],
      fontSize: fontSize[14],
      fontWeight: fontWeight[600],
      marginBottom: '14px',
    },

    '& > input': {
      border: '1px solid rgb(196, 212, 252, 0.37)',
      height: '44px',
      borderRadius: '6px',
      padding: '0 12px',
      color: text[50],
      fontSize: fontSize[14],
      caretColor: 'rgba(0, 255, 163, 0.5)',

      '&::placeholder': {
        fontSize: fontSize[14],
        color: blueDarkGray[300],
      },

      '&[aria-invalid="true"]': {
        borderColor: error[50],
      },
    },

    '& > p': {
      display: 'inline-flex',
      alignItems: 'center',
      color: error[50],
      fontSize: fontSize[14],
      fontWeight: fontWeight[400],
      marginTop: '12px',
      gap: '6px',

      '& > div > svg > path': {
        fill: error[50],
        stroke: text[50],

        '&:first-of-type': {
          stroke: error[50],
        },
      },
    },
  }),
] as Interpolation<Theme>;

export const btnWrap = [
  cssUtils.fullWidth,
  ({ color: { primary, text, background }, typography: { fontSize, fontWeight } }: Theme) => ({
    position: 'fixed',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    background: background[50],
    padding: '16px 20px 24px',

    '& > button': {
      padding: '0 14px',
      fontSize: fontSize[14],
      width: '100%',
      height: '48px',
      background: primary.secondary,
      color: background[50],
      fontWeight: fontWeight[600],
      borderRadius: '8px',

      '&:disabled': {
        color: text[50],
        opacity: 0.75,
      },
    },
  }),
] as Interpolation<Theme>;
