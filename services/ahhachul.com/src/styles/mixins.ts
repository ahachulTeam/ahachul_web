import { css } from '@emotion/react';

import { fadeIn } from './animate';

const grid = css`
  display: grid;
`;

const flex = css`
  display: flex;
`;

const flexAlignCenter = css`
  display: flex;
  align-items: center;
`;

const flexJustifyCenter = css`
  display: flex;
  justify-content: center;
`;

const flexCenterCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const flexJustifySpaceBetween = css`
  display: flex;
  justify-content: space-between;
`;

const flexColumn = css`
  display: flex;
  flex-direction: column;
`;

const flex1 = css`
  flex: 1;
`;

const posAbs = css`
  position: absolute;
`;

const posRel = css`
  position: relative;
`;

const top0 = css`
  top: 0;
`;

const left0 = css`
  left: 0;
`;

const fullWidth = css`
  width: 100%;
`;

const fullHeight = css`
  height: 100%;
`;

const maxWidth = css`
  max-width: 520px;
`;

const posAbsFull = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const nowrap = css`
  white-space: nowrap;
`;

const cursorPointer = css`
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
`;

const overflowHidden = css`
  overflow: hidden;
  transform: translate3d(0, 0, 0);
  mask-image: -webkit-radial-gradient(white, black);
`;

const overflowYScroll = css`
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const overflowXScroll = css`
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const rootLineHeight = css`
  line-height: 1.15;
`;

const visuallyHidden = css`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  border: 0;
  padding: 0;
  white-space: nowrap;
  clip: rect(0, 0, 0, 0);
  overflow: hidden;
`;

const truncate = css`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  word-break: break-all;
`;

const truncate1 = css`
  ${truncate}
  -webkit-line-clamp: 1;
`;

const truncate2 = css`
  ${truncate}
  -webkit-line-clamp: 2;
`;

const sideGutter = css`
  padding-left: 20px;
  padding-right: 20px;
`;

const animatedLayout = (isScaled = false) => css`
  ${sideGutter}
  animation: 0.3s forwards ${fadeIn};
  padding-top: 100px;
  transform: ${isScaled ? 'translateY(-50px)' : 'translateY(0)'};
  transition: transform 0.4s ease;
`;

const mixins = {
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
  overflowYScroll,
  overflowXScroll,
  rootLineHeight,
  visuallyHidden,
  truncate1,
  truncate2,
  sideGutter,
  animatedLayout,
};

export default mixins;
