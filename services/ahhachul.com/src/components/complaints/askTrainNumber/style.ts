import { CSSObject } from '@emotion/react';
import { f } from 'styles';

const buttonWrapper: [CSSObject, CSSObject[], CSSObject] = [
  f.fullWidth,
  f.flexColumn,
  {
    justifyContent: 'center',
    gap: '24px',
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: '16px',
    borderRadius: '8px',
    padding: '20px 24px',
  },
];

const tooltip: [CSSObject[], CSSObject] = [
  f.flexAlignCenter,
  {
    gap: '6px',
    marginTop: '16px',
  },
];

export { buttonWrapper, tooltip };
