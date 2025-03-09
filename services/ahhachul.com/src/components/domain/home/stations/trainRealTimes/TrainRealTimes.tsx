import { motion } from 'motion/react';

import { InfoIcon, RetryIcon } from '@/assets/icons/system';
import { motions, trainArrivalCodeMap } from '@/constants';
import { useFetchTrainInfo } from '@/services/subway';
import { WithSubwayStationId } from '@/types';

import * as S from './TrainRealTimes.styled';

import TrainAnimation from '../trainAnimation/TrainAnimation.component';
import TrainArrivals from '../trainArrivals/TrainArrivals';

interface TrainRealTimesProps extends WithSubwayStationId {
  stationName: string;
  subwayLineId: number;
}

const TrainRealTimes = ({ stationName, stationId, subwayLineId }: TrainRealTimesProps) => {
  const { data, isLoading, isError } = useFetchTrainInfo({
    stationId,
    subwayLineId,
  });

  const trainNum = data?.trainRealTimes?.[0]?.trainNum;
  const nextStationDirection = data?.trainRealTimes?.[0]?.nextStationDirection;
  const currentTrainArrivalCode = data?.trainRealTimes?.[0]?.currentTrainArrivalCode;
  const destinationStationDirection = data?.trainRealTimes?.[0]?.destinationStationDirection;

  return (
    <div css={S.trainRealTimes}>
      <div css={S.inner}>
        <div css={S.thickBorder(subwayLineId)}>
          <div css={S.stationName(subwayLineId)}>{stationName}</div>
          <span>{nextStationDirection?.replace('방면', ' 방면')}</span>
        </div>
        <div css={S.trainInfos}>
          <div css={S.currentTrainArrivalInfo}>
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={motions.fadeIn(0.3)}
              css={S.arrivalInfoLabel}
            >
              <b>
                {isError
                  ? '-'
                  : trainArrivalCodeMap[
                      currentTrainArrivalCode as keyof typeof trainArrivalCodeMap
                    ]}
              </b>
              <span>{isError ? '' : destinationStationDirection}</span>
              <button css={S.refetchBtnCss(false)}>
                <RetryIcon />
              </button>
            </motion.div>
          </div>
          <div css={S.paintingTrain}>
            <div>
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={motions.fadeIn(0.3)}
              >
                {isError ? '-' : `전동차 ${trainNum ?? ''}`}
              </motion.div>
              <div css={S.congestionHelper}>
                <span>여유</span>
                <ul>
                  <li />
                  <li />
                  <li />
                  <li />
                </ul>
                <span>혼잡</span>
                <InfoIcon />
              </div>
            </div>
            <TrainAnimation />
          </div>

          <div css={S.listWrap}>
            {isLoading ? (
              ''
            ) : isError ? (
              'error'
            ) : (
              <TrainArrivals trainRealTimes={data?.trainRealTimes} />
            )}
          </div>
          <button css={S.button}>전체 시간표</button>
        </div>
      </div>
    </div>
  );
};

export default TrainRealTimes;
