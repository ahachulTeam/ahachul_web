const grid = {
  display: 'grid',
};

const flex = {
  display: 'flex',
};

const flexAlignCenter = [
  flex,
  {
    alignItems: 'center',
  },
];

const flexJustifyCenter = [
  flex,
  {
    justifyContent: 'center',
  },
];

const flexCenterCenter = [
  flex,
  {
    alignItems: 'center',
    justifyContent: 'center',
  },
];

const flexJustifySpaceBetween = [
  flex,
  {
    justifyContent: 'space-between',
  },
];

const flexColumn = [
  flex,
  {
    flexDirection: 'column',
  },
];

const flex1 = {
  flex: 1,
};

const posAbs = {
  position: 'absolute',
};

const posRel = {
  position: 'relative',
};

const top0 = {
  top: 0,
};

const left0 = {
  left: 0,
};

const fullWidth = {
  width: '100%',
};

const fullHeight = {
  height: '100%',
};

const maxWidth = {
  maxWidth: '520px',
};

const posAbsFull = [posAbs, top0, left0, fullWidth, fullHeight];

const nowrap = {
  whiteSpace: 'nowrap',
};

const cursorPointer = {
  cursor: 'pointer',
  WebkitTapHighlightColor: 'transparent',
};

const overflowHidden = {
  overflow: 'hidden',
  transform: 'translate3d(0, 0, 0)',
  maskImage: '-webkit-radial-gradient(white, black)',
};

const overflowScroll = {
  overflowY: 'scroll',
  WebkitOverflowScrolling: 'touch',
  '::-webkit-scrollbar': {
    display: 'none',
  },
};

const overflowXScroll = {
  overflowX: 'scroll',
  WebkitOverflowScrolling: 'touch',
  '::-webkit-scrollbar': {
    display: 'none',
  },
};

const rootLineHeight = {
  lineHeight: '1.15',
};

const visuallyHidden = {
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

const pagePaddingTop = {
  paddingTop: '16px',
};

const sideGutter = {
  paddingLeft: '20px',
  paddingRight: '20px',
};

const cssUtils = {
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
  maxWidth,
  fullWidth,
  fullHeight,
  posAbsFull,
  nowrap,
  cursorPointer,
  overflowHidden,
  overflowScroll,
  overflowXScroll,
  rootLineHeight,
  visuallyHidden,
  truncate1,
  truncate2,
  sideGutter,
  pagePaddingTop,
};

export default cssUtils;
