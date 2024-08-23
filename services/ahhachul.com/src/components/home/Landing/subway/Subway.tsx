import React, { Suspense, useEffect, useReducer, useState } from 'react';
import { css, CSSObject, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import Skeleton from 'react-loading-skeleton';

import { filterWrap, sectionWrap, wrap } from './style';
import TrainPainting from './train/TrainPainting';
import IconFetch from 'shared/static/icons/system/IconFetch';
import IconInfo from 'shared/static/icons/system/IconInfo';
import { useFlow } from 'stackflow';
import IconChevron from 'shared/static/icons/system/IconChevron';
import { ErrorComponent } from 'components';
import { useGetTrainsRealTimeInfo } from 'queries/train/useGetTrainsRealTimeInfo';
import { exportHexColorWidthLineName, formatCurrentTrainArrivalTypeToKo } from 'utils/export';
import { AnimatePresence, motion } from 'framer-motion';
import TrainError from './train/TrainError';
import { defaultFadeInVariants } from 'shared/data/motion';
import Timer from './Timer';
import { useFlowStepOnSubwaySection } from './flow';
import SelectSubwayLine from './SelectSubwayLine';

const Subway = () => {
  const { toSubwayMap, toSubwayTimeTable } = useFlowStepOnSubwaySection();
  // user가 선택한 현재 역의 해당하는 호선을 뜻한다.
  const [subwayLines, handleSubwayLines] = useReducer((newSubwayLines) => newSubwayLines, ['2', '7']);

  // 건대입구 stationId 내맘대로 정함
  const initialSelectedData = {
    stationId: '123',
    subwayLineId: subwayLines[0],
  };

  const [selectedIdx, setSelectedIdx] = useState(0);

  const handleSelectedTrainIndex = (idx: number) => () => {
    setSelectedIdx(idx);
  };

  const [refetchBtnClicked, setRefetchBtnClicked] = useState(false);

  const { data, isSuccess, isLoading, refetch } = useGetTrainsRealTimeInfo(initialSelectedData);

  console.log('data:', data);

  useEffect(() => {
    if (isSuccess || subwayLines) {
      setSelectedIdx(0);
    }
  }, [isSuccess, subwayLines]);

  return (
    <section css={sectionWrap}>
      <SelectSubwayLine subwayLineIds={subwayLines} changeCallback={handleSubwayLines} toSubwayMap={toSubwayMap} />
      <div css={wrap}>
        <SubwayInfo>
          {/* ThickBorderArea */}
          <ContentArea>
            <button css={allTrainsBtnCss} onClick={toSubwayTimeTable}>
              전체 시간표
            </button>
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
