import {
  전체Icon, // 소개팅Icon,
  중고거래Icon, // 카셰어링Icon
} from '../static';

export const CTAList = {
  AllServices: {
    label: '전체',
    icon: <전체Icon />,
  },
  // BlindDate: {
  //   label: '소개팅',
  //   icon: <소개팅Icon />,
  // },
  Market: {
    label: '중고거래',
    icon: <중고거래Icon />,
  },
  // CarSharing: {
  //   label: '카셰어링',
  //   icon: <카셰어링Icon />,
  // },
} as const;
