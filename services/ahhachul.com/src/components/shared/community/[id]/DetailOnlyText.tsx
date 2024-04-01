import React from 'react';
import { Flex, Text } from '@ahhachul/react-components-layout';
import { UiComponent } from 'components';
import IconBookmark from 'static/icons/system/IconBookmark';
import IconHeart from 'static/icons/system/IconHeart';
import { userName, time, category, btn, commentTitle, commentList } from './style';
import Comment from './Comment';

const article = `{"blocks":[{"key":"foo","text":"세상에서 가장 예쁜","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"1chn1","text":"한소희... ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"8hnka","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"8hae3","text":" ","type":"atomic","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"length":1,"key":0}],"data":{}},{"key":"2dnrh","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"4441l","text":"내꺼할래..?","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"4k0hg","text":"아님 나 망나니되는꼴볼래..?","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"9l0an","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"aoob3","text":" ","type":"atomic","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"length":1,"key":1}],"data":{}},{"key":"f6dnm","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{"0":{"type":"image","mutability":"IMMUTABLE","data":{"src":"https://www.anewsa.com/news_images/2023/07/04/mark/20230704115608.jpg"}},"1":{"type":"image","mutability":"IMMUTABLE","data":{"src":"https://wimg.mk.co.kr/news/cms/202401/24/news-p.v1.20240124.fdfa9961816943c8a10d567dccb59a5c_P1.jpg"}}}}`;

function DetailOnlyText({ nickname }: { nickname: string }) {
  return (
    <>
      <Flex direction="column" css={{ padding: '0 20px', marginTop: '16px', position: 'relative' }}>
        <h3 css={userName}>{nickname}</h3>
        <time css={time}>1월13일 10:40</time>
        <span css={category}>자유</span>
      </Flex>
      <UiComponent.TextRenderer article={article} />
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
