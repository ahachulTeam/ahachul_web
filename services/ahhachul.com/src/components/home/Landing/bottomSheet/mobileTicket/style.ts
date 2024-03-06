import { CSSObject, Theme } from '@emotion/react';
import { f } from 'styles';

const top = [
  f.fullWidth,
  f.flexAlignCenter,
  f.posRel,
  ({
    color: {
      primary: { white },
      sub: { blue_3477fe },
    },
    typography: {
      size: { heading5 },
      weight: { bold },
    },
  }: Theme): CSSObject => ({
    height: '55px',
    backgroundColor: blue_3477fe,
    justifyContent: 'space-between',
    padding: '0 24px',

    '& > span': {
      color: white,
      fontSize: heading5,
      fontWeight: bold,
      lineHeight: '22.54px',
      letterSpacing: '-1%',
    },

    '& > div:last-of-type': {
      position: 'absolute',
      backgroundColor: blue_3477fe,
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
      primary: { white },
    },
  }: Theme): CSSObject => ({
    width: 'calc(100% - 48px)',
    height: '338px',
    position: 'absolute',
    top: 'calc(55px + 4px)',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '30px 26px',
    backgroundColor: white,
    borderRadius: '10px',
    boxShadow: '0px 5px 13px 0px #292A2D0F',
  }),
];

export { top, card };
