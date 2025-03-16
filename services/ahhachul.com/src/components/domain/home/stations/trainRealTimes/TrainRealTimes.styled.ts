import { keyframes, type Interpolation, type Theme } from '@emotion/react';

import { subwayLineHexColors } from '@/constants';
import { mixins } from '@/styles';

export const inner = {
  position: 'relative',
  width: '100%',
  borderRadius: '20px',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
} as Interpolation<Theme>;

export const thickBorder = (subwayLineId: number) =>
  ({
    position: 'absolute',
    left: '0',
    top: '0',
    width: '100%',
    height: '30px',
    borderTopLeftRadius: '20px',
    borderTopRightRadius: '20px',
    transition: 'background-color 0.4s ease-in-out',
    backgroundColor: subwayLineHexColors(subwayLineId),
    display: 'flex',
    alignItems: 'center',
    gap: '4px',

    '& > span': {
      color: 'white',
      fontSize: '14px',
      fontWeight: 600,
    },
  }) as Interpolation<Theme>;

export const stationName = (subwayLineId: number) =>
  [
    mixins.flexCenterCenter,
    ({ colors: { white, black } }: Theme) => ({
      height: '36px',
      padding: '6px 12px',

      borderRadius: '35px',
      transition: 'border-color 0.4s ease-in-out',
      border: `4px solid ${subwayLineHexColors(subwayLineId)}`,
      color: black,
      backgroundColor: white,

      marginLeft: '24px',

      fontSize: '16px',
      fontWeight: 600,
    }),
  ] as Interpolation<Theme>;

export const trainInfos = [
  mixins.posRel,
  mixins.flexColumn,
  {
    justifyContent: 'flex-end',
    padding: '51px 0 0 0',
  },
] as Interpolation<Theme>;

export const currentTrainArrivalInfo = {
  minHeight: '18.4px',
  marginBottom: '16px',
  padding: '0 20px',
};

export const arrivalInfoLabel = [
  mixins.posRel,
  mixins.flexAlignCenter,
  ({ colors: { white, primary } }: Theme) => ({
    '& > b': {
      color: primary.primary,
      fontSize: '20px',
      fontWeight: 700,
      marginRight: '6px',
    },

    '& > span': {
      position: 'relative',
      top: '0.5px',
      color: white,
      fontSize: '16px',
      lineHeight: 1.5,
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

export const buttonWrap = [
  mixins.flexCenterCenter,
  mixins.fullWidth,
  {
    height: '88px',
    backgroundColor: 'inherit',
    padding: '0 16px',
  },
] as Interpolation<Theme>;

export const button = [
  mixins.flexCenterCenter,
  mixins.fullWidth,
  ({ colors: { white } }: Theme) => ({
    height: '48px',
    borderRadius: '8px',
    color: white,
    backgroundColor: 'rgba(255,255,255,0.08)',
    fontWeight: 600,
  }),
] as Interpolation<Theme>;

export const listWrap = {
  position: 'relative',
  padding: '20px',
  borderTop: '1px solid rgba(255, 255, 255, 0.12)',
} as Interpolation<Theme>;
