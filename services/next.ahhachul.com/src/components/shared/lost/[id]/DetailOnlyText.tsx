import React from 'react';
import { Flex, Text } from '@ahhachul/react-components-layout';
import { UiComponent } from '@/src/components';
import IconBookmark from '@/src/static/icons/system/IconBookmark';
import IconHeart from '@/src/static/icons/system/IconHeart';
import { userName, time, category, btn, commentList, commentTitle } from './style';
import Comment from './Comment';
import { formatDate } from '@/src/utils/time';
import { ILostDetail } from '@/src/types';

function DetailOnlyText({ data }: { data: ILostDetail }) {
  return (
    <>
      <Flex direction="column" css={{ padding: '0 20px', marginTop: '16px', position: 'relative' }}>
        <h3 css={userName}>{data.writer ?? 'LOST112'}</h3>
        <time css={time}>{formatDate(new Date(data.date))}</time>
        <span css={category}>{data.categoryName}</span>
      </Flex>
      <UiComponent.TextRenderer article={data.content} isPlainText={!data.writer} />
      <Flex style={{ padding: '0 20px 20px' }} />
      <Flex align="center" justify="space-between" style={{ padding: '10px 20px' }}>
        <Flex align="center" gap="30px">
          <Flex align="center" gap="6px">
            <IconHeart />
            <Text fontSize="sm">1</Text>
          </Flex>
        </Flex>
        <IconBookmark />
      </Flex>
      <UiComponent.Divider color="hsla(0, 0%, 100%, .06)" />
      <Flex justify="space-between" align="center" style={{ padding: '18px 20px 0' }}>
        <span css={commentTitle}>댓글 99</span>
        <Flex align="center" gap="12px">
          <span css={btn(true)}>인기순</span>
          <span css={btn(false)}>등록순</span>
        </Flex>
      </Flex>

      {/* 댓글 */}
      <ul css={commentList}>
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
      </ul>
    </>
  );
}

export default DetailOnlyText;
