import React from 'react';

import { wrap, ticketWrap } from './style';
import { AnimatePresence, motion } from 'framer-motion';
import { defaultFadeInVariants } from 'data/motion';
import { useAppSelector } from 'stores';
import { css, CSSObject } from '@emotion/react';
import styled from '@emotion/styled';
import Skeleton from 'react-loading-skeleton';
import { f } from 'styles';
import { useGetBlindList } from 'queries/blindDate/useGetBlindList';

const BlindList = () => {
  const { activeView } = useAppSelector((state) => state.blindDate);

  const { data, isLoading } = useGetBlindList();
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
          {/* <article>

          </article>
          <article css={headTitle}>4/7 오늘의 인연 카드가 도착했어요</article> */}
          <div css={ticketWrap}>
            <DateWrap>
              <DateTypeLabel>소개팅</DateTypeLabel>
              <ContentArea>
                <div css={{ marginBottom: '8px' }}>
                  <AnimatePresence mode="wait">
                    {!isLoading ? (
                      <TopInfo variants={defaultFadeInVariants} initial="initial" animate="animate" exit="exit">
                        <b>24살</b>
                        <span>대학생</span>
                      </TopInfo>
                    ) : (
                      <TopInfo variants={defaultFadeInVariants} initial="initial" animate="animate" exit="exit">
                        <Skeleton
                          width="64px"
                          borderRadius={12}
                          baseColor="#2e2e2e"
                          highlightColor="rgba(255, 255, 255, 0.24)"
                        />
                      </TopInfo>
                    )}
                  </AnimatePresence>
                </div>
                <CardWrap>
                  <CardTopInfo>
                    <AnimatePresence mode="wait">
                      {!isLoading ? (
                        <motion.span variants={defaultFadeInVariants} initial="initial" animate="animate" exit="exit">
                          #연세대 #경영학과
                        </motion.span>
                      ) : (
                        <span>
                          <Skeleton
                            width="84px"
                            borderRadius={12}
                            baseColor="#2e2e2e"
                            highlightColor="rgba(255, 255, 255, 0.24)"
                          />
                        </span>
                      )}
                    </AnimatePresence>
                    <div>
                      <span>친구</span>
                      <ul>
                        <li />
                        <li />
                        <li />
                        <li />
                      </ul>
                      <span>연인</span>
                    </div>
                  </CardTopInfo>
                  <div css={{ position: 'relative', minHeight: '31px' }}>
                    {!isLoading ? (
                      <div css={characterWrap}>
                        <div />
                      </div>
                    ) : (
                      <Skeleton
                        circle
                        width="58px"
                        height="58px"
                        borderRadius="50%"
                        baseColor="#2e2e2e"
                        highlightColor="rgba(255, 255, 255, 0.24)"
                      />
                    )}
                  </div>
                  <button css={allTrainsBtnCss}>카드 열어보기</button>
                </CardWrap>
                <div css={{ position: 'relative', margin: '20px 0 0' }}>
                  <AnimatePresence mode="wait">
                    <BottomInfo variants={defaultFadeInVariants} initial="initial" animate="animate" exit="exit">
                      <DateTypeLabel css={{ borderColor: '#FF5454' }}>미팅</DateTypeLabel>
                      <div css={{ marginBottom: '8px' }}>
                        <AnimatePresence mode="wait">
                          <TopInfo variants={defaultFadeInVariants} initial="initial" animate="animate" exit="exit">
                            <>
                              {!isLoading ? (
                                <>
                                  <b>2대2</b>
                                  <span>직장인</span>
                                </>
                              ) : (
                                <Skeleton
                                  width="64px"
                                  borderRadius={12}
                                  baseColor="#2e2e2e"
                                  highlightColor="rgba(255, 255, 255, 0.24)"
                                />
                              )}
                            </>
                          </TopInfo>
                        </AnimatePresence>
                      </div>
                      <CardWrap>
                        <CardTopInfo>
                          <AnimatePresence mode="wait">
                            {!isLoading ? (
                              <motion.span
                                variants={defaultFadeInVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                              >
                                #건대 #성수
                              </motion.span>
                            ) : (
                              <span>
                                <Skeleton
                                  width="84px"
                                  height="13.8px"
                                  borderRadius={12}
                                  baseColor="#2e2e2e"
                                  highlightColor="rgba(255, 255, 255, 0.24)"
                                />
                              </span>
                            )}
                          </AnimatePresence>
                          <div>
                            <span>신나는</span>
                            <ul>
                              <li />
                              <li />
                              <li />
                              <li />
                            </ul>
                            <span>설레는</span>
                          </div>
                        </CardTopInfo>
                        <div css={{ position: 'relative', minHeight: '31px' }}>
                          {!isLoading ? (
                            <div css={characterWrap}>
                              <div />
                              <div />
                            </div>
                          ) : (
                            <Skeleton
                              circle
                              width="58px"
                              height="58px"
                              borderRadius="50%"
                              baseColor="#2e2e2e"
                              highlightColor="rgba(255, 255, 255, 0.24)"
                            />
                          )}
                        </div>
                        <button css={[allTrainsBtnCss, { backgroundColor: '#FF5454' }]}>카드 열어보기</button>
                      </CardWrap>
                    </BottomInfo>
                  </AnimatePresence>
                </div>
              </ContentArea>
            </DateWrap>
          </div>
        </motion.main>
      )}
    </AnimatePresence>
  );
};

// const headTitle = ({
//   color: {
//     scale: { gray },
//   },
//   typography: { fontSize, fontWeight },
// }: Theme) => ({
//   marginBottom: '16px',
//   fontSize: fontSize[16],
//   fontWeight: fontWeight[600],
//   color: gray[1000],
//   paddingLeft: '20px',
// });

const DateWrap = styled.div`
  position: relative;
  width: 100%;
  min-height: 180px;
  border-radius: 20px;
  border: 1px solid #9da5b6;
`;

const DateTypeLabel = styled.span`
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  border: 3px solid #4e41db;
  border-radius: 21px;
  padding: 0 32px;
  background-color: #ffffff;
  width: max-content;
  margin: 0 auto;
  margin-top: 20px;
`;

const ContentArea = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 20px 20px;
`;

const CardWrap = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
`;

const CardTopInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 28px;

  & > span {
    font-size: 12px;
    color: #b4b4b4;
  }

  & > div {
    display: flex;
    align-items: center;

    & > ul {
      display: grid;
      min-width: 40px;
      grid-template-columns: repeat(auto-fit, minmax(10px, 1fr));
      gap: 2px;
      margin: 0 4px;

      & > li {
        width: 10px;
        height: 10px;
        border-radius: 50%;

        &:first-of-type {
          background-color: rgba(255, 255, 255, 0.1);
        }

        &:nth-of-type(2) {
          background-color: rgba(255, 255, 255, 0.16);
        }

        &:nth-of-type(3) {
          background-color: rgba(255, 255, 255, 0.46);
        }

        &:last-of-type {
          background-color: rgba(255, 255, 255, 1);
        }
      }
    }

    & > span {
      font-size: 12px;
      color: #ffffff;
    }

    & > button {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      color: #ffffff;
      width: 10px;
      height: 10px;
      padding: 2px;
      border-radius: 50%;
      position: relative;
      top: 1px;

      color: #ffffff;
      background-color: #000000;
    }
  }
`;

const TopInfo = styled(motion.div)`
  display: flex;
  align-items: center;
  position: relative;
  padding-top: 20px;

  & > b {
    font-size: 16px;
    font-weight: bold;
    margin-right: 6px;
    color: #ffffff;
  }

  & > span {
    font-size: 14px;
    color: #ffffff;
  }
`;

const BottomInfo = styled(motion.ul)`
  width: 100%;
  justify-items: center;
  border-top: 1px solid #9da5b6;
`;

const allTrainsBtnCss = css`
  font-size: 14px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  width: 80%;
  margin: 0 auto;
  height: 44px;
  border-radius: 24px;
  margin-top: 28px;
  background-color: #4e41db;
`;

const characterWrap: [CSSObject, CSSObject[], CSSObject] = [
  f.posRel,
  f.flexAlignCenter,
  {
    '& > div': {
      marginRight: '12px',
      borderRadius: '50%',
      border: '3px solid #9da5b6',
      width: '58px',
      height: '58px',
    },

    '& > span': {
      position: 'absolute',
      right: 0,
      fontSize: '12px',
      color: '#ffffff',
    },
  },
];

export default BlindList;
