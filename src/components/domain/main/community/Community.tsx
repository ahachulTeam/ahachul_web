"use client";

/* eslint-disable no-underscore-dangle */
import { v4 } from "uuid";

import * as S from "./styled";

import Item from "./item/Item";

const DUMMY_LIST = [
  {
    _id: v4(),
    title: "오늘자 3호선 빌런 출현",
    content: "언론·출판은 타인의 명예나 권리 또는 공중도덕이나 사회윤리를 침해하여서는...",
    likeCnt: "픽업 어딘가3",
    commentCnt: "서울",
    subwayLine: "신분당",
    time: "2022-07-29T00:00:00.000Z",
    category: "Shipping",
  },
  {
    _id: v4(),
    title: "지금 신분당 안오는 이유",
    content: "언론·출판은 타인의 명예나 권리 또는 공중도덕이나 사회윤리를 침해하여서는...",
    likeCnt: "픽업 어딘가3",
    commentCnt: "서울",
    subwayLine: "수인분당",
    time: "2022-07-29T00:00:00.000Z",
    category: "Shipping",
  },
  {
    _id: v4(),
    title: "중앙역 앞 맛집 모음 리스트",
    content: "언론·출판은 타인의 명예나 권리 또는 공중도덕이나 사회윤리를 침해하여서는...",
    likeCnt: "픽업 어딘가3",
    commentCnt: "서울",
    subwayLine: "3호선",
    time: "2022-07-29T00:00:00.000Z",
    category: "Shipping",
  },
  {
    _id: v4(),
    title: "노마스크충들 봐라",
    content: "언론·출판은 타인의 명예나 권리 또는 공중도덕이나 사회윤리를 침해하여서는...",
    likeCnt: "픽업 어딘가3",
    commentCnt: "서울",
    subwayLine: "1호선",
    time: "2022-07-29T00:00:00.000Z",
    category: "Shipping",
  },
  {
    _id: v4(),
    title: "출근하는 길에 보기 좋은 책 모음",
    content: "언론·출판은 타인의 명예나 권리 또는 공중도덕이나 사회윤리를 침해하여서는...",
    likeCnt: "픽업 어딘가3",
    commentCnt: "서울",
    subwayLine: "7호선",
    time: "2022-07-29T00:00:00.000Z",
    category: "Shipping",
  },
];

function Community() {
  return (
    <S.Community>
      {DUMMY_LIST.map(data => (
        <Item key={data._id} data={data} />
      ))}
    </S.Community>
  );
}

export default Community;
