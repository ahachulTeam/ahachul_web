import { Interpolation, Theme } from '@emotion/react';
import cssUtils from 'shared/utils.css';

export const thumbnailContainer = [
  cssUtils.posRel,
  cssUtils.maxWidth,
  {
    width: '100vw',
    aspectRatio: '1 / 0.925667',
  },
] as Interpolation<Theme>;

export const thumbnail = [
  cssUtils.posAbsFull,
  {
    objectFit: 'cover',
  },
] as Interpolation<Theme>;

export const articleTitle = [
  cssUtils.sideGutter,
  ({ color: { text }, typography: { fontSize, fontWeight } }: Theme) => ({
    marginTop: '14px',
    marginBottom: '14px',

    fontSize: fontSize[20],
    fontWeight: fontWeight[700],
    color: text[50],
  }),
] as Interpolation<Theme>;

export const articleBasicInfos = [
  cssUtils.sideGutter,
  cssUtils.flexColumn,
  cssUtils.posRel,
  ({
    color: { text, blueDarkGray },
    typography: { fontSize, fontWeight },
  }: Theme) => ({
    marginTop: '20px',

    '& > h2': {
      marginBottom: '8px',

      fontSize: fontSize[16],
      fontWeight: fontWeight[700],
      color: text[50],
    },

    '& > time': {
      color: blueDarkGray[300],
      fontSize: fontSize[12],
      fontWeight: fontWeight[500],
    },

    '& > span': {
      position: 'absolute',
      top: '50%',
      right: '20px',
      transform: 'translateY(-50%)',

      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',

      fontSize: fontSize[12],
      fontWeight: fontWeight[500],
      color: blueDarkGray[600],

      padding: '8px 12px',
      borderRadius: '24px',
      border: '1px solid hsla(0, 0%, 100%, .09)',
    },
  }),
] as Interpolation<Theme>;

export const countLabelInfos = [
  cssUtils.flexAlignCenter,
  {
    justifyContent: 'space-between',
    padding: '10px 20px',
  },
] as Interpolation<Theme>;

export const likeCount = [
  cssUtils.flexAlignCenter,
  ({ color: { text }, typography: { fontSize } }: Theme) => ({
    '& > span': {
      marginLeft: '6px',

      color: text[50],
      fontSize: fontSize[12],
    },
  }),
] as Interpolation<Theme>;
