import { CSSObject } from '@emotion/react';
import { color } from './color';

const layout: CSSObject = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '0 auto',
};

const theme = {
  color: {
    primary: {
      white: '#ffffff',
      black: '#0B0B0B',
      black_all: '#000000',
      blue: '#004FEC',
      red: '#FF4848',
      pink: '#FF59A4',
      green: '#15B295',
      purple: '#7C5BFF',
      tertiary: '#EAEAFF',
      orange: '',
      error: '',
      linear: '',
    },
    sub: {
      // sub red
      red_ff6363: '#FF6363',
      red_ff546c: '#FF546C',
      red_ffcbdb: '#FFCBDB',
      // sub blue
      blue_83a7e1: '#83A7E1',
      blue_4a93ff: '#4A93FF',
      blue_2f5fdc: '#2F5FDC',
      blue_2c6aff: '#2C6AFF',
      blue_3973ff: '#3973FF',
      blue_3477fe: '#3477FE',
      blue_1e48ae: '#1E48AE',
      blue_1d58e4: '#1D58E4',
      // sub green
      green_63ffab: '#63FFAB',
      // sub gray
      gray_eaeaea: '#eaeaea',
      gray_d6d9de: '#D6D9DE',
      gray_d0d0d0: '#D0D0D0',
      gray_b0b0b0: '#B0B0B0',
      gray_909090: '#909090',
      gray_606060: '#606060',
      gray_555663: '#555663',
      gray_464b57: '#464B57',
      gray_40444f: '#40444F',
      gray_404040: '#404040',
      gray_3a3c53: '#3A3C53',
      gray_8a909f: '#8A909F',
      gray_9b9cb0: '#9b9cb0',
      gray_6c727f: '#6C727F',
      gray_b2bfd1: '#B2BFD1',
      gray_9ca2b8: '#9CA2B8',
      gray_738dc2: '#738DC2',
      gray_2b395d: '#2B395D',
      gray_f3f7ff: '#F3F7FF',
      gray_f3f8ff: '#F3F8FF',
      gray_eef4ff: '#EEF4FF',
      gray_eaf3ff: '#EAF3FF',
      gray_e1e9f5: '#E1E9F5',
      gray_f5f8fd: '#F5F8FD',
      gray_f6f7fa: '#F6F7FA',
      gray_f0f0f0: '#F0F0F0',
    },
    color2: color,
    background: {
      toast: 'rgba(32, 36, 43, 0.96)',
    },
    line: {
      line10: '',
      line20: '',
      line30: '#E1E6ED',
    },
    gray: {
      gray20: '#9A9EA8',
      gray50: '#F0F3F9',
      gray80: '#515458',
      gray100: '#26282B',
    },
    bluegray: {
      bluegray20: '#C8CDD9',
      bluegray40: '#949DB2',
      bluegray50: '#727B8E',
      bluegray80: '#4C5874',
      bluegray90: '#363E52',
    },
  },
  typography: {
    size: {
      heading1: '28px',
      heading2: '24px',
      heading3: '22px',
      heading4: '20px',
      heading5: '18px',
      paragraph1: '16px',
      paragraph2: '14px',
      element1: '15px',
      element2: '13px',
      element3: '12px',
      element4: '11px',
    },
    weight: {
      bold: 700,
      semibold: 600,
      medium: 500,
      regular: 400,
    },
    letterSpacing: {
      2: '-0.2px',
      4: '-0.4px',
    },
  },
  shadows: {
    1: '0px 3px 16px 0px rgba(0, 0, 0, 0.20)',
    2: '0px -4px 4px rgba(0, 0, 0, 0.025)',
    3: '2px 5px 20px 0px rgba(83, 90, 103, 0.10)',
  },
  grids: {
    layout1: {
      ...layout,
      width: '100%',
    },
    layout2: {
      ...layout,
      width: '84%',
    },
    layout3: {
      ...layout,
      width: '67%',
    },
    layout4: {
      ...layout,
      width: '50%',
    },
  },
  size: {
    gutter: '20px',
    height: {
      header: '58px',
      navbar: '64px',
    },
  },
  zIndex: {
    overlay: 100,
    backdrop: 100,
  },
} as const;

export default theme;
