import { f } from 'shared/style';

const ul = [
  f.sideGutter,
  {
    '& > li:first-of-type': {
      '& > article': { paddingTop: 0 },
    },

    '& > li:not(:last-of-type)': {
      borderBottom: '1px solid hsla(0, 0%, 100%, .06)',
    },
  },
];

export { ul };
