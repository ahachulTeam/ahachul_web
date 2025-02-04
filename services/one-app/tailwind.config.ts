import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-pretendard)'],
      },
      colors: {
        primary: {
          primary: '#00BAF6',
          primary_pressed: '#009ED1',
          primary_hover: '#80DDFB',
        },
        secondary: {
          secondary: '#D0EEFF',
          secondary_pressed: '#B8E5FF',
          secondary_hover: '#E2F5FF',
        },
        subway: {
          s1: '#2A3E91',
          s2: '#60B157',
          s3: '#FE8A39',
          s4: '#509DD8',
          s5: '#7F41D8',
          s6: '#A95523',
          s7: '#727719',
          s8: '#D2386E',
          s9: '#D1A946',
          airport: '#82B5E0', // 공항
          gyeongui: '#8CC2A7', // 경의중앙
          gyeongchun: '#4FAC7F', // 경춘
          suinBundang: '#E1AB3A', // 수인분당
          sinBundang: '#BC2A38', // 신분당
          gyeonggang: '#3C74EA', // 경강
          seohae: '#98C255', // 서해
          incheon1: '#7899CB', // 인천1
          incheon2: '#E9AD54', // 인천2
          everline: '#89C07A', // 에버라인
          uijeongbu: '#C5C03E', // 의정부
          wuisinseol: '#8CC2A7', // 우이신설
          gimpoGold: '#907227', // 김포골드
          sinlim: '#5367A0', // 신림
        },
        gray: {
          0: '#FFFFFF',
          10: '#FCFCFC',
          20: '#F5F5F5',
          30: '#EAECF1',
          40: '#DCDEE7',
          50: '#CED0DD',
          60: '#B7B9C3',
          70: '#95979F',
          80: '#74757C',
          90: '#33333E',
          100: '#121212',
        },
        green: {
          50: '#eafaf0',
          100: '#bdf0d1',
          200: '#9de9bb',
          300: '#70df9d',
          400: '#55d989',
          500: '#2acf6c',
          600: '#26bc62',
          700: '#1e934d',
          800: '#17723b',
          900: '#12572d',
        },
        'key-color': '#2ACF6C',
        red: '#EB4D3D',
        black: '#272727',
      },
      fontWeight: {
        regular: '400',
        medium: '500',
        semiBold: '600',
        bold: '700',
      },
      screens: {
        sm: { raw: '(max-width: 411px)' },
        md: { raw: '(min-width: 412px) and (max-width: 531px)' },
        lg: { raw: '(min-width: 532px)' },
        xl: { raw: '(min-width: 600px)' },
        pc: { raw: '(min-width: 990px)' },
      },
      fontSize: ({ theme }) => ({
        // Display
        'display-large': [
          '48px',
          {
            lineHeight: '128%',
            letterSpacing: '-0.032em',
            fontWeight: theme('fontWeight.semiBold'),
          },
        ],
        'display-medium': [
          '36px',
          {
            lineHeight: '133%',
            letterSpacing: '-0.027em',
            fontWeight: theme('fontWeight.semiBold'),
          },
        ],
        'display-small': [
          '32px',
          {
            lineHeight: '130%',
            letterSpacing: '-0.025em',
            fontWeight: theme('fontWeight.semiBold'),
          },
        ],

        // Headline
        'headline-large': [
          '24px',
          {
            lineHeight: '133%',
            letterSpacing: '-0.023em',
            fontWeight: theme('fontWeight.semiBold'),
          },
        ],
        'headline-medium': [
          '20px',
          {
            lineHeight: '140%',
            letterSpacing: '-0.025em',
            fontWeight: theme('fontWeight.semiBold'),
          },
        ],
        'headline-small': [
          '18px',
          {
            lineHeight: '133%',
            letterSpacing: '-0.02em',
            fontWeight: theme('fontWeight.semiBold'),
          },
        ],

        // Title
        'title-large': [
          '16px',
          {
            lineHeight: '150%',
            letterSpacing: '-0.02em',
            fontWeight: theme('fontWeight.semiBold'),
          },
        ],
        'title-medium': [
          '16px',
          {
            lineHeight: '150%',
            letterSpacing: '-0.02em',
            fontWeight: theme('fontWeight.medium'),
          },
        ],
        'title-small': [
          '15px',
          {
            lineHeight: '150%',
            letterSpacing: '-0.02em',
            fontWeight: theme('fontWeight.semiBold'),
          },
        ],

        // Label
        'label-large': [
          '14px',
          {
            lineHeight: '150%',
            letterSpacing: '-0.02em',
            fontWeight: theme('fontWeight.semiBold'),
          },
        ],
        'label-medium': [
          '14px',
          {
            lineHeight: '148%',
            letterSpacing: '-0.02em',
            fontWeight: theme('fontWeight.medium'),
          },
        ],
        'label-small': [
          '12px',
          {
            lineHeight: '150%',
            letterSpacing: '-0.017em',
            fontWeight: theme('fontWeight.semiBold'),
          },
        ],

        // Body
        'body-large': [
          '16px',
          {
            lineHeight: '150%',
            letterSpacing: '-0.02em',
            fontWeight: theme('fontWeight.regular'),
          },
        ],
        'body-large-semi': [
          '15px',
          {
            lineHeight: '150%',
            letterSpacing: '-0.02em',
            fontWeight: theme('fontWeight.regular'),
          },
        ],
        'body-medium': [
          '13px',
          {
            lineHeight: '150%',
            letterSpacing: '-0.02em',
            fontWeight: theme('fontWeight.regular'),
          },
        ],
        'body-small': [
          '12px',
          {
            lineHeight: '145%',
            letterSpacing: '-0.02em',
            fontWeight: theme('fontWeight.regular'),
          },
        ],
      }),
      animation: {
        spinner: 'spinner 1s steps(30) infinite',
      },
      keyframes: {
        spinner: {
          '100%': {
            backgroundPosition: '-1740px',
          },
        },
      },
    },
    screens: {
      sm: { raw: '(max-width: 411px)' },
      md: { raw: '(min-width: 412px) and (max-width: 531px)' },
      lg: { raw: '(min-width: 532px)' },
      xl: { raw: '(min-width: 600px)' },
      pc: { raw: '(min-width: 990px)' },
    },
  },
  plugins: [],
};
export default config;
