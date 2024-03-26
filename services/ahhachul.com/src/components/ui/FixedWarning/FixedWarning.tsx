import React from 'react';
import { CSSObject, keyframes, Theme } from '@emotion/react';
import { f } from 'styles';
import IconBell from 'static/icons/system/IconBell';
import IconChevron from 'static/icons/system/IconChevron';

const FixedWarning = () => {
  return (
    <article css={wrap}>
      <IconBell />
      <p>
        [긴급] 4호선 열차 고장으로 30분 지연중입니다. 이용하시던 승객분은 가급적 다른 대중교통을 이용하시기 바랍니다.
      </p>
      <div>
        <span></span>
        <IconChevron />
      </div>
    </article>
  );
};

const scaleUp = keyframes`
  0% { opacity:0; max-height: 0;}
  50% {opacity:0; height:48px; max-height: 48px;}
  100% {opacity: 1; height:48px; max-height: 48px;}
`;

const wrap = [
  f.fullWidth,
  f.sideGutter,
  f.flexAlignCenter,
  ({
    color: {
      static: {
        dark: { gray, red },
      },
    },
    typography: { fontSize, fontWeight, lineHeight },
  }: Theme): CSSObject => ({
    opacity: 0,
    maxHeight: 0,
    animation: `${scaleUp} 1.54s forwards ease-in-out`,
    willChange: 'max-height',

    gap: '8px',
    backgroundColor: red[900],

    '& > div:first-of-type': {
      width: '20px',
      height: '20px',

      '& > svg': {
        '& > path': {
          fill: gray[1000],
        },
      },
    },

    '& > p': {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      WebkitLineClamp: 1,
      WebkitBoxOrient: 'vertical',
      color: gray[1000],
      fontSize: fontSize[14],
      fontWeight: fontWeight[500],
      lineHeight: lineHeight[133],
    },

    '& > div': {
      display: 'flex',
      alignItems: 'center',

      '& > span': {
        color: gray[1000],
        fontSize: fontSize[14],
        fontWeight: fontWeight[500],
        lineHeight: lineHeight[133],
        marginRight: '4px',
      },
    },
  }),
];

export default FixedWarning;
