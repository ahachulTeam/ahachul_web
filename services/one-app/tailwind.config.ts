import type { Config } from 'tailwindcss';

const colors = require('./src/common/constants/colors');

const config: Config = {
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
    },
  },
  plugins: [],
};
export default config;
