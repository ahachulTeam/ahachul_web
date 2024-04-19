import { Flex } from '@ahhachul/react-components-layout';
import { CSSObject, Theme } from '@emotion/react';

import IconAlarmTalk from '@/src/static/icons/system/IconAlarmTalk';
import IconAlarmComplaint from '@/src/static/icons/system/IconAlarmComplaint';
// import { useFlow } from 'stackflow';
import { useState } from 'react';
// import { getRandomBoolean } from 'mocks/utils';

const getRandomContent = (type: 'talk' | 'complaints') => {
  const list = [
    '2호선 게시판: 일주일에 충치치료, 사랑니(매복)2개나 뺄려하다니 내가 미쳤지 근데 원래 이렇게 멍한 느낌이 드나? 아파서 말을 못하겠다',
    '7호선 게시판: 뷰뷰이 오늘 아침 8시에 퇴근하고 갤에 솔 공략 올리고 킬게용 아마 21:00~23:00 이시간쯤에 뱅종 할듯 상태 별로면 근말 할수도 있음..',
    '9호선 게시판: [광고] 약탈폭풍  wow+배틀로얄   신규출시',
    '1호선 게시판: 몬스터 꺼버렸자나 한잔해',
    '1호선 게시판: 토요일에 볼래요?',
    '2호선 게시판: 정규 1등 찍은 효신좌 근황',
    '2호선 게시판: 반갑습니다',
    '7호선 게시판: 치과에서 이빨을 조지고 온 나',
    '1호선 게시판: 광운대행 진짜 화난다',
    '1호선 게시판: 늦은 밤엔 공룡의 광증이 깊어집니다.',
    '6호선 게시판: zzzㅋㅋㅋㅋㅋㅋㅋㅋ오 오랜만이누 ㅎㅇㅎㅇㅋㅋㅋㅋㅋㅋ',
    '1호선 게시판: 정말 오랜만이야',
    '3호선 게시판: 나락쇼',
    '3호선 게시판: 롤체 시즌11 에메 간다',
    '1호선 게시판: 나랑 영화볼래요?',
    '9호선 게시판: 출근하다가 빵사가는데...',
  ];
  const randomIdx = Math.floor(Math.random() * list.length - 1) + 1;
  return type === 'complaints' ? list[randomIdx]?.replace('게시판', '민원') : list[randomIdx];
};

function ActivityNotification(props: { type: 'talk' | 'complaints' }) {
  const { type } = props;
  const [notiCount, minus] = useState(1);
  const isActive = notiCount >= 1;

  // const { push } = useFlow();
  const pushTo = () => {
    // type === 'talk' ? push('CommunityDetail', { articleId: '1' }) : push('ComplaintDetail', { articleId: '1' });
    setTimeout(() => {
      minus(0);
    }, 750);
  };

  return (
    <li onClick={pushTo}>
      <Flex as="article" direction="column" gap="12px" css={wrap(isActive)}>
        <Flex align="center" style={{ position: 'relative' }}>
          {type === 'talk' ? <IconAlarmTalk /> : <IconAlarmComplaint />}
          <span css={category}>{type === 'talk' ? '커뮤니티' : '민원신청'}</span>
          <time css={time}>1시간전</time>
          {isActive && <span css={cnt}>{notiCount}</span>}
        </Flex>
        <Flex direction="column" gap="30px" style={{ paddingLeft: '24px' }}>
          <Flex
            direction="column"
            gap="6px"
            style={{
              borderRadius: '6px',
              position: 'relative',
            }}
          >
            <span css={tooltip}>작성하신 {type === 'talk' ? '게시물' : '민원'}에 댓글이 달렸어요</span>
            <p css={content}>{getRandomContent(type)}</p>
          </Flex>
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

const category = ({ typography: { fontSize, fontWeight } }: Theme) => ({
  fontSize: fontSize[14],
  fontWeight: fontWeight[600],
  color: '#dfe2ea',
  marginLeft: '8px',
});

const time = ({ typography: { fontSize } }: Theme): CSSObject => ({
  fontSize: fontSize[12],
  color: '#9da5b6',
  marginLeft: '6px',
});

const tooltip = ({ typography: { fontSize, fontWeight } }: Theme): CSSObject => ({
  fontSize: fontSize[12],
  fontWeight: fontWeight[500],
  color: '#ffffff',
  borderBottom: '1px solid hsla(0, 0%, 100%, .09)',
  display: 'flex',
  alignItems: 'center',
  marginBottom: '8px',
  paddingBottom: '12px',
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

export default ActivityNotification;
