import 'swiper/css/bundle';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';

import React from 'react';
import {
  Swiper,
  SwiperSlide,
  // type SwiperClass,
} from 'swiper/react';

import { useFlow } from 'stackflow';
import { Flex } from '@ahhachul/react-components-layout';

import { wrap, title, headSection, ul, card_wrap, nickname, time, content, img, label } from './style';

import mockImg1 from 'static/img/mocks/mock2.png';
import mockImg2 from 'static/img/mocks/mock4.png';
import mockImg3 from 'static/img/mocks/mock5.jpg';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import IconHeart from 'static/icons/system/IconHeart';
import IconComment from 'static/icons/system/IconComment';
import { CSSObject } from '@emotion/react';

const StationTalksSummary = () => {
  const { push } = useFlow();

  const routeToStationTalks = () => push('StationTalks', {});
  const navigateToDetail = () =>
    push('CommunityDetail', { articleId: (Math.floor(Math.random() * 1000) + 1).toString() });

  // const [swiperInstance, setSwiper] = useState<SwiperClass | undefined>(undefined);
  // const [isBeginning, setIsBeginning] = useState(true);
  // const [isEnd, setIsEnd] = useState(false);

  return (
    <div css={wrap}>
      <div css={headSection}>
        <h1 css={title}>
          <span>건대입구 이모저모</span>
        </h1>
        <button onClick={routeToStationTalks}>더보기</button>
      </div>
      <Swiper css={ul as unknown as CSSObject} slidesPerView={1} spaceBetween={12}>
        {new Array(7).fill('').map((_, i) => (
          <SwiperSlide key={i}>
            <SlideItem navigateToDetail={navigateToDetail} index={i} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

const SlideItem = ({ navigateToDetail, index }) => {
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

  const getRandomImg = () => {
    const list = [mockImg1, mockImg2, mockImg3];
    const randomIdx = Math.floor(Math.random() * list.length - 1) + 1;
    return list[randomIdx];
  };

  return (
    <li css={{ width: '100%' }} onClick={navigateToDetail}>
      <article css={card_wrap}>
        <Flex align="center" css={{ marginBottom: '8px' }}>
          <span css={nickname}>{getRandomNickname()}</span>
          <time css={time}>오후 3:00</time>
        </Flex>
        <Flex justify="space-between">
          <p css={content as unknown as CSSObject}>{getRandomContent()}</p>
          <div css={img}>
            <LazyLoadImage
              visibleByDefault={index !== 0}
              useIntersectionObserver={index === 0}
              src={getRandomImg()}
              alt=""
              width="100%"
              height="100%"
              effect="opacity"
              css={{ objectFit: 'cover', borderRadius: '6px' }}
            />
          </div>
        </Flex>
        <Flex align="center">
          <div css={label}>
            <IconHeart /> <span>3</span>
          </div>
          <div css={label}>
            <IconComment /> <span>10</span>
          </div>
        </Flex>
      </article>
    </li>
  );
};
export default StationTalksSummary;
