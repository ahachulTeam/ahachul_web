import React from 'react';

import { wrap } from './style';
import { AnimatePresence, motion } from 'framer-motion';
import { defaultFadeInVariants } from 'shared/data/motion';
import { useAppSelector } from 'stores';
import { useGetBlindList } from 'queries/blindDate/useGetBlindList';
import { CSSObject, Theme } from '@emotion/react';
import { f } from 'shared/style';
import IconBlindMembership from 'shared/static/icons/blindDate/IconBlindMembership';
import IconCheckFill from 'shared/static/icons/blindDate/IconCheckFill';
import IconLocation from 'shared/static/icons/blindDate/IconLocation';

const BlindList = () => {
  const { activeView } = useAppSelector((state) => state.blindDate);

  const { data } = useGetBlindList();
  console.log('data:', data);

  return (
    <AnimatePresence mode="wait">
      {activeView === 'BLIND' && (
        <motion.main
          css={[wrap, { gap: 0 }]}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={defaultFadeInVariants}
        >
          <article css={banner}>
            <IconBlindMembership />
            <div>
              <h2>
                이효범님은 지금 <b>멤버십</b> 혜택 대상자에요
              </h2>
              <p>지금 가입하면 매칭 2배 이벤트!</p>
            </div>
          </article>
          <p css={updateTitle}>4월 7일 일요일 08:00 업데이트</p>
          <h3 css={cardTitle}>이효범님의 운명의 상대</h3>
          <article css={card}>
            <div css={label}>
              <IconCheckFill />
              <span>진지한 만남</span>
            </div>
            <div css={userInfoSummary}>
              <div css={thumbnail}>🐰</div>
              <div css={textInfo}>
                <span>
                  <b>21세</b> 대학생
                </span>
                <ul>
                  <li>#경희대</li>
                  <li>#ISTP</li>
                </ul>
              </div>
            </div>
            <button css={cardBtn}>카드 열어보기</button>
          </article>
          <h3 css={cardTitle}>다같이 한 잔해~</h3>
          <article css={[card, { background: '#171717' }]}>
            <div css={labelList}>
              <div>
                <IconCheckFill />
                <span>설레는</span>
              </div>
              <div>
                <IconLocation />
                <span>건대입구역</span>
              </div>
            </div>
            <div css={userInfoSummary}>
              <div css={thumbnail}>🐱</div>
              <div css={textInfo}>
                <span>
                  <b>평균 24세</b> 직장인/대학원생
                </span>
                <ul>
                  <li>#2대2</li>
                  <li>#술게임</li>
                </ul>
              </div>
            </div>
            <button css={cardBtn}>카드 열어보기</button>
          </article>
          <h2 css={cardTitle}>최근 성사된 매칭</h2>
          <section css={gridSection}>
            <article>
              <div>
                <IconCheckFill />
                <span>소개팅</span>
              </div>
              <div css={[thumbnail, { marginRight: 0, marginBottom: '8px' }]}>🦊</div>
              <span css={smallInfo}>대학생, 22세</span>
              <span css={[smallInfo, { marginBottom: 0 }]}>iwns281</span>
            </article>
            <article>
              <div>
                <IconCheckFill />
                <span>소개팅</span>
              </div>
              <div css={[thumbnail, { marginRight: 0, marginBottom: '8px' }]}>🐥</div>
              <span css={smallInfo}>대학생, 26세</span>
              <span css={[smallInfo, { marginBottom: 0 }]}>iwns281</span>
            </article>
            <article>
              <div>
                <IconCheckFill />
                <span>소개팅</span>
              </div>
              <div css={[thumbnail, { marginRight: 0, marginBottom: '8px' }]}>🐶</div>
              <span css={smallInfo}>대학생, 23세</span>
              <span css={[smallInfo, { marginBottom: 0 }]}>iwns281</span>
            </article>
            <article>
              <div>
                <IconCheckFill />
                <span>미팅</span>
              </div>
              <div css={[thumbnail, { marginRight: 0, marginBottom: '8px' }]}>🐭</div>
              <span css={smallInfo}>평균 25세</span>
              <span css={[smallInfo, { marginBottom: 0 }]}>iwns281</span>
            </article>
            <article>
              <div>
                <IconCheckFill />
                <span>미팅</span>
              </div>
              <div css={[thumbnail, { marginRight: 0, marginBottom: '8px' }]}>🦋</div>
              <span css={smallInfo}>평균 22세</span>
              <span css={[smallInfo, { marginBottom: 0 }]}>iwns281</span>
            </article>
            <article>
              <div>
                <IconCheckFill />
                <span>미팅</span>
              </div>
              <div css={[thumbnail, { marginRight: 0, marginBottom: '8px' }]}>🦦</div>
              <span css={smallInfo}>평균 23세</span>
              <span css={[smallInfo, { marginBottom: 0 }]}>inseo613</span>
            </article>
          </section>
          <h2 css={cardTitle}>매칭 활성화</h2>
          <section css={activeInfo}>
            <div>
              <span>소개팅 매칭 활성화</span>
            </div>
            <div>
              <span>미팅 매칭 활성화</span>
            </div>
          </section>
        </motion.main>
      )}
    </AnimatePresence>
  );
};

const banner: [CSSObject[], ({ typography }: Theme) => CSSObject] = [
  f.flexAlignCenter,
  ({ typography: { fontSize, fontWeight } }: Theme) => ({
    backgroundColor: 'rgba(245, 249, 254, 0.11)',
    height: '69px',
    paddingLeft: '18px',
    width: 'calc(100% - 40px)',
    margin: '0 auto',
    borderRadius: '12px',
    marginBottom: '32px',

    '& > div:last-of-type': {
      display: 'flex',
      flexDirection: 'column',
      marginLeft: '16px',

      '& > h2': {
        color: '#FFFFfF',
        fontSize: fontSize[14],
        fontWeight: fontWeight[700],
        marginBottom: '6px',

        '& > b': {
          color: '#FF4C7C',
        },
      },

      '& > p': {
        color: '#AAA6B1',
        fontSize: fontSize[12],
      },
    },
  }),
];

const updateTitle = ({ typography: { fontSize } }: Theme) => ({
  color: 'rgba(255, 255, 255, 0.55)',
  fontSize: fontSize[11],
  paddingLeft: '20px',
  marginBottom: '12px',
});

const cardTitle = ({ typography: { fontSize, fontWeight } }: Theme) => ({
  color: '#ffffff',
  fontSize: fontSize[14],
  fontWeight: fontWeight[700],
  paddingLeft: '20px',
  marginBottom: '14px',
});

const card = ({ typography: { fontSize, fontWeight } }: Theme) => ({
  color: '#ffffff',
  fontSize: fontSize[14],
  fontWeight: fontWeight[700],
  width: 'calc(100% - 40px)',
  margin: '0 auto',
  borderRadius: '12px 12px 0 0',
  backgroundColor: 'red',
  padding: '18px',
  background: 'linear-gradient(225deg, #853349 0%, #380E19 48%, #121212 100%)',
  marginBottom: '36px',
  backdropFilter: 'blur(4px)',
});

const label = ({ typography: { fontSize, fontWeight } }: Theme) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  borderRadius: '8px',
  width: 'max-content',
  height: '26px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0 12px',
  marginBottom: '21px',

  '& > span': {
    color: '#ffffff',
    fontSize: fontSize[12],
    fontWeight: fontWeight[500],
    marginLeft: '6px',
  },
});

const labelList = ({ typography: { fontSize, fontWeight } }: Theme) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '26px',

  '& > div': {
    width: 'max-content',
    height: '26px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
    padding: '0 12px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginRight: '6px',

    '& > span': {
      color: '#ffffff',
      fontSize: fontSize[12],
      fontWeight: fontWeight[500],
      marginLeft: '6px',
    },
  },
});

const userInfoSummary = [
  f.flexAlignCenter,
  {
    marginBottom: '19px',
  },
];

const thumbnail = [
  f.flexCenterCenter,
  {
    marginRight: '12px',
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    fontSize: '30px',
  },
];

const textInfo = ({ typography: { fontSize, fontWeight } }: Theme): CSSObject => ({
  width: 'max-content',
  display: 'flex',
  flexDirection: 'column',

  '& > span': {
    color: '#ffffff',
    marginBottom: '6px',
    fontWeight: fontWeight[400],
    fontSize: fontSize[14],

    '& > b': {
      fontSize: fontSize[16],
      fontWeight: fontWeight[600],
    },
  },
  '& > ul': {
    display: 'flex',
    alignItems: 'center',

    '& > li': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '22px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '8px',
      fontSize: fontSize[12],
      fontWeight: fontWeight[400],
      padding: '0 10px',
      marginRight: '4px',
    },
  },
});

const cardBtn = ({ typography: { fontSize, fontWeight } }: Theme) => ({
  background: 'linear-gradient(225deg, #FF5151 0%,  #FF1756 100%)',
  borderRadius: '6px',
  width: 'calc(100% - 18px)',
  margin: '0 auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#ffffff',
  fontSize: fontSize[16],
  fontWeight: fontWeight[600],
  padding: '12px 0',
});

const gridSection = ({ typography: { fontSize, fontWeight } }: Theme): CSSObject => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '12px 10px',
  width: '100%',
  padding: '0 20px',
  marginBottom: '36px',

  '& > article': {
    background: '#171717',
    borderRadius: '12px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '14px 0',

    '& > div:first-of-type': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '12px',

      '& > span': {
        marginLeft: '5px',
        color: 'rgba(255, 255, 255, 0.75)',
        fontSize: fontSize[12],
        fontWeight: fontWeight[500],
      },
    },
  },
});

const smallInfo = ({ typography: { fontSize, fontWeight } }: Theme): CSSObject => ({
  color: '#ffffff',
  fontSize: fontSize[12],
  fontWeight: fontWeight[500],
  marginBottom: '4px',
});

const activeInfo = ({ typography: { fontSize, fontWeight } }: Theme): CSSObject => ({
  padding: '20px',
  margin: '0 20px',
  background: '#171717',
  borderRadius: '12px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '17.5px',

  '& > div': {
    '& > span': {
      color: '#ffffff',
      fontSize: fontSize[14],
      fontWeight: fontWeight[500],
    },
  },
});

export default BlindList;
