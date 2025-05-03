import { css, type Interpolation, type Theme } from '@emotion/react';

import { subwayLineHexColors } from '@/constants';
import { fadeIn, mixins } from '@/styles';
import type { SubwayLineType } from '@/types';

export const inner = {
  position: 'relative',
  width: 'calc(100% - 40px)',
  borderRadius: '20px',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  margin: '0 auto',
} as Interpolation<Theme>;

export const thickBorder = (subwayLineId: SubwayLineType) =>
  ({
    position: 'absolute',
    left: '0',
    top: '0',
    width: '100%',
    height: '30px',
    borderTopLeftRadius: '20px',
    borderTopRightRadius: '20px',
    transition: 'background-color 0.4s ease-in-out',
    backgroundColor: subwayLineHexColors(Number(subwayLineId)),
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    animation: `${fadeIn} 0.8s forwards`,

    '& > span': {
      color: 'white',
      fontSize: '14px',
      fontWeight: 600,
    },
  }) as Interpolation<Theme>;

export const stationName = (subwayLineId: SubwayLineType) =>
  [
    mixins.flexCenterCenter,
    ({ colors: { white, black } }: Theme) => ({
      height: '36px',
      padding: '6px 12px',

      borderRadius: '35px',
      transition: 'border-color 0.4s ease-in-out',
      border: `4px solid ${subwayLineHexColors(Number(subwayLineId))}`,
      color: black,
      backgroundColor: white,

      marginLeft: '20px',

      fontSize: '16px',
      fontWeight: 600,
    }),
  ] as Interpolation<Theme>;

export const trainInfos = [
  mixins.posRel,
  mixins.flexColumn,
  {
    justifyContent: 'flex-end',
    padding: '47px 0 0 0',
  },
] as Interpolation<Theme>;

export const currentTrainArrivalInfo = {
  minHeight: '24px',
  marginBottom: '14px',
  padding: '0 16px',
};

export const arrivalInfoLabel = [
  mixins.posRel,
  mixins.flexAlignCenter,
  ({ colors: { white, primary } }: Theme) => ({
    '& > b': {
      animation: `${fadeIn} 0.8s forwards`,
      color: primary.primary,
      fontSize: '20px',
      fontWeight: 700,
      marginRight: '6px',
    },

    '& > span': {
      animation: `${fadeIn} 0.8s forwards`,
      position: 'relative',
      top: '0.5px',
      color: white,
      fontSize: '16px',
      lineHeight: 1.5,
    },
  }),
] as Interpolation<Theme>;

export const refetchBtnCss = () =>
  ({
    position: 'absolute',
    top: '50%',
    right: 0,
    transform: 'translateY(-50%)',

    '& > svg': {
      position: 'relative',
      top: '1px',
      width: '16px',
      height: '16px',
    },
  }) as Interpolation<Theme>;

export const buttonWrap = [
  mixins.fullWidth,
  mixins.flexCenterCenter,
  {
    backgroundColor: 'inherit',
    padding: '0 16px 14px 16px',
  },
] as Interpolation<Theme>;

export const button = [
  mixins.fullWidth,
  mixins.flexCenterCenter,
  ({ colors: { white } }: Theme) => ({
    height: '34px',
    borderRadius: '8px',
    padding: '0 16px',
    color: white,
    backgroundColor: 'rgba(255,255,255,0.08)',
    fontWeight: 500,
    transition: 'all 100ms ease-out',

    '&:hover': {
      transform: 'scale(1.02)',
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
    },

    '&:active': {
      transform: 'scale(0.98)',
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
    },
  }),
] as Interpolation<Theme>;

export const listWrap = {
  position: 'relative',
  padding: '14px 16px',
  borderTop: '1px solid rgba(255, 255, 255, 0.12)',
} as Interpolation<Theme>;

export const loading = css`
  height: 19px;
  animation: ios-spin 1.5s ease infinite;
`;

export const upDown = css`
  position: absolute;
  top: 50%;
  right: 36px;
  transform: translateY(-50%);

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    right: -10px;
    width: 1px;
    height: 10px;
    background-color: #949db2;
    transform: translateY(-50%);
  }
`;
