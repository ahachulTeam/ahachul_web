import React from 'react';
import { Flex } from '@ahhachul/react-components-layout';
import IconEllipsisHorizontal from '@/src/static/icons/system/IconEllipsisHorizontal';
import IconHeart from '@/src/static/icons/system/IconHeart';

import { commentNickname, commentContent, reCommentBtn, commentLoveBtn } from './style';

const Comment = () => {
  const getRandomNickname = () => {
    const list = [
      '갯나리',
      '특삼',
      '미호밍',
      '플락',
      '도롱뇽',
      '큐이',
      '선바',
      '김츠유',
      '수련수련',
      '한동숙',
      '짬바',
      '리끼',
      '따효니',
      '아리사',
      '녹두로',
      '룩삼',
    ];
    const randomIdx = Math.floor(Math.random() * list.length - 1) + 1;
    return list[randomIdx];
  };

  const getRandomContent = () => {
    const list = [
      '일주일에 충치치료, 사랑니(매복)2개나 뺄려하다니 내가 미쳤지 근데 원래 이렇게 멍한 느낌이 드나? 아파서 말을 못하겠다',
      '뷰뷰이 오늘 아침 8시에 퇴근하고 갤에 솔 공략 올리고 킬게용 아마 21:00~23:00 이시간쯤에 뱅종 할듯 상태 별로면 근말 할수도 있음..',
      '[광고] 약탈폭풍  wow+배틀로얄   신규출시',
      '몬스터 꺼버렸자나 한잔해',
      '토요일에 볼래요?',
      '정규 1등 찍은 효신좌 근황',
      '반갑습니다',
      '치과에서 이빨을 조지고 온 나',
      '광운대행 진짜 화난다',
      '늦은 밤엔 공룡의 광증이 깊어집니다.',
      'zzzㅋㅋㅋㅋㅋㅋㅋㅋ오 오랜만이누 ㅎㅇㅎㅇㅋㅋㅋㅋㅋㅋ',
      '정말 오랜만이야',
      '나락쇼',
      '롤체 시즌11 에메 간다',
      '나랑 영화볼래요?',
      '출근하다가 빵사가는데...',
    ];
    const randomIdx = Math.floor(Math.random() * list.length - 1) + 1;
    return list[randomIdx];
  };

  return (
    <Flex as="li" direction="column">
      <Flex
        as="article"
        direction="column"
        style={{
          padding: '16px 22px',
        }}
      >
        <Flex justify="space-between" align="center">
          <span css={commentNickname}>{getRandomNickname()}</span>
          <IconEllipsisHorizontal />
        </Flex>
        <p css={commentContent}>{getRandomContent()}</p>
        <Flex align="center" justify="space-between">
          <span css={reCommentBtn}>답글 달기</span>
          <div css={commentLoveBtn}>
            <IconHeart />
            <span>1</span>
          </div>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Comment;
