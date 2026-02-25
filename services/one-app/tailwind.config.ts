import type { Config } from 'tailwindcss';

import {
  createTailwindSansFontFamily,
  tailwindColors,
  tailwindFontWeights,
  tailwindTypographyScale,
} from '@ahhachul/design-system';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: createTailwindSansFontFamily('--font-pretendard'),
      colors: tailwindColors,
      fontWeight: tailwindFontWeights,
      fontSize: tailwindTypographyScale,
      screens: {
        sm: { raw: '(max-width: 411px)' },
        md: { raw: '(min-width: 412px) and (max-width: 531px)' },
        lg: { raw: '(min-width: 532px)' },
        xl: { raw: '(min-width: 600px)' },
        pc: { raw: '(min-width: 990px)' },
      },
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
