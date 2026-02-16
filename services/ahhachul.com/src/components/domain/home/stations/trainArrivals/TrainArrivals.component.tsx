import { memo, useEffect, useState } from 'react';

import { motion } from 'motion/react';

import { formatSubwayArrivalTime, getRandomNumber } from '@ahhachul/utils';

import { motions } from '@/constants';
import type { ITrain } from '@/types';

import * as S from './TrainArrivals.styled';

interface TrainArrivalTimesProps {
  trainRealTimes: ITrain[];
}

const TrainArrivals = ({ trainRealTimes }: TrainArrivalTimesProps) => {
  const [trainTimers, setTrainTimers] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const initialTimers: { [key: string]: number } = {};
    trainRealTimes.forEach(train => {
      initialTimers[`train_${train.trainNum}`] =
        train.currentArrivalTime * 60 - getRandomNumber(1, 60);
    });
    setTrainTimers(initialTimers);
  }, [trainRealTimes]);

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
    return (
      <li>
        <b>{train.destinationStationDirection}</b>
        <span>
          {formatSubwayArrivalTime(remainingSeconds, {
            arrivalThresholdSeconds: 60,
            arrivalText: '곧 도착',
          })}
        </span>
      </li>
    );
  },
);

TrainCard.displayName = 'TrainCard';

export default TrainArrivals;
