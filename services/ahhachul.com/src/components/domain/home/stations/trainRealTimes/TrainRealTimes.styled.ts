import { keyframes, type Interpolation, type Theme } from '@emotion/react';

import { subwayLineHexColors } from '@/constants';
import { mixins } from '@/styles';

export const trainRealTimes = [
  mixins.fullWidth,
  mixins.flexColumn,
  ({ colors: { white } }: Theme) => ({
    paddingBottom: '24px',
    backgroundColor: white,
    borderBottomLeftRadius: '20px',
    borderBottomRightRadius: '20px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08);',
  }),
] as Interpolation<Theme>;

export const inner = ({ colors: { white } }: Theme) =>
  ({
    position: 'relative',
    width: '100%',
    borderRadius: '20px',
    backgroundColor: white,
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
    display: 'flex',
    alignItems: 'center',
  }) as Interpolation<Theme>;

export const stationName = (subwayLineId: number, subText?: string) =>
  [
    mixins.posAbs,
    mixins.flexCenterCenter,
    ({ colors: { white, black } }: Theme) => ({
      height: '36px',
      padding: '8px 32px',

      borderRadius: '21px',
      transition: 'border-color 0.4s ease-in-out',
      border: `3px solid ${subwayLineHexColors(subwayLineId)}`,
      color: black,
      backgroundColor: white,

      top: '50%',
      left: '27px',
      transform: 'translateY(-50%)',

      fontSize: '16px',
      fontWeight: 600,

      '&::after': {
        position: 'absolute',
        top: '50%',
        right: '-64px',
        transform: 'translateY(-50%)',
        content: subText && `'${subText}'`,
        marginLeft: '4px',
        fontSize: '14px',
        color: 'white',
      },
    }),
  ] as Interpolation<Theme>;

export const trainDirection = [
  mixins.posAbs,
  ({ colors: { black } }: Theme) => ({
    color: black,
    fontSize: '14px',
    fontWeight: 600,
  }),
] as Interpolation<Theme>;

export const trainInfos = [
  mixins.posRel,
  mixins.flexColumn,
  {
    justifyContent: 'flex-end',
    padding: '49px 20px 0 20px',
  },
] as Interpolation<Theme>;

export const currentTrainArrivalInfo = {
  minHeight: '18.4px',
  marginBottom: '18px',
};

export const arrivalInfoLabel = [
  mixins.posRel,
  mixins.flexAlignCenter,
  ({ colors: { black, primary } }: Theme) => ({
    '& > b': {
      color: primary.primary,
      fontSize: '20px',
      fontWeight: 700,
      marginRight: '6px',
    },

    '& > span': {
      position: 'relative',
      top: '0.5px',
      color: black,
      fontSize: '16px',
    },
  }),
] as Interpolation<Theme>;

const rotate = keyframes`
  0% { transform: translateY(-50%) rotate(0deg); }
  100% { transform: translateY(-50%) rotate(360deg); }
`;

export const refetchBtnCss = (isClicked: boolean) =>
  ({
    position: 'absolute',
    top: '50%',
    right: 0,
    transform: 'translateY(-50%)',
    animation: isClicked && `${rotate} 0.8s forwards`,

    '& > svg': {
      position: 'relative',
      top: '1px',
      width: '18px',
      height: '18px',
    },
  }) as Interpolation<Theme>;

export const paintingTrain = [
  mixins.flexColumn,
  {
    '& > div': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      marginBottom: '12px',
      fontSize: '12px',
      color: '#000000',
    },
  },
] as Interpolation<Theme>;

export const withTrainNum = [
  mixins.flexAlignCenter,
  mixins.fullWidth,
  {
    justifyContent: 'space-between',
    marginBottom: '12px',

    '& > span': {
      fontSize: '12px',
      color: '#000000',
    },
  },
] as Interpolation<Theme>;

export const congestionHelper = [
  mixins.flexAlignCenter,
  ({ colors: { black } }: Theme) => ({
    '& > span': {
      fontSize: '12px',
      color: black,
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
  mixins.flexCenterCenter,
  mixins.fullWidth,
  ({ colors: { black, gray } }: Theme) => ({
    height: '44px',
    borderRadius: '10px',
    color: black,
    backgroundColor: gray[30],
    marginTop: '28px',
    fontWeight: 600,
  }),
] as Interpolation<Theme>;
