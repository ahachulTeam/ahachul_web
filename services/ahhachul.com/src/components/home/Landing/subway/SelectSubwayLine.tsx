import React from 'react';
import { CSSObject, Theme } from '@emotion/react';
import { exportHexColorWidthLineName } from 'utils/export';
import { f } from 'shared/style';
import IconChevron from 'shared/static/icons/system/IconChevron';

const SelectSubwayLine = ({
  subwayLineIds,
  toSubwayMap,
  changeCallback,
}: {
  subwayLineIds: string[];
  toSubwayMap: () => void;
  changeCallback: (lines: string[]) => void;
}) => {
  const swapArrayElements = () => {
    let copy = [...subwayLineIds];
    let temp = copy[0];
    copy[0] = copy[1];
    copy[1] = temp;
    changeCallback(copy);
  };

  return (
    <div css={filterWrap(subwayLineIds[1])}>
      <ul>
        <li>
          <button>{subwayLineIds[0]}</button>
        </li>
        <li css={{}}>
          <button onClick={swapArrayElements}>{subwayLineIds[1]}</button>
        </li>
      </ul>
      <button onClick={toSubwayMap}>
        <span>전체 노선도 보기</span>
        <IconChevron />
      </button>
    </div>
  );
};

export default SelectSubwayLine;

const filterWrap = (subwayLineId: string) => [
  f.fullWidth,
  ({
    color: { background, text },
    typography: { fontSize, fontWeight },
    layout: {
      radii: { full },
    },
  }: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: background[50],
    marginBottom: '28px',

    '& > ul ': {
      display: 'flex',
      alignItems: 'center',
    },

    '& > ul > li': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '32px',
      height: '32px',
      borderRadius: full,
      marginRight: '12px',

      '& > button': {
        color: text[50],
        fontSize: fontSize[16],
        fontWeight: fontWeight[600],
        letterSpacing: '-0.2px',
      },

      '&:first-of-type': {
        background: 'linear-gradient(263deg, #2EE477 0%, #50BEFD 100%)',
      },

      '&:last-of-type': {
        transition: 'background-color 0.4s ease-in-out',
        backgroundColor: exportHexColorWidthLineName(subwayLineId),
      },
    },

    '& > button': {
      display: 'flex',
      alignItems: 'center',
      color: '#E6E6E6',
      fontSize: fontSize[14],
      fontWeight: fontWeight[500],
    },
  }),
];

const wrap = [
  f.fullWidth,
  f.flexColumn,
  ({ color: { background } }: Theme) => ({
    paddingBottom: '24px',
    backgroundColor: background[50],
  }),
];

const loading: CSSObject = {
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  paddingTop: '36px',
  opacity: 0.07,
};
