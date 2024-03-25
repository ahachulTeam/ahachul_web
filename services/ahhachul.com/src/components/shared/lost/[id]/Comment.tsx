import React from 'react';
import { Flex } from '@ahhachul/react-components-layout';
import IconEllipsisHorizontal from 'static/icons/system/IconEllipsisHorizontal';
import IconHeart from 'static/icons/system/IconHeart';

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

  return (
    <Flex as="li" direction="column" gap="16px">
      <Flex
        as="article"
        direction="column"
        style={{
          padding: '16px 22px',
          borderRadius: '8px',
        }}
      >
        <Flex justify="space-between" align="center">
          <span css={commentNickname}>{getRandomNickname()}</span>
          <IconEllipsisHorizontal />
        </Flex>
        <p css={commentContent}>
          텃세도 종류가 다양한데 확실히 너무 돌파하기 힘든건 어떤 텃세도 종류가 다양한데 확실히 너무 돌파하기 힘든건
          어떤 텃세도 종류가 다양한데 확실히 너무 돌파하기 힘든건 어떤 텃세도 종류가 다양한데 확실히 너무 돌파하기
          힘든건 어떤
        </p>
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
