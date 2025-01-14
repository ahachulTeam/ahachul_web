import { type Interpolation, type Theme } from '@emotion/react';
import { rotate } from 'shared/lib/config/animation/keyframes';
import cssUtils from 'shared/utils.css';
import { subwayLineHexColors } from 'widgets/train-infos/lib/subway-line-hex-colors';

export const trainRealTimes = [
  cssUtils.fullWidth,
  cssUtils.flexColumn,
  ({ color: { background } }: Theme) => ({
    paddingBottom: '24px',
    backgroundColor: background[50],
  }),
] as Interpolation<Theme>;

export const inner = ({ color: { gray } }: Theme) =>
  ({
    position: 'relative',
    width: '100%',
    borderRadius: '20px',
    backgroundColor: gray[50],
  }) as Interpolation<Theme>;

export const thickBorder = (subwayLineId: number) =>
  ({
    position: 'absolute',
    left: '0',
    top: '0',
    width: '100%',
    height: '25px',
    borderTopLeftRadius: '20px',
    borderTopRightRadius: '20px',
    transition: 'background-color 0.4s ease-in-out',
    backgroundColor: subwayLineHexColors(subwayLineId),
  }) as Interpolation<Theme>;

export const stationName = (subwayLineId: number) =>
  [
    cssUtils.posAbs,
    cssUtils.flexCenterCenter,
    ({ color: { text }, typography: { fontSize, fontWeight } }: Theme) => ({
      height: '36px',
      padding: '8px 32px',

      borderRadius: '21px',
      transition: 'border-color 0.4s ease-in-out',
      border: `3px solid ${subwayLineHexColors(subwayLineId)}`,
      backgroundColor: text[50],

      top: '50%',
      left: '27px',
      transform: 'translateY(-50%)',

      fontSize: fontSize[16],
      fontWeight: fontWeight[600],
    }),
  ] as Interpolation<Theme>;

export const trainDirection = [
  cssUtils.posAbs,
  ({ color: { text }, typography: { fontSize, fontWeight } }: Theme) => ({
    top: '50%',
    left: '157px',
    transform: 'translateY(-50%)',

    color: text[50],
    fontSize: fontSize[14],
    fontWeight: fontWeight[600],
  }),
] as Interpolation<Theme>;

export const trainInfos = [
  cssUtils.posRel,
  cssUtils.flexColumn,
  {
    justifyContent: 'flex-end',
    padding: '54px 20px 24px 20px',
  },
] as Interpolation<Theme>;

export const currentTrainArrivalInfo = {
  minHeight: '18.4px',
  marginBottom: '18px',
};

export const arrivalInfoLabel = [
  cssUtils.posRel,
  cssUtils.flexAlignCenter,
  ({ color: { text, skyBlue }, typography: { fontSize, fontWeight } }: Theme) => ({
    '& > b': {
      color: skyBlue[500],
      fontSize: fontSize[16],
      fontWeight: fontWeight[700],
      marginRight: '6px',
    },

    '& > span': {
      color: text[50],
      fontSize: fontSize[14],
    },
  }),
] as Interpolation<Theme>;

export const refetchBtnCss = (isClicked: boolean) =>
  ({
    position: 'absolute',
    top: '50%',
    right: 0,
    transform: 'translateY(-50%)',
    animation: isClicked && `${rotate} 0.8s forwards`,

    '& > div': {
      position: 'relative',
      top: '1px',

      '& > svg': {
        width: '18px',
        height: '18px',
      },
    },
  }) as Interpolation<Theme>;

export const paintingTrain = [
  cssUtils.flexColumn,
  ({ typography: { fontSize } }: Theme) => ({
    '& > div': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      marginBottom: '12px',
      fontSize: fontSize[12],
      color: '#b4b4b4',
    },
  }),
] as Interpolation<Theme>;

export const withTrainNum = [
  cssUtils.flexAlignCenter,
  cssUtils.fullWidth,
  ({ typography: { fontSize } }: Theme) => ({
    justifyContent: 'space-between',
    marginBottom: '12px',

    '& > span': {
      fontSize: fontSize[12],
      color: '#b4b4b4',
    },
  }),
] as Interpolation<Theme>;

export const congestionHelper = [
  cssUtils.flexAlignCenter,
  ({ color: { text }, typography: { fontSize } }: Theme) => ({
    '& > span': {
      fontSize: fontSize[12],
      color: text[50],
    },

    '& > ul': {
      display: 'grid',
      minWidth: '40px',
      gridTemplateColumns: 'repeat(auto-fit, minmax(10px, 1fr))',
      gap: '2px',
      margin: '0 4px',

      '& > li': {
        width: '10px',
        height: '10px',
        borderRadius: '50%',

        '&:first-of-type': {
          backgroundColor: '#a2d471',
        },

        '&:nth-of-type(2)': {
          backgroundColor: '#ffc44d',
        },

        '&:nth-of-type(3)': {
          backgroundColor: '#ff884d',
        },

        '&:last-of-type': {
          backgroundColor: '#ee4d4d',
        },
      },
    },

    '& > div': {
      top: '1px',
      position: 'relative',
      marginLeft: '4px',
    },
  }),
] as Interpolation<Theme>;

export const button = [
  cssUtils.flexCenterCenter,
  cssUtils.fullWidth,
  ({ color: { text, gray }, typography: { fontSize, fontWeight } }: Theme) => ({
    height: '44px',
    borderRadius: '10px',
    color: text[50],
    backgroundColor: gray[300],
    marginTop: '28px',
    fontSize: fontSize[16],
    fontWeight: fontWeight[600],
  }),
] as Interpolation<Theme>;

export const skeleton = {
  marginTop: '5px',
} as Interpolation<Theme>;
