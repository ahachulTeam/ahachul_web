import React from 'react';
import { motion } from 'framer-motion';
import { useGetTrainInfo } from 'features/subway-trains/api/time-info';
import { animateVariants } from 'shared/lib/config/animation/framer-motion';
import { WithSubwayStationId } from 'features/subway-stations';
import { ReFetchIcon } from 'shared/static/icons/re-fetch';
import InfoIcon from 'shared/static/icons/info';
import TrainCongestion from './TrainCongestion';
import { TrainArrivalTimes } from './TrainArrivalTimes';
import { trainArrivalCode } from '../lib/train-arrival-code';
import * as styles from './TrainRealTimes.css';

interface TrainRealTimesProps extends WithSubwayStationId {
  name: string;
  parentLineId: number;
}
const TrainRealTimes = ({
  name,
  stationId,
  parentLineId,
}: TrainRealTimesProps) => {
  const {
    data: { trainRealTimes },
  } = useGetTrainInfo({
    stationId,
    subwayLineId: parentLineId,
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
        <div css={styles.thickBorder(parentLineId)}>
          <div css={styles.stationName(parentLineId)}>{name}</div>
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={animateVariants(0.3)}
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
              variants={animateVariants(0.3)}
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
                variants={animateVariants(0.3)}
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
            <Suspense fallback={<BaseSkeleton width="100%" height="31px" radius={3} css={styles.skeleton} />}>
              <TrainCongestion trainNo={trainNum} subwayLineId={parentLineId} />
            </Suspense>
            </div>
          </div>
          <TrainArrivalTimes trainRealTimes={trainRealTimes} />
          <button css={styles.button}>전체 시간표</button>
        </div>
      </div>
    </div>
  );
};

export default TrainRealTimes
