import React from 'react';
import { motion } from 'framer-motion';
import { withSuspense } from '@ahhachul/react-hooks-utility';
import { useGetTrainInfo } from 'features/subway-trains/api/time-info';
import { animateVariants } from 'shared/lib/config/animation/framer-motion';
import { WithSubwayLineId } from 'features/subway-lines';
import { WithSubwayStationId } from 'features/subway-stations';
import { ReFetchIcon } from 'shared/static/icons/re-fetch';
import { TrainArrivalTimes } from './TrainArrivalTimes';
import TrainCongestion from './TrainCongestion';
import { trainArrivalCode } from '../lib/train-arrival-code';
import * as styles from './TrainRealTimes.css';
import InfoIcon from 'shared/static/icons/info';

interface TrainRealTimesProps extends WithSubwayLineId, WithSubwayStationId {}
const TrainRealTimes = ({ stationId, subwayLineId }: TrainRealTimesProps) => {
  const {
    data: { trainRealTimes },
  } = useGetTrainInfo({
    stationId,
    subwayLineId,
  });
  let {
    trainNum,
    nextStationDirection,
    currentTrainArrivalCode,
    destinationStationDirection,
  } = trainRealTimes[0];

  return (
    <div css={styles.trainRealTimes}>
      <div css={styles.inner}>
        <div css={styles.thickBorder(subwayLineId)}>
          <div css={styles.stationName}>건대입구</div>
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={animateVariants}
            css={styles.trainDirection}
          >
            {nextStationDirection}
          </motion.div>
        </div>
        <div css={styles.trainInfos}>
          <div css={styles.currentTrainArrivalInfo}>
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={animateVariants}
              css={styles.arrivalInfoLabel}
            >
              <b>{trainArrivalCode[currentTrainArrivalCode]}</b>
              <span>{destinationStationDirection}</span>
              <button css={styles.refetchBtnCss(false)}>
                <ReFetchIcon />
              </button>
            </motion.div>
          </div>
          <div css={styles.paintingTrain}>
            <div>
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={animateVariants}
              >
                전동차 {trainNum}
              </motion.div>
              <div css={styles.congestionHelper}>
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
            <TrainCongestion trainNo={trainNum} subwayLineId={subwayLineId} />
          </div>
          <TrainArrivalTimes trainRealTimes={trainRealTimes} />
          <button css={styles.button}>전체 시간표</button>
        </div>
      </div>
    </div>
  );
};

export default withSuspense(TrainRealTimes, {
  fallback: <div css={styles.trainRealTimes} />,
});
