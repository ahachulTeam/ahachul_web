import React, { Suspense, useEffect, useState } from 'react';
import { css, CSSObject, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { filterWrap, sectionWrap, title, wrap } from './style';
import Train from './train/Train';
import IconFetch from 'static/icons/system/IconFetch';
import IconInfo from 'static/icons/system/IconInfo';
import { useFlow } from 'stackflow';
import IconChevron from 'static/icons/system/IconChevron';
import { ErrorComponent } from 'components';
import { useGetTrainsRealTimeInfo } from 'queries/train/useGetTrainsRealTimeInfo';
import { exportHexColorWidthLineName, formatCurrentTrainArrivalTypeToKo } from 'utils/export';
import { AnimatePresence, motion } from 'framer-motion';
import TrainError from './train/TrainError';
import { defaultFadeInVariants } from 'data/motion';

const Subway = () => {
  const { push } = useFlow();
  const routeToSubwayMap = () => push('SubwayMap', {});
  const routeToSubwayTimeTable = () => push('SubwayTimeTable', {});

  const [subwayLineIds, setSubwayLineIds] = useState(['2', '7']);
  const initialSelectedData = {
    // 건대입구 stationId
    stationId: '121',
    subwayLineId: subwayLineIds[0],
  };

  const [selectedIdx, setSelectedIdx] = useState(0);
  const swapArrayElements = () => {
    let copy = [...subwayLineIds];
    let temp = copy[0];
    copy[0] = copy[1];
    copy[1] = temp;
    setSubwayLineIds(copy);
  };

  const handleSelectedTrainIndex = (idx: number) => () => {
    setSelectedIdx(idx);
  };

  const [refetchBtnClicked, setRefetchBtnClicked] = useState(false);

  const { data, isSuccess, isLoading, refetch } = useGetTrainsRealTimeInfo(initialSelectedData);

  useEffect(() => {
    if (isSuccess || subwayLineIds) {
      setSelectedIdx(0);
    }
  }, [isSuccess, subwayLineIds]);

  return (
    <section css={sectionWrap}>
      <h1 css={title}>
        <b>이효범님,</b>
        현재 <b>열차정보와 혼잡도</b>를 알려드려요!
      </h1>
      <div css={filterWrap}>
        <ul>
          <li>
            <button>{subwayLineIds[0]}</button>
          </li>
          <li
            css={{
              transition: 'background-color 0.4s ease-in-out',
              backgroundColor: exportHexColorWidthLineName(subwayLineIds[1]),
            }}
          >
            <button onClick={() => swapArrayElements()}>{subwayLineIds[1]}</button>
          </li>
        </ul>
        <button onClick={routeToSubwayMap}>
          <span>전체 노선도 보기</span>
          <IconChevron />
        </button>
      </div>
      <div css={wrap}>
        <SubwayInfo>
          <ThickBorderArea
            tabIndex={-1}
            css={{
              transition: 'background-color 0.4s ease-in-out',
              backgroundColor: exportHexColorWidthLineName(subwayLineIds[0]),
            }}
          >
            <StationLabel
              css={{
                transition: 'border-color 0.4s ease-in-out',
                borderColor: exportHexColorWidthLineName(subwayLineIds[0]),
              }}
            >
              건대입구
            </StationLabel>
            <AnimatePresence mode="wait">
              {!isLoading && (
                <DirectionLabel variants={defaultFadeInVariants} initial="initial" animate="animate" exit="exit">
                  {data?.trainRealTimes?.[selectedIdx]?.nextStationDirection}
                </DirectionLabel>
              )}
            </AnimatePresence>
          </ThickBorderArea>
          <ContentArea>
            <div css={{ minHeight: '18.4px', marginBottom: '18px' }}>
              <AnimatePresence mode="wait">
                <TopInfo variants={defaultFadeInVariants} initial="initial" animate="animate" exit="exit">
                  <>
                    {!isLoading ? (
                      <>
                        <b>
                          {formatCurrentTrainArrivalTypeToKo(
                            data?.trainRealTimes?.[selectedIdx]?.currentTrainArrivalCode,
                          )}
                        </b>
                        <span>{data?.trainRealTimes?.[selectedIdx]?.destinationStationDirection}</span>
                        <button
                          onClick={() => {
                            setRefetchBtnClicked(true);
                            refetch();

                            setTimeout(() => {
                              setRefetchBtnClicked(false);
                            }, 1000);
                          }}
                          css={refetchBtnCss(refetchBtnClicked)}
                        >
                          <IconFetch css={{ position: 'relative', top: '1px' }} />
                        </button>
                      </>
                    ) : (
                      <Skeleton
                        width="64px"
                        borderRadius={0}
                        baseColor="#2e2e2e"
                        highlightColor="rgba(255, 255, 255, 0.24)"
                      />
                    )}
                  </>
                </TopInfo>
              </AnimatePresence>
            </div>
            <TrainInfoContainer>
              <TrainInfoTop>
                <AnimatePresence mode="wait">
                  {!isLoading ? (
                    <motion.span variants={defaultFadeInVariants} initial="initial" animate="animate" exit="exit">
                      {data?.trainRealTimes?.[selectedIdx]?.trainNum &&
                        `전동차 ${data?.trainRealTimes?.[selectedIdx]?.trainNum}`}
                    </motion.span>
                  ) : (
                    <span>
                      <Skeleton
                        width="56px"
                        borderRadius={0}
                        baseColor="#2e2e2e"
                        highlightColor="rgba(255, 255, 255, 0.24)"
                      />
                    </span>
                  )}
                </AnimatePresence>
                <div>
                  <span>여유</span>
                  <ul>
                    <li />
                    <li />
                    <li />
                    <li />
                  </ul>
                  <span>혼잡</span>
                  <IconInfo css={{ position: 'relative', top: '1px', marginLeft: '4px' }} />
                </div>
              </TrainInfoTop>
              <div css={{ position: 'relative', minHeight: '31px' }}>
                <ErrorComponent.QueryErrorBoundary fallback={(props) => <TrainError {...props} />}>
                  <Suspense
                    fallback={
                      <Skeleton
                        width="257px"
                        height="24px"
                        borderRadius={0}
                        baseColor="#2e2e2e"
                        highlightColor="rgba(255, 255, 255, 0.24)"
                      />
                    }
                  >
                    {data?.trainRealTimes?.[selectedIdx]?.trainNum ? (
                      <Train trainNo={data?.trainRealTimes?.[selectedIdx]?.trainNum} subwayLineId={subwayLineIds[0]} />
                    ) : (
                      <Skeleton
                        width="217px"
                        height="24px"
                        borderRadius={0}
                        baseColor="#2e2e2e"
                        highlightColor="rgba(255, 255, 255, 0.24)"
                      />
                    )}
                  </Suspense>
                </ErrorComponent.QueryErrorBoundary>
              </div>
            </TrainInfoContainer>
            <div css={{ minHeight: '72.2px', position: 'relative', margin: '72px 0 0' }}>
              <AnimatePresence mode="wait">
                <BottomInfo variants={defaultFadeInVariants} initial="initial" animate="animate" exit="exit">
                  {!isLoading ? (
                    <>
                      {data?.trainRealTimes?.map((item, idx) => (
                        <li key={item.currentArrivalTime} onClick={handleSelectedTrainIndex(idx)}>
                          <b
                            css={{
                              fontWeight:
                                item?.trainNum === data?.trainRealTimes?.[selectedIdx]?.trainNum
                                  ? '700 !important'
                                  : '400',
                            }}
                          >
                            {item.destinationStationDirection}
                          </b>
                          <span
                            css={{
                              fontWeight:
                                item?.trainNum === data?.trainRealTimes?.[selectedIdx]?.trainNum
                                  ? '700 !important'
                                  : '400',
                            }}
                          >
                            {idx === 0 ? '진입' : idx === 1 ? '2분' : idx === 2 ? '7분 37초' : '11분 32초'}
                          </span>
                          {/* <span>{!item.currentArrivalTime ? '진입' : `${item.currentArrivalTime}분전`}</span> */}
                        </li>
                      ))}
                    </>
                  ) : (
                    <>
                      {new Array(4).fill('').map((_, idx) => (
                        <li key={idx}>
                          <Skeleton
                            width="97px"
                            borderRadius={0}
                            baseColor="#2e2e2e"
                            highlightColor="rgba(255, 255, 255, 0.24)"
                          />
                        </li>
                      ))}
                    </>
                  )}
                </BottomInfo>
              </AnimatePresence>
              <button css={allTrainsBtnCss} onClick={routeToSubwayTimeTable}>
                전체 시간표
              </button>
            </div>
          </ContentArea>
        </SubwayInfo>
      </div>
    </section>
  );
};

const SubwayInfo = styled.div`
  position: relative;
  width: 100%;
  min-height: 180px;
  border-radius: 20px;
  background-color: #2e2e2e;
  min-height: 390.586px;
`;

const ThickBorderArea = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 25px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

const StationLabel = styled.span`
  font-size: 16px;
  font-weight: 600;
  position: absolute;
  top: 50%;
  left: 27px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  border: 3px solid #20b154;
  border-radius: 21px;
  padding: 8px 32px;
  background-color: #ffffff;
  transform: translateY(-50%);
`;

const DirectionLabel = styled(motion.span)`
  font-size: 14px;
  font-weight: 600;
  position: absolute;
  top: 50%;
  left: 157px;
  transform: translateY(-50%);
  color: #ffffff;
`;

const ContentArea = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 54px 20px 24px 20px;
`;

const TrainInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
`;

const TrainInfoTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 12px;

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
          background-color: #a2d471;
        }

        &:nth-of-type(2) {
          background-color: #ffc44d;
        }

        &:nth-of-type(3) {
          background-color: #ff884d;
        }

        &:last-of-type {
          background-color: #ee4d4d;
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

  & > b {
    font-size: 16px;
    font-weight: bold;
    margin-right: 6px;
    color: #28b2ff;
  }

  & > span {
    font-size: 14px;
    color: #ffffff;
  }
`;

const BottomInfo = styled(motion.ul)`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center;
  column-gap: 24px;
  row-gap: 12px;
  padding-top: 24px;
  border-top: 1px solid rgba(210, 210, 210, 0.09);

  & > li {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    transition: opacity 0.2s ease;

    &:active {
      opacity: 0.7;
    }

    & > li > b:first-of-type {
      font-weight: bold;
    }

    & > b {
      color: #ffffff;
      font-size: 14px;
    }

    & > span {
      color: #28b2ff;
      font-size: 14px;
    }
  }
`;

const allTrainsBtnCss = css`
  font-size: 16px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  width: 100%;
  height: 44px;
  border-radius: 10px;
  background: #434343;
  margin-top: 28px;
`;

const rotateAni = keyframes`
  0% { transform: translateY(-50%) rotate(0deg); }
  100% { transform: translateY(-50%) rotate(360deg); }
`;

const refetchBtnCss = (isClicked: boolean): CSSObject => ({
  position: 'absolute',
  top: '50%',
  right: 0,
  transform: 'translateY(-50%)',
  animation: isClicked && `${rotateAni} 0.8s forwards`,

  '& > div > svg': {
    width: '18px',
    height: '18px',
  },
});

export default Subway;
