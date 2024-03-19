import { CSSObject, Theme } from '@emotion/react';
import { f } from 'styles';

const top = [
  f.fullWidth,
  f.flexAlignCenter,
  f.posRel,
  ({
    color: {
      scale: { gray },
    },
    typography: { fontSize, fontWeight },
  }: Theme): CSSObject => ({
    height: '55px',
    backgroundColor: '#3477FE',
    justifyContent: 'space-between',
    padding: '0 24px',

    '& > span': {
      color: gray[1000],
      fontSize: fontSize['18'],
      fontWeight: fontWeight[700],
      lineHeight: '22.54px',
      letterSpacing: '-1%',
    },

    '& > div:last-of-type': {
      position: 'absolute',
      backgroundColor: '#3477FE',
      height: '120px',
      top: '55px',
      left: 0,
      width: '100%',
    },
  }),
];

const card = [
  f.flexColumn,
  ({
    color: {
      scale: { gray },
    },
  }: Theme): CSSObject => ({
    width: 'calc(100% - 48px)',
    height: '338px',
    position: 'absolute',
    top: 'calc(55px + 4px)',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '30px 26px',
    backgroundColor: gray[1000],
    borderRadius: '10px',
    boxShadow: '0px 5px 13px 0px #292A2D0F',
  }),
];

export { top, card };
