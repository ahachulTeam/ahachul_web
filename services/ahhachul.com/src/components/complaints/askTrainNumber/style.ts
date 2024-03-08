import { CSSObject } from '@emotion/react';
import { f } from 'styles';

const buttonWrapper: [CSSObject[], CSSObject] = [
  f.flexColumn,
  {
    alignItems: 'center',
    justifyContent: 'center',
    gap: '32px',
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: '8px',
    padding: 0,
    margin: '0 20px 58px 84px',
  },
];

const tooltip: [CSSObject[], CSSObject] = [
  f.flexAlignCenter,
  {
    gap: '6px',
  },
];

export { buttonWrapper, tooltip };
