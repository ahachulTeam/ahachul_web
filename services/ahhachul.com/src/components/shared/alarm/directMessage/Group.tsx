import { Flex } from '@ahhachul/react-components-layout';
import { CSSObject, Theme } from '@emotion/react';
import { getRandomBoolean } from 'shared/lib/server/__mocks__/utils';
import { useState } from 'react';
import { useFlow } from 'stackflow';

const getRandomNickname = () => {
  const list = ['선바와 아이들', '룩삼사거리', '수련잉!', '동숙누나와함께춤을', '큐이얍얍'];
  const randomIdx = Math.floor(Math.random() * list.length - 1) + 1;
  return list[randomIdx];
};

function GroupChatCard() {
  const { push } = useFlow();
  const pushTo = () => {
    push('Chat', { slug: getRandomNickname() });
    setTimeout(() => {
      minus(0);
    }, 750);
  };

  const [notiCount, minus] = useState(getRandomBoolean() ? 1 : 0);
  const isActive = notiCount >= 1;

  return (
    <li onClick={pushTo}>
      <Flex as="article" direction="column" gap="12px" css={wrap(isActive)}>
        <Flex align="center">
          <span css={nickname}>{getRandomNickname()}</span>
          <b css={unread}>새 메시지 23개</b>
        </Flex>
        <Flex
          direction="column"
          gap="6px"
          style={{
            borderRadius: '6px',
            position: 'relative',
            paddingRight: '50px',
          }}
        >
          <p css={content}>안녕하세요~</p>
          {isActive && <span css={cnt}>1</span>}
        </Flex>
      </Flex>
    </li>
  );
}

const wrap = (isActive: boolean): CSSObject => ({
  padding: '24px 20px',
  backgroundColor: isActive ? 'hsla(0, 0%, 100%, .06)' : 'inherit',
  '&:not(:last-of-type)': {
    borderBottom: isActive ? '1px solid hsla(0, 0%, 100%, .09)' : '1px solid hsla(0, 0%, 100%, .06)',
  },
});

const nickname = ({ typography: { fontSize, fontWeight } }: Theme) => ({
  fontSize: fontSize[14],
  fontWeight: fontWeight[600],
  color: '#dfe2ea',
});

const unread = ({ typography: { fontSize } }: Theme): CSSObject => ({
  fontSize: fontSize[12],
  color: '#ffffff',
  marginLeft: '6px',
});

const content = ({ typography: { fontSize } }: Theme): CSSObject => ({
  fontSize: fontSize[14],
  color: '#c9cedc',
  letterSpacing: '-0.3px',
  lineHeight: '19px',
});

const cnt = ({ typography: { fontSize, fontWeight } }: Theme): CSSObject => ({
  fontSize: fontSize[12],
  fontWeight: fontWeight[500],
  color: '#ffffff',
  height: '24px',
  width: '24px',
  border: '1px solid hsla(0, 0%, 100%, .09)',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  top: 0,
  right: 0,
});

export default GroupChatCard;
