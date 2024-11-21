import type { Config } from 'tailwindcss';

const colors = require('./src/constants/colors');

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-pretendard)'],
      },
      colors: {
        ...colors,
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
        '20b': [
          '20px',
          {
            lineHeight: '25px',
            fontWeight: theme('fontWeight.bold'),
          },
        ],
        '18b': [
          '18px',
          {
            lineHeight: '23px',
            fontWeight: theme('fontWeight.bold'),
          },
        ],
        '16b': [
          '16px',
          {
            lineHeight: '21px',
            fontWeight: theme('fontWeight.bold'),
          },
        ],
        '16sb': [
          '16px',
          {
            lineHeight: '21px',
            fontWeight: theme('fontWeight.semiBold'),
          },
        ],
        '14b': [
          '14px',
          {
            lineHeight: '19px',
            fontWeight: theme('fontWeight.bold'),
          },
        ],
        '14sb': [
          '14px',
          {
            lineHeight: '19px',
            fontWeight: theme('fontWeight.semiBold'),
          },
        ],
        '14m': [
          '14px',
          {
            lineHeight: '19px',
            fontWeight: theme('fontWeight.medium'),
          },
        ],
        '14r': [
          '14px',
          {
            lineHeight: '19px',
            fontWeight: theme('fontWeight.regular'),
          },
        ],
        '12r': [
          '12px',
          {
            lineHeight: '16px',
            fontWeight: theme('fontWeight.regular'),
          },
        ],
        '11r': [
          '11px',
          {
            lineHeight: '13px',
            fontWeight: theme('fontWeight.regular'),
          },
        ],
      }),
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
