import { CSSProperties } from 'react';
import type { Interpolation, Theme } from '@emotion/react';
import cssUtils from 'shared/utils.css';

export const wrap = [
  cssUtils.fullWidth,
  cssUtils.flexColumn,
  { padding: '14px 0 120px 0' },
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
  }),
] as Interpolation<Theme>;

export const buttonGroup = [
  cssUtils.flexAlignCenter,
  cssUtils.overflowScroll,
  {
    paddingLeft: '20px',
    paddingRight: '20px',
    overflowY: 'hidden',
    overflowX: 'scroll',
  },
] as Interpolation<Theme>;

export const toggleBtn =
  (isActive: boolean) =>
  ({ typography: { fontSize, fontWeight } }: Theme) =>
    ({
      flexShrink: 0,
      border: '1px solid rgb(196, 212, 252, 0.37)',
      height: '32px',
      borderRadius: '124px',
      padding: '0 14px',
      fontSize: fontSize[14],
      width: 'max-content',
      marginRight: '8px',
      background: isActive ? 'rgb(196, 212, 252)' : 'inherit',
      color: isActive ? '#141517' : '#9da5b6',
      fontWeight: isActive ? fontWeight[600] : fontWeight[400],
    }) as Interpolation<Theme>;

export const trainLabelsWrap =
  (pointColor: CSSProperties['color']) =>
  ({ color: { gray }, typography: { fontSize, fontWeight } }: Theme) =>
    ({
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      paddingLeft: '20px',

      '& > span': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '6px',
        padding: '0 12px',
        height: '30px',
        color: gray[1000],
        fontSize: fontSize[12],
        fontWeight: fontWeight[500],
        background: pointColor,
      },
    }) as Interpolation<Theme>;

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

export const submitBtn = ({ typography: { fontSize, fontWeight } }: Theme) =>
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

export const imageBox = (disabled: boolean) =>
  [
    cssUtils.flexAlignCenter,
    cssUtils.fullWidth,
    {
      paddingLeft: '20px',

      '& > label': {
        width: '40px',
        height: '40px',
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
  ] as Interpolation<Theme>;

export const realImage = {
  position: 'relative',
  width: '39px',
  height: '39px',
  borderRadius: '8px',
  marginLeft: '8px',

  '& > img': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '8px',
  },

  '& > div': {
    position: 'absolute',
    top: '2px',
    right: '2px',

    width: '18px',
    height: '18px',
  },
} as Interpolation<Theme>;

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
