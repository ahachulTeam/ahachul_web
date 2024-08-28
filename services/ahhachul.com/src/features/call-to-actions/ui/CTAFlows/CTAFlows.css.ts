import { Interpolation, Theme } from '@emotion/react';
import cssUtils from 'shared/utils.css';

export const wrap = [
  cssUtils.fullWidth,
  cssUtils.flexColumn,
  ({ color: { background } }: Theme) => ({
    backgroundColor: background[50],
  }),
] as Interpolation<Theme>;

export const btn_wrap = [
  cssUtils.fullWidth,
  cssUtils.flexAlignCenter,
  cssUtils.overflowXScroll,
  cssUtils.sideGutter,
] as Interpolation<Theme>;

export const btn = ({
  color: { whiteAlpha },
  typography: { fontWeight, lineHeight },
}: Theme) =>
  ({
    flexShrink: 0,
    height: '36px',
    backgroundColor: whiteAlpha[50],
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    marginRight: '8px',
    padding: '0 12px',

    '& > span': {
      color: '#ffffff',
      fontSize: '13px',
      fontWeight: fontWeight[500],
      lineHeight: lineHeight[133],
      letterSpacing: '-0.4px',
      marginLeft: '6px',
    },

    '& > div': {
      width: '14px',
      height: '14px',

      '& > svg > path': {
        stroke: '#ffffff',
      },
    },
  }) as Interpolation<Theme>;
