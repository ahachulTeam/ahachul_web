import React from 'react';
//  { useEffect, useRef, useState }
import { CSSObject, keyframes, Theme } from '@emotion/react';
import { f } from 'styles';
import IconBell from 'static/icons/system/IconBell';
import IconChevron from 'static/icons/system/IconChevron';
import { useFlow } from 'stackflow';
// import { addSwipeLeftListener, addSwipeRightListener } from 'utils/swipe';
// import IconClose from 'static/icons/system/IconClose';

const FixedWarning = () => {
  const { push } = useFlow();
  const routeToSubwayWarning = () => push('SubwayWarning', {});
  // const wrapRef = useRef<HTMLElement | null>(null);
  // const [buttonClicked, setButtonClicked] = useState(false);

  // const [swipedPosX, setSwipedPosX] = useState(0);
  // const handleSwipeLeft = () => {
  //   setSwipedPosX(-80);
  //   // 잠시 후에 다시 원래 위치로 돌아가도록 함
  //   setTimeout(() => setSwipedPosX(0), 3000);
  // };

  // const handleSwipeRight = () => {
  //   setSwipedPosX(0);
  // };

  // useEffect(() => {
  //   addSwipeLeftListener(wrapRef.current as HTMLElement, handleSwipeLeft);
  //   addSwipeRightListener(wrapRef.current as HTMLElement, handleSwipeRight);
  // }, []);

  return (
    // <div css={{ width: '100%', position: 'relative' }}>
    <article
      // ref={wrapRef} css={wrap(swipedPosX)} onTouchCancel={() => setSwipedPosX(0)}>
      css={wrap}
      onClick={routeToSubwayWarning}
    >
      <IconBell />
      <p>
        [긴급] 4호선 열차 고장으로 30분 지연중입니다. 이용하시던 승객분은 가급적 다른 대중교통을 이용하시기 바랍니다.
      </p>
      <div>
        <IconChevron />
      </div>
    </article>
    // {!buttonClicked && (
    //   <button
    //     css={closeBtn}
    //     onClick={() => {
    //       setButtonClicked(true);
    //       wrapRef.current!.style.display = 'none';
    //     }}
    //   >
    //     <IconClose />
    //   </button>
    // )}
    // </div>
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
  ({ color: { gray, ruby }, typography: { fontSize, fontWeight, lineHeight } }: Theme): CSSObject => ({
    // position: 'absolute',
    // top: 0,
    // left: posX,
    // transition: 'left 0.3s ease-in-out',
    opacity: 0,
    maxHeight: 0,
    animation: `${scaleUp} 1.54s forwards ease-in-out`,
    willChange: 'max-height',
    zIndex: 10,

    gap: '8px',
    backgroundColor: ruby[900],

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

// const wrap = (posX: number) => [
//   f.fullWidth,
//   f.sideGutter,
//   f.flexAlignCenter,
//   ({
//     color: {
//       static: {
//         dark: { gray, red },
//       },
//     },
//     typography: { fontSize, fontWeight, lineHeight },
//   }: Theme): CSSObject => ({
//     position: 'absolute',
//     top: 0,
//     left: posX,
//     transition: 'left 0.3s ease-in-out',
//     opacity: 0,
//     maxHeight: 0,
//     animation: `${scaleUp} 1.54s forwards ease-in-out`,
//     willChange: 'max-height',
//     zIndex: 10,

//     gap: '8px',
//     backgroundColor: red[900],

//     '& > div:first-of-type': {
//       width: '20px',
//       height: '20px',

//       '& > svg': {
//         '& > path': {
//           fill: gray[1000],
//         },
//       },
//     },

//     '& > p': {
//       overflow: 'hidden',
//       textOverflow: 'ellipsis',
//       display: '-webkit-box',
//       WebkitLineClamp: 1,
//       WebkitBoxOrient: 'vertical',
//       color: gray[1000],
//       fontSize: fontSize[14],
//       fontWeight: fontWeight[500],
//       lineHeight: lineHeight[133],
//     },

//     '& > div': {
//       display: 'flex',
//       alignItems: 'center',

//       '& > span': {
//         color: gray[1000],
//         fontSize: fontSize[14],
//         fontWeight: fontWeight[500],
//         lineHeight: lineHeight[133],
//         marginRight: '4px',
//       },
//     },
//   }),
// ];

// const closeBtn: CSSObject = {
//   animation: `${scaleUp} 1.54s forwards ease-in-out`,
//   position: 'absolute',
//   top: 0,
//   right: 0,
//   width: '80px',
//   height: '48px',
//   color: '#c9cedc',
//   background: 'inherit',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// };

export default FixedWarning;
