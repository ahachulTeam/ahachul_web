import { Flex } from '@ahhachul/react-components-layout';
import { CSSObject, Theme } from '@emotion/react';
import { getRandomBoolean } from 'utils/helper';

function DirectMessage() {
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

  const isActive = getRandomBoolean();

  return (
    <Flex direction="column" gap="12px" css={wrap(isActive)}>
      <Flex align="center">
        <span css={nickname}>{getRandomNickname()}</span>
        <time css={time}>오후 3:00</time>
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
        <p css={content}>안녕하세요. 올려주신 지갑 제가 4호선에서 분실한 것 같은데 혹시 어디 거주하시나요?</p>
        {isActive && <span css={cnt}>1</span>}
      </Flex>
    </Flex>
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

const time = ({ typography: { fontSize } }: Theme): CSSObject => ({
  fontSize: fontSize[12],
  color: '#9da5b6',
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

export default DirectMessage;
