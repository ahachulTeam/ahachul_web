import { memo, useCallback, useEffect, useState } from 'react';

import { motion } from 'motion/react';

import { RetryIcon } from '@/assets/icons/system';
import { getArrivalStatusText, isSubwayNeedAnimation, motions } from '@/constants';
import { useFetchTrainInfo } from '@/services/subway';
import { useFlow } from '@/stackflow';
import { fade } from '@/styles';
import { CurrentTrainArrivalType, SubwayLineType, WithSubwayStationId } from '@/types';
import { getRandomNumber1to60 } from '@/utils';

import * as S from './TrainRealTimes.styled';

import TrainArrivals from '../trainArrivals/TrainArrivals';

interface TrainRealTimesProps extends WithSubwayStationId {
  stationName: string;
  subwayLineId: SubwayLineType;
  prefetchOtherLines: () => void;
}

const TrainRealTimes = ({
  stationId,
  stationName,
  subwayLineId,
  prefetchOtherLines,
}: TrainRealTimesProps) => {
  const { push } = useFlow();
  const { data, isFetching, isError, refetch } = useFetchTrainInfo({
    stationId,
    subwayLineId,
    prefetchOtherLines,
  });

  const currentTrain = data?.trainRealTimes?.[0];

  return (
    <div css={S.inner}>
      <div css={S.thickBorder(subwayLineId)}>
        <div css={S.stationName(subwayLineId)}>{stationName}</div>
        <span>{currentTrain?.nextStationDirection?.replace('방면', ' 방면')}</span>
      </div>
      <div css={S.trainInfos}>
        <div css={S.currentTrainArrivalInfo}>
          <TrainArrivalStatus
            isError={isError}
            currentArrivalTime={currentTrain?.currentArrivalTime}
            currentTrainArrivalCode={currentTrain?.currentTrainArrivalCode}
            destinationStationDirection={currentTrain?.destinationStationDirection}
            onRefetch={refetch}
          />
        </div>

        <div css={S.listWrap}>
          {isFetching ? (
            <div></div>
          ) : isError ? (
            <div>일시적인 오류</div>
          ) : (
            (data?.trainRealTimes || []).length > 0 && (
              <TrainArrivals trainRealTimes={data?.trainRealTimes || []} />
            )
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

interface TrainArrivalStatusProps {
  isError?: boolean;
  currentArrivalTime?: number;
  destinationStationDirection?: string;
  currentTrainArrivalCode?: CurrentTrainArrivalType;
  onRefetch?: () => void;
}

const TrainArrivalStatus = memo(
  ({
    isError = false,
    currentArrivalTime = 1,
    currentTrainArrivalCode,
    destinationStationDirection = '',
    onRefetch,
  }: TrainArrivalStatusProps) => {
    const [remainingSeconds, setRemainingSeconds] = useState<number>(
      currentArrivalTime * getRandomNumber1to60(),
    );

    useEffect(() => {
      if (isError) return;
      if (currentTrainArrivalCode !== CurrentTrainArrivalType.RUNNING) return;

      const timerId = setInterval(() => {
        setRemainingSeconds(prev => {
          if (prev <= 0) {
            clearInterval(timerId);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timerId);
    }, [isError, currentTrainArrivalCode]);

    return (
      <motion.div
        exit="exit"
        animate="animate"
        initial="initial"
        css={S.arrivalInfoLabel}
        variants={motions.fadeIn(0.3)}
      >
        <b
          css={{
            animation: isSubwayNeedAnimation(currentTrainArrivalCode)
              ? `${fade} 2s infinite ease-in-out`
              : 'none',
          }}
        >
          {getArrivalStatusText(isError, remainingSeconds, currentTrainArrivalCode)}
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

export default memo(TrainRealTimes);
