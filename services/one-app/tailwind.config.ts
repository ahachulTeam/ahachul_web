import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        sans: ['var(--font-pretendard)'],
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
