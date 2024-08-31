import { motion } from 'framer-motion';
import { ITrain } from 'features/subway-trains';
import { animateVariants } from 'shared/lib/config/animation/framer-motion';
import * as styles from './TrainArrivalTimes.css';

interface TrainArrivalTimesProps {
  trainRealTimes: Array<ITrain>;
}

export const TrainArrivalTimes = ({
  trainRealTimes,
}: TrainArrivalTimesProps) => {
  return (
    <div css={styles.listWrap}>
      <motion.ul
        initial="initial"
        animate="animate"
        exit="exit"
        css={styles.arrivalList}
        variants={animateVariants}
      >
        {trainRealTimes.map((item) => (
          <li key={item.trainNum}>
            <b>{item.trainNum}</b>
            <span>5분33초</span>
          </li>
        ))}
      </motion.ul>
    </div>
  );
};
