import { f } from 'styles';
import { CSSObject } from '@emotion/react';

const tabHeight = '68.4px';
const paddingTopHeight = '26px';

const wrap = [
  f.posRel,
  f.fullHeight,
  f.fullWidth,
  f.flexColumn,
  f.overflowScroll,
  { padding: `${paddingTopHeight} 20px 48px 20px` },
];

const err: [CSSObject, CSSObject] = [
  f.posAbs,
  {
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    height: `calc(100% - ${tabHeight} - ${paddingTopHeight})`,
    boxSizing: 'border-box',
  },
];

const loading = {
  paddingTop: tabHeight,
};

export { wrap, err, loading };
