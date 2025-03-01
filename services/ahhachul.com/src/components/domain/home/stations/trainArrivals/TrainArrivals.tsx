import { motion } from 'motion/react';

import { motions } from '@/constants';
import type { ITrain } from '@/types';

import * as S from './TrainArrivals.styled';

interface TrainArrivalTimesProps {
  trainRealTimes?: ITrain[];
}

const TrainArrivals = ({ trainRealTimes }: TrainArrivalTimesProps) => {
  return (
    <motion.ul
      initial="initial"
      animate="animate"
      exit="exit"
      css={S.arrivalList}
      variants={motions.fadeIn(0.3)}
    >
      {trainRealTimes?.map((item, idx) => (
        <li key={`${item.trainNum}_${idx}`}>
          <b>{item.destinationStationDirection}</b>
          <span>5분33초</span>
        </li>
      ))}
    </motion.ul>
  );
};

export default TrainArrivals;
