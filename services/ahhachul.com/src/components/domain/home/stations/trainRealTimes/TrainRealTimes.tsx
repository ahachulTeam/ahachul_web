import { memo, useCallback, useEffect, useState } from 'react';

import { motion } from 'motion/react';

import { RetryIcon } from '@/assets/icons/system';
import { motions, trainArrivalCodeMap } from '@/constants';
import { useFetchTrainInfo } from '@/services/subway';
import { useFlow } from '@/stackflow';
import { fade } from '@/styles';
import { WithSubwayStationId } from '@/types';

import * as S from './TrainRealTimes.styled';

import TrainArrivals from '../trainArrivals/TrainArrivals';

interface TrainArrivalStatusProps {
  currentArrivalTime?: number;
  currentTrainArrivalCode?: string;
  isError?: boolean;
  destinationStationDirection?: string;
  onRefetch?: () => void;
}

const TrainArrivalStatus = memo(
  ({
    currentTrainArrivalCode,
    currentArrivalTime = 0,
    isError = false,
    destinationStationDirection = '',
    onRefetch,
  }: TrainArrivalStatusProps) => {
    const [remainingSeconds, setRemainingSeconds] = useState<number>(currentArrivalTime * 60);

    useEffect(() => {
      if (isError || currentTrainArrivalCode !== 'RUNNING' || remainingSeconds <= 0) return;

      const timer = setInterval(() => {
        setRemainingSeconds(prev => {
          if (prev <= 0) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }, [currentTrainArrivalCode, remainingSeconds, isError]);

    const formatTime = useCallback((seconds: number) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;

      if (remainingSeconds === 0) {
        return `${minutes}분`;
      }

      return `${minutes}분 ${remainingSeconds}초`;
    }, []);

    const needsAnimation = ['ENTER', 'ARRIVE', 'BEFORE_STATION_DEPARTURE'].includes(
      currentTrainArrivalCode || '',
    );

    const arrivalText = isError
      ? '-'
      : currentTrainArrivalCode === 'RUNNING'
        ? formatTime(remainingSeconds)
        : currentTrainArrivalCode
          ? trainArrivalCodeMap[currentTrainArrivalCode as keyof typeof trainArrivalCodeMap] || ''
          : '운행 종료';

    return (
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={motions.fadeIn(0.3)}
        css={S.arrivalInfoLabel}
      >
        <b
          css={{
            animation: needsAnimation ? `${fade} 2s infinite ease-in-out` : 'none',
          }}
        >
          {arrivalText}
        </b>
        <span>{isError ? '' : destinationStationDirection}</span>
        {onRefetch && <RefreshButton onRefresh={onRefetch} />}
      </motion.div>
    );
  },
);

TrainArrivalStatus.displayName = 'TrainArrivalStatus';

interface RefreshButtonProps {
  onRefresh: () => void;
}

const RefreshButton = ({ onRefresh }: RefreshButtonProps) => {
  const [isRotating, setIsRotating] = useState(false);

  const handleClick = useCallback(() => {
    if (isRotating) return;

    setIsRotating(true);

    onRefresh();

    setTimeout(() => {
      setIsRotating(false);
    }, 1000);
  }, [isRotating, onRefresh]);

  return (
    <button css={S.refetchBtnCss(isRotating)} onClick={handleClick} aria-label="새로고침">
      <RetryIcon />
    </button>
  );
};

interface TrainRealTimesProps extends WithSubwayStationId {
  stationName: string;
  subwayLineId: number;
  prefetchOtherLines: () => void;
}

const TrainRealTimes = ({
  stationName,
  stationId,
  subwayLineId,
  prefetchOtherLines,
}: TrainRealTimesProps) => {
  const { push } = useFlow();
  const { data, isLoading, isError, refetch } = useFetchTrainInfo(
    {
      stationId,
      subwayLineId,
    },
    prefetchOtherLines,
  );

  const trainRealTimes = data?.trainRealTimes || [];
  const firstTrain = trainRealTimes[0] || {};

  const {
    nextStationDirection = '',
    currentTrainArrivalCode = '',
    destinationStationDirection = '',
    currentArrivalTime = 0,
  } = firstTrain;

  const handleRefetch = useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <div css={S.inner}>
      <div css={S.thickBorder(subwayLineId)}>
        <div css={S.stationName(subwayLineId)}>{stationName}</div>
        <span>{nextStationDirection?.replace('방면', ' 방면')}</span>
      </div>
      <div css={S.trainInfos}>
        <div css={S.currentTrainArrivalInfo}>
          <TrainArrivalStatus
            currentArrivalTime={currentArrivalTime}
            currentTrainArrivalCode={currentTrainArrivalCode}
            isError={isError}
            destinationStationDirection={destinationStationDirection}
            onRefetch={handleRefetch}
          />
        </div>

        <div css={S.listWrap}>
          {isLoading ? (
            <div>로딩 중...</div>
          ) : isError ? (
            <div>정보를 불러오는데 실패했습니다.</div>
          ) : (
            trainRealTimes.length > 0 && <TrainArrivals trainRealTimes={trainRealTimes} />
          )}
        </div>
        <div css={S.buttonWrap}>
          <button css={S.button} onClick={() => push('SubwayTimelinePage', {})}>
            전체 시간표
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(TrainRealTimes);
