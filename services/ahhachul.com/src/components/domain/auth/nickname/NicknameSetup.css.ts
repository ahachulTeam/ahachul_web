import { Interpolation, Theme } from '@emotion/react';

import { mixins } from '@/styles';

export const form = [mixins.fullWidth, mixins.flexColumn] as Interpolation<Theme>;

export const inputGroup = [
  mixins.flexColumn,
  () => ({
    position: 'relative',
    marginBottom: '32px',

    '& > span': {
      color: 'black',
      fontSize: '14px',
      fontWeight: '600',
      marginBottom: '14px',
    },

    '& > input': {
      border: '1px solid rgb(196, 212, 252, 0.37)',
      height: '44px',
      borderRadius: '6px',
      padding: '0 12px',
      color: 'black',
      fontSize: '14px',
      caretColor: 'rgba(0, 255, 163, 0.5)',

      '&::placeholder': {
        fontSize: '14px',
        color: 'black',
      },

      '&[aria-invalid="true"]': {
        borderColor: 'red',
      },
    },

    '& > p': {
      display: 'inline-flex',
      alignItems: 'center',
      color: 'red',
      fontSize: '14px',
      marginTop: '12px',
      gap: '6px',

      '& > div > svg > path': {
        fill: 'red',
        stroke: 'black',

        '&:first-of-type': {
          stroke: 'red',
        },
      },
    },
  }),
] as Interpolation<Theme>;

export const btnWrap = [
  mixins.fullWidth,
  () => ({
    position: 'fixed',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'white',
    padding: '16px 20px 24px',

    '& > button': {
      padding: '0 14px',
      fontSize: '14px',
      width: '100%',
      height: '48px',
      background: 'blue',
      color: 'white',
      fontWeight: '600',
      borderRadius: '8px',

      '&:disabled': {
        color: 'black',
        opacity: 0.75,
      },
    },
  }),
] as Interpolation<Theme>;
