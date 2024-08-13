import { CSSObject, Theme } from '@emotion/react';

const grid: CSSObject = {
  display: 'grid',
};

const flex: CSSObject = {
  display: 'flex',
};

const flexAlignCenter: CSSObject[] = [
  flex,
  {
    alignItems: 'center',
  },
];

const flexJustifyCenter: CSSObject[] = [
  flex,
  {
    justifyContent: 'center',
  },
];

const flexCenterCenter: CSSObject[] = [
  flex,
  {
    alignItems: 'center',
    justifyContent: 'center',
  },
];

const flexJustifySpaceBetween: CSSObject[] = [
  flex,
  {
    justifyContent: 'space-between',
  },
];

const flexColumn: CSSObject[] = [
  flex,
  {
    flexDirection: 'column',
  },
];

const flex1: CSSObject = {
  flex: 1,
};

const posAbs: CSSObject = {
  position: 'absolute',
};

const posRel: CSSObject = {
  position: 'relative',
};

const top0: CSSObject = {
  top: 0,
};

const left0: CSSObject = {
  left: 0,
};

const fullWidth: CSSObject = {
  width: '100%',
};

const fullHeight: CSSObject = {
  height: '100%',
};

const posAbsFull: CSSObject[] = [posAbs, top0, left0, fullWidth, fullHeight];

const nowrap: CSSObject = {
  whiteSpace: 'nowrap',
};

const resetButton = ({ color: { gray } }: Theme): CSSObject => ({
  appearance: 'none',
  border: 0,
  padding: 0,
  background: 'none',
  color: gray[0],
  textAlign: 'left',
});

const cursorPointer: CSSObject = {
  cursor: 'pointer',
  WebkitTapHighlightColor: 'transparent',
};

const overflowHidden: CSSObject = {
  overflow: 'hidden',
  transform: 'translate3d(0, 0, 0)',
  maskImage: '-webkit-radial-gradient(white, black)',
};

const overflowScroll: CSSObject = {
  overflowY: 'scroll',
  WebkitOverflowScrolling: 'touch',
  '::-webkit-scrollbar': {
    display: 'none',
  },
};

const rootLineHeight: CSSObject = {
  lineHeight: '1.15',
};

const visuallyHidden: CSSObject = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  margin: '-1px',
  border: 0,
  padding: 0,
  whiteSpace: 'nowrap',
  clip: 'rect(0, 0, 0, 0)',
  overflow: 'hidden',
};

const truncate = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  wordBreak: 'break-all',
};

const truncate1 = [
  truncate,
  {
    WebkitLineClamp: 1,
  },
];

const truncate2 = [
  truncate,
  {
    WebkitLineClamp: 2,
  },
];

const truncate3 = [
  truncate,
  {
    WebkitLineClamp: 2,
  },
];

const truncate4 = [
  truncate,
  {
    WebkitLineClamp: 2,
  },
];

const sideGutter: CSSObject = {
  paddingLeft: '20px',
  paddingRight: '20px',
};

export {
  grid,
  flex,
  flexAlignCenter,
  flexJustifyCenter,
  flexCenterCenter,
  flexJustifySpaceBetween,
  flexColumn,
  flex1,
  posRel,
  posAbs,
  top0,
  left0,
  fullWidth,
  fullHeight,
  posAbsFull,
  nowrap,
  cursorPointer,
  overflowHidden,
  overflowScroll,
  rootLineHeight,
  visuallyHidden,
  truncate1,
  truncate2,
  truncate3,
  truncate4,
  sideGutter,
  resetButton,
};
