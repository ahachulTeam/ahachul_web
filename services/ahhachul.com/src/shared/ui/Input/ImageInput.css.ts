import { Interpolation, Theme } from '@emotion/react';
import cssUtils from 'shared/utils.css';

export const wrap = (disabled: boolean) => [
  cssUtils.flexAlignCenter,
  cssUtils.fullWidth,
  {
    paddingLeft: '20px',

    '& > label': {
      width: '55px',
      height: '55px',
      border: '1px solid rgb(196, 212, 252, 0.37)',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: disabled ? 0.4 : 1,

      '& > div': {
        width: '18px',
        height: '18px',

        '&>svg>path': {
          stroke: '#9da5b6',
        },
      },
    },
  },
];

export const image = {
  position: 'relative',
  width: '53px',
  height: '53px',
  borderRadius: '8px',
  marginLeft: '8px',
  border: '1px solid #141517',

  '& > img': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '8px',
  },

  '& > button > div': {
    position: 'absolute',
    top: '2px',
    right: '2px',

    width: '18px',
    height: '18px',
  },
} as Interpolation<Theme>;
