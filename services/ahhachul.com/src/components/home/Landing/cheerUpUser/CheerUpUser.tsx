import React, { useRef } from 'react';
import { Theme } from '@emotion/react';
import { CSSObject } from '@emotion/styled';

import { f } from 'shared/style';

const getPhrase = () => {
  let randomNum = Math.floor(Math.random() * 9);

  return (
    <>
      {randomNum === 0 && <>멋진 오늘을 응원해요! &#128525;</>}
      {randomNum === 1 && <>정말 잘하고 있어요 &#128079;</>}
      {randomNum === 2 && <>언제나 늘 응원할게요! &#127881;</>}
      {randomNum === 3 && <>매일매일 반가워요! &#128588;</>}
      {randomNum === 4 && <>힘차게 시작해볼까요? &#128170;</>}
      {randomNum === 5 && <>활짝 웃는 하루되세요! &#128515;</>}
      {randomNum === 6 && <>하나씩 이뤄가볼까요? &#128521;</>}
      {randomNum === 7 && <>목표에 한 걸음 다가가요! &#128522;</>}
      {randomNum === 8 && (
        <>
          현재 <b>열차정보와 혼잡도</b>를 알려드려요!
        </>
      )}
    </>
  );
};

const CheerUpUser = () => {
  const phraseRef = useRef(getPhrase());

  return (
    <h1 css={title}>
      <b>이효범님,</b>
      {phraseRef.current}
    </h1>
  );
};

const title = [
  f.sideGutter,
  ({ color: { text }, typography: { fontSize, fontWeight } }: Theme): CSSObject => ({
    color: text[50],
    fontSize: fontSize[18],
    fontWeight: fontWeight[500],
    lineHeight: '32px',
    letterSpacing: '-0.4px',
    paddingTop: '24px',
    marginBottom: '40px',

    b: {
      fontWeight: fontWeight[700],
    },

    'b:first-of-type': {
      display: 'block',
    },
  }),
];

export default CheerUpUser;
