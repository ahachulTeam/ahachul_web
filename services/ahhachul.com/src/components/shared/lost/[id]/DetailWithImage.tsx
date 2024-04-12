import React from 'react';
import { Box, Flex, Text } from '@ahhachul/react-components-layout';
import { UiComponent } from 'components';
import IconBookmark from 'static/icons/system/IconBookmark';
import IconHeart from 'static/icons/system/IconHeart';

import { userName, time, category, btn, commentTitle, commentList } from './style';
import Comment from './Comment';
import { ILostDetail } from 'types';
import { LazyLoadImage } from 'react-lazy-load-image-component';

function DetailWithImage({ data }: { data: ILostDetail }) {
  return (
    <>
      <Box
        style={{
          position: 'relative',
          width: '100vw',
          minWidth: '100vw',
          aspectRatio: '1 / 0.925667',
        }}
      >
        <LazyLoadImage
          effect="opacity"
          src={data.images[0].imageUrl}
          alt=""
          sizes="100vw"
          width={0}
          height={0}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </Box>
      <Flex direction="column" css={{ padding: '0 20px', marginTop: '20px', position: 'relative' }}>
        <h3 css={userName}>{data.writer}</h3>
        <time css={time}>1월13일 10:40</time>
        <span css={category}>자유</span>
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

export default DetailWithImage;
