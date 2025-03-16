import { memo, useCallback, useEffect, useState } from 'react';

import { motion } from 'motion/react';

import { motions } from '@/constants';
import type { ITrain } from '@/types';

import * as S from './TrainArrivals.styled';

interface TrainArrivalTimesProps {
  trainRealTimes: ITrain[];
}

const TrainArrivals = ({ trainRealTimes }: TrainArrivalTimesProps) => {
  const [trainTimers, setTrainTimers] = useState<{ [key: string]: number }>(() => {
    const initialTimers: { [key: string]: number } = {};
    trainRealTimes.forEach((train, index) => {
      initialTimers[`train-${index}`] = train.currentArrivalTime * 60;
    });
    return initialTimers;
  });

  const needsTimer = Object.values(trainTimers).some(time => time > 0);

  useEffect(() => {
    if (!needsTimer) return;

    const timer = setInterval(() => {
      setTrainTimers(prev => {
        const updated = { ...prev };
        let changed = false;

        Object.keys(updated).forEach(key => {
          if (updated[key] > 0) {
            updated[key] -= 1;
            changed = true;
          }
        });

        return changed ? updated : prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [needsTimer]);

  return (
    <motion.ul
      initial="initial"
      animate="animate"
      exit="exit"
      css={S.arrivalList}
      variants={motions.fadeIn(0.3)}
    >
      {trainRealTimes?.map((train, idx) => (
        <TrainCard
          key={`train-${idx}`}
          train={train}
          remainingSeconds={trainTimers[`train-${idx}`]}
        />
      ))}
    </motion.ul>
  );
};

const TrainCard = memo(
  ({ train, remainingSeconds }: { train: ITrain; remainingSeconds: number }) => {
    const formatTime = useCallback((seconds: number) => {
      if (seconds < 60) {
        return '곧 도착';
      }

      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;

      if (remainingSeconds === 0) {
        return `${minutes}분`;
      }

      return `${minutes}분 ${remainingSeconds}초`;
    }, []);

    return (
      <li>
        <b>{train.destinationStationDirection}</b>
        <span> {formatTime(remainingSeconds)}</span>
      </li>
    );
  },
);

TrainCard.displayName = 'TrainCard';

export default TrainArrivals;
