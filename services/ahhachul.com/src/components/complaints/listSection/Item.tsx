import { Flex } from '@ahhachul/react-components-layout';
import { CSSObject, Theme } from '@emotion/react';
import { CSSProperties, useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { useFlow } from 'stackflow';
import IconComment from 'static/icons/system/IconComment';
import mockImg1 from 'static/img/mocks/mock2.png';
import mockImg2 from 'static/img/mocks/mock4.png';
import mockImg3 from 'static/img/mocks/mock5.jpg';
import { f } from 'styles';
import { exportHexColorWidthLineName, exportSubwayInfoFromTrainNumber } from 'utils/export';

function Item({ trainNo }: { trainNo: string }) {
  const { push } = useFlow();
  const navigateToDetail = () =>
    push('ComplaintDetail', { articleId: (Math.floor(Math.random() * 1000) + 1).toString() });

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

  const [subwayInfo, setSubwayInfo] = useState<any>();
  useEffect(() => {
    console.log(':exportSubwayInfoFromTrainNumber(trainNo)', exportSubwayInfoFromTrainNumber(trainNo));
    setSubwayInfo(exportSubwayInfoFromTrainNumber(trainNo));
  }, []);

  const getRandomContent = () => {
    const list = [
      '더워요',
      '할아버지가 앞에서 춤춰요',
      '다리가 너무 후들후들거려요 도와주세요',
      '민원 신고 하느라 고생 많아, 한잔해',
      '토요일에 볼래요?',
      '의자가 너무 더러워요',
      '반갑습니다',
      '온도 조절 좀 부탁드립니다. 여름인데 왜 히터가 나오나요?',
      '광운대행 진짜 화나요',
      '경찰 좀 불러주세요, 성추행 신고할게요',
      '취객이 난동 피우고 있어요',
      '앞에 할머니가 쓰러지셨어요',
      '제 이빨이 깨졌는데 출근해야하나요?',
      '왜 15분이나 연착하는건가요?',
      '나랑 영화볼래요?',
      '출근하다가 빵사가는데 이빨이 깨졌어요',
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
    <li onClick={navigateToDetail}>
      <Flex as="article" direction="column" gap="12px" css={wrap}>
        <Flex direction="column">
          <div css={{ marginBottom: '12px' }}>
            <span css={nickname}>{getRandomNickname()}</span>
            <time css={time}>오후 3:00</time>
          </div>
          <div css={trainLabelsWrap(exportHexColorWidthLineName(subwayInfo?.lineName))}>
            <span>
              {subwayInfo?.lineName} {subwayInfo?.roomNumber && `${subwayInfo?.roomNumber}번째 칸`}
            </span>
            <p>
              열차번호 <b>{trainNo}</b>
            </p>
          </div>
        </Flex>
        <Flex justify="space-between">
          <p css={content as unknown as CSSObject}>{getRandomContent()}</p>
          <div css={img}>
            <LazyLoadImage
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
            <IconComment /> <span>2</span>
          </div>
        </Flex>
      </Flex>
    </li>
  );
}

const wrap = {
  padding: '12px 0',
};

const nickname = ({ typography: { fontSize, fontWeight } }: Theme) => ({
  fontSize: fontSize[14],
  fontWeight: fontWeight[600],
  color: '#c9cedc',
});

const time = ({ typography: { fontSize } }: Theme): CSSObject => ({
  fontSize: fontSize[12],
  color: '#9da5b6',
  marginLeft: '6px',
});

const trainLabelsWrap =
  (pointColor: CSSProperties['color']) =>
  ({
    color: {
      static: {
        dark: { gray },
      },
    },
    typography: { fontSize, fontWeight },
  }: Theme) => ({
    display: 'flex',
    alignItems: 'center',

    '& > span': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '4px',
      padding: '0 8px',
      height: '20px',
      color: gray[1000],
      fontSize: fontSize[12],
      fontWeight: fontWeight[500],
      background: pointColor,
    },

    '& > p': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '4px',
      padding: '0 8px',
      height: '20px',
      color: gray[1000],
      fontSize: fontSize[12],
      background: 'inherit',

      '& > b': {
        marginLeft: '4px',
      },
    },
  });

const content = [
  f.truncate4,
  ({ typography: { fontSize } }: Theme) => ({
    fontSize: fontSize[14],
    color: '#c9cedc',
    letterSpacing: '-0.3px',
    lineHeight: '19px',
  }),
];

const img: CSSObject = {
  width: '50px',
  minWidth: '50px',
  height: '50px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  marginLeft: '16px',

  '& > img': {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '6px',
  },
};

const label = ({ typography: { fontSize } }: Theme): CSSObject => ({
  display: 'flex',
  alignItems: 'center',
  marginRight: '8px',

  '& > span': {
    fontSize: fontSize[12],
    color: '#c9cedc',
    letterSpacing: '-0.3px',
    lineHeight: '19px',
    marginLeft: '4px',
  },
});

export default Item;
