import { motion } from 'motion/react';

import { motions } from '@/constants';
import type { ITrain } from '@/types';

import * as S from './TrainArrivals.styled';

interface TrainArrivalTimesProps {
  trainRealTimes?: ITrain[];
}

const TrainArrivals = ({ trainRealTimes }: TrainArrivalTimesProps) => {
  return (
    <div css={S.listWrap}>
      <motion.ul
        initial="initial"
        animate="animate"
        exit="exit"
        css={S.arrivalList}
        variants={motions.fadeInAndUp(0.3)}
      >
        {trainRealTimes?.map(item => (
          <li key={item.trainNum}>
            <b>{item.trainNum}</b>
            <span>5분33초</span>
          </li>
        ))}
      </motion.ul>
    </div>
  );
};

export default TrainArrivals;
