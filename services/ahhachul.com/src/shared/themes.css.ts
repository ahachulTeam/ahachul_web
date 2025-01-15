const PAGE_PADDING_TOP = '16px';
const SIDE_GUTTER = '20px';
const HEADER_HEIGHT = '58px';
const NAVBAR_HEIGHT = '109px';
const BOTTOM_DIM_HEIGHT = '200px';

const themes = {
  selector: 'cupertino',
  color: {
    background: {
      '50': 'var(--background-50)',
    },
    black: {
      '50': 'var(--black-50)',
      '100': 'var(--black-100)',
      '200': 'var(--black-200)',
      '300': 'var(--black-300)',
      '400': 'var(--black-400)',
      '500': 'var(--black-500)',
      '600': 'var(--black-600)',
      '700': 'var(--black-700)',
      '800': 'var(--black-800)',
      '900': 'var(--black-900)',
      '1000': 'var(--black-1000)',
    },
    blackAlpha: {
      '50': 'var(--black-alpha-50)',
      '100': 'var(--black-alpha-100)',
      '200': 'var(--black-alpha-200)',
      '300': 'var(--black-alpha-300)',
      '400': 'var(--black-alpha-400)',
      '500': 'var(--black-alpha-500)',
      '600': 'var(--black-alpha-600)',
      '700': 'var(--black-alpha-700)',
      '800': 'var(--black-alpha-800)',
      '900': 'var(--black-alpha-900)',
    },
    blueDarkGray: {
      '50': 'var(--blue-dark-gray-50)',
      '100': 'var(--blue-dark-gray-100)',
      '200': 'var(--blue-dark-gray-200)',
      '300': 'var(--blue-dark-gray-300)',
      '400': 'var(--blue-dark-gray-400)',
      '500': 'var(--blue-dark-gray-500)',
      '600': 'var(--blue-dark-gray-600)',
      '700': 'var(--blue-dark-gray-700)',
      '800': 'var(--blue-dark-gray-800)',
      '900': 'var(--blue-dark-gray-900)',
    },
    blueGray: {
      '50': 'var(--blue-gray-50)',
      '100': 'var(--blue-gray-100)',
      '200': 'var(--blue-gray-200)',
      '300': 'var(--blue-gray-300)',
      '400': 'var(--blue-gray-400)',
      '500': 'var(--blue-gray-500)',
      '600': 'var(--blue-gray-600)',
    },
    brown: {
      '50': 'var(--brown-50)',
    },
    error: {
      '50': 'var(--error-50)',
    },
    gold: {
      '50': 'var(--gold-50)',
    },
    gray: {
      '50': 'var(--gray-50)',
      '100': 'var(--gray-100)',
      '200': 'var(--gray-200)',
      '300': 'var(--gray-300)',
      '400': 'var(--gray-400)',
      '500': 'var(--gray-500)',
      '600': 'var(--gray-600)',
      '700': 'var(--gray-700)',
      '800': 'var(--gray-800)',
      '900': 'var(--gray-900)',
      '1000': 'var(--gray-1000)',
    },
    green: {
      '50': 'var(--green-50)',
      '100': 'var(--green-100)',
      '200': 'var(--green-200)',
      '300': 'var(--green-300)',
      '400': 'var(--green-400)',
    },
    greenAlpha: {
      '50': 'var(--green-alpha-50)',
      '100': 'var(--green-alpha-100)',
    },
    mint: {
      '50': 'var(--mint-50)',
      '100': 'var(--mint-100)',
    },
    orange: {
      '50': 'var(--orange-50)',
      '100': 'var(--orange-100)',
      '200': 'var(--orange-200)',
    },
    primary: {
      main: 'var(--primary-main)',
      secondary: 'var(--primary-secondary)',
    },
    purple: {
      '50': 'var(--purple-50)',
      '100': 'var(--purple-100)',
    },
    ruby: {
      '50': 'var(--ruby-50)',
      '100': 'var(--ruby-100)',
      '200': 'var(--ruby-200)',
      '300': 'var(--ruby-300)',
      '400': 'var(--ruby-400)',
      '500': 'var(--ruby-500)',
      '600': 'var(--ruby-600)',
      '700': 'var(--ruby-700)',
      '800': 'var(--ruby-800)',
      '900': 'var(--ruby-900)',
      '1000': 'var(--ruby-1000)',
    },
    rubyAlpha: {
      '50': 'var(--ruby-alpha-50)',
    },
    skyBlue: {
      '50': 'var(--sky-blue-50)',
      '100': 'var(--sky-blue-100)',
      '200': 'var(--sky-blue-200)',
      '300': 'var(--sky-blue-300)',
      '400': 'var(--sky-blue-400)',
      '500': 'var(--sky-blue-500)',
      '600': 'var(--sky-blue-600)',
    },
    skyPurpleAlpha: {
      '50': 'var(--sky-purple-alpha-50)',
    },
    text: {
      '50': 'var(--text-50)',
    },
    white: {
      '50': 'var(--white-50)',
      '100': 'var(--white-100)',
      '200': 'var(--white-200)',
      '300': 'var(--white-300)',
      '400': 'var(--white-400)',
      '500': 'var(--white-500)',
      '600': 'var(--white-600)',
      '700': 'var(--white-700)',
      '800': 'var(--white-800)',
      '900': 'var(--white-900)',
    },
    whiteAlpha: {
      '50': 'var(--white-alpha-50)',
      '100': 'var(--white-alpha-100)',
      '200': 'var(--white-alpha-200)',
      '300': 'var(--white-alpha-300)',
      '400': 'var(--white-alpha-400)',
      '500': 'var(--white-alpha-500)',
      '600': 'var(--white-alpha-600)',
      '700': 'var(--white-alpha-700)',
      '800': 'var(--white-alpha-800)',
      '900': 'var(--white-alpha-900)',
    },
    yellow: {
      '50': 'var(--yellow-50)',
      '100': 'var(--yellow-100)',
      '200': 'var(--yellow-200)',
      '300': 'var(--yellow-300)',
    },
  },
  typography: {
    fontSize: {
      '11': '0.6875rem',
      '12': '0.75rem',
      '14': '0.875rem',
      '16': '1rem',
      '18': '1.125rem',
      '20': '1.25rem',
      '24': '1.5rem',
      '30': '1.875rem',
      '32': '2rem',
      '36': '2.25rem',
      '48': '3rem',
      '60': '3.75rem',
      '72': '4.5rem',
    },
    fontWeight: {
      '400': '400',
      '500': '500',
      '600': '600',
      '700': '700',
    },
    lineHeight: {
      '100': '100%',
      '120': '120%',
      '133': '133%',
      '150': '150%',
    },
  },
  dimensions: {
    zIndexes: {
      dimmed: 200,
      dialog: 200,
      alert: 400,
      nav: 1000,
      toast: 1500,
      modal: 1800,
      bottomSheetDimmed: 2000,
      bottomSheet: 3000,
    },
    size: {
      gutter: SIDE_GUTTER,
      pagePaddingTop: PAGE_PADDING_TOP,
      height: {
        header: HEADER_HEIGHT,
        navbar: NAVBAR_HEIGHT,
        bottomDim: BOTTOM_DIM_HEIGHT,
      },
    },
  },
  layout: {
    radii: {
      none: '0',
      sm: '0.125rem',
      base: '0.25rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '0.75rem',
      '2xl': '1rem',
      '3xl': '1.5rem',
      full: '9999px',
    },
  },
} as const;

export default themes;
