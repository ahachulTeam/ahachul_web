import { memo, useEffect, useState } from 'react';

import { motion } from 'motion/react';

import { motions } from '@/constants';
import type { ITrain } from '@/types';
import { getRandomNumber1to60 } from '@/utils';

import * as S from './TrainArrivals.styled';

interface TrainArrivalTimesProps {
  trainRealTimes: ITrain[];
}

const TrainArrivals = ({ trainRealTimes }: TrainArrivalTimesProps) => {
  const [trainTimers, setTrainTimers] = useState<{ [key: string]: number }>(() => {
    const initialTimers: { [key: string]: number } = {};
    trainRealTimes.forEach(train => {
      initialTimers[`train_${train.trainNum}`] = train.currentArrivalTime * getRandomNumber1to60();
    });
    return initialTimers;
  });

  const needTimer = Object.values(trainTimers).some(time => time > 0);

  useEffect(() => {
    if (!needTimer) return;

    const timerId = setInterval(() => {
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

    return () => clearInterval(timerId);
  }, [needTimer]);

  return (
    <motion.ul
      exit="exit"
      animate="animate"
      initial="initial"
      variants={motions.fadeIn(0.3)}
      css={S.arrivalList}
    >
      {trainRealTimes?.map(train => (
        <TrainCard
          train={train}
          key={`train_${train.trainNum}`}
          remainingSeconds={trainTimers[`train_${train.trainNum}`]}
        />
      ))}
    </motion.ul>
  );
};

const TrainCard = memo(
  ({ train, remainingSeconds }: { train: ITrain; remainingSeconds: number }) => {
    console.log('train:', train);

    const formatTime = (seconds: number) => {
      if (!seconds && seconds !== 0) return '알 수 없음';

      if (seconds < 60) {
        return '곧 도착';
      }

      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;

      if (remainingSeconds === 0) {
        return `${minutes}분`;
      }

      return `${minutes}분 ${remainingSeconds}초`;
    };

    return (
      <li>
        <b>{train.destinationStationDirection}</b>
        <span>{formatTime(remainingSeconds)}</span>
      </li>
    );
  },
);

TrainCard.displayName = 'TrainCard';

export default TrainArrivals;
