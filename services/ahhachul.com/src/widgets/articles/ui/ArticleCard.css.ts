import type { CSSProperties } from 'react';
import type { Interpolation, Theme } from '@emotion/react';
import cssUtils from 'shared/utils.css';

export const card = {
  padding: '12px 0',
};

export const name = ({
  color: { text },
  typography: { fontSize, fontWeight },
}: Theme) =>
  ({
    color: text[50],
    fontSize: fontSize[14],
    fontWeight: fontWeight[600],
  }) as Interpolation<Theme>;

export const date = ({
  color: { blueDarkGray },
  typography: { fontSize },
}: Theme) =>
  ({
    color: blueDarkGray[300],
    fontSize: fontSize[12],
    marginLeft: '6px',
  }) as Interpolation<Theme>;

export const subwayLineId =
  (pointColor: CSSProperties['color']) =>
  ({ color: { text }, typography: { fontSize, fontWeight } }: Theme) =>
    ({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '4px',
      padding: '4px 8px',
      width: 'max-content',
      color: text[50],
      fontSize: fontSize[12],
      fontWeight: fontWeight[500],
      background: pointColor,
    }) as Interpolation<Theme>;

export const body = [
  cssUtils.truncate2,
  ({ color: { text }, typography: { fontSize, fontWeight } }: Theme) => ({
    color: text[50],
    fontSize: fontSize[16],
    fontWeight: fontWeight[600],
    lineHeight: '19px',
    letterSpacing: '-0.3px',
  }),
] as Interpolation<Theme>;

export const imageWrappingBox = [
  cssUtils.flexCenterCenter,
  cssUtils.posRel,
  {
    height: '50px',
    width: '50px',
    minWidth: '50px',
    marginLeft: '12px',

    '& > img': {
      position: 'absolute',
      top: 0,
      right: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      borderRadius: '6px',
    },
  },
] as Interpolation<Theme>;

export const image = {
  objectFit: 'cover',
  borderRadius: '6px',
} as Interpolation<Theme>;

export const countLabel = [
  cssUtils.flexAlignCenter,
  ({
    color: { blueDarkGray },
    typography: { fontSize, fontWeight },
  }: Theme) => ({
    marginRight: '8px',

    '& > span': {
      marginLeft: '2px',

      color: blueDarkGray[600],
      fontSize: fontSize[12],
      fontWeight: fontWeight[500],
      position: 'relative',
      top: '1px',
    },
  }),
] as Interpolation<Theme>;

export const info = [
  cssUtils.flexColumn,
  ({ color: { blueDarkGray }, typography: { fontSize } }: Theme) => ({
    '& > p': {
      marginTop: '8px',
      color: blueDarkGray[600],
      fontSize: fontSize[14],
      lineHeight: '19px',
      letterSpacing: '-0.3px',
      overflow: 'hidden',
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical',
      WebkitLineClamp: '2',
    },
  }),
] as Interpolation<Theme>;
