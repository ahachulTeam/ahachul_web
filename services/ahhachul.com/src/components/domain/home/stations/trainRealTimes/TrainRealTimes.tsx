import { memo, useCallback, useState } from 'react';

import { motion } from 'motion/react';

import { RetryIcon } from '@/assets/icons/system';
import { UiComponent } from '@/components';
import { getArrivalStatusText, isSubwayNeedAnimation, motions } from '@/constants';
import { useFetchTrainInfo } from '@/services/subway';
import { useFlow } from '@/stackflow';
import { fade } from '@/styles';
import { CurrentTrainArrivalType, SubwayLineType, WithSubwayStationId } from '@/types';

import * as S from './TrainRealTimes.styled';

import TrainArrivals from '../trainArrivals/TrainArrivals';

interface TrainRealTimesProps extends WithSubwayStationId {
  stationName: string;
  subwayLineId: SubwayLineType;
}

const TrainRealTimes = ({ stationId, stationName, subwayLineId }: TrainRealTimesProps) => {
  const { push } = useFlow();
  const { data, isFetching, isError, refetch } = useFetchTrainInfo({
    stationId,
    subwayLineId,
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
            isFetching={isFetching}
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
  isError: boolean;
  isFetching: boolean;
  currentArrivalTime?: number;
  destinationStationDirection?: string;
  currentTrainArrivalCode?: CurrentTrainArrivalType;
  onRefetch?: () => void;
}

const TrainArrivalStatus = memo(
  ({
    isError,
    isFetching,
    currentTrainArrivalCode,
    destinationStationDirection = '',
    onRefetch,
  }: TrainArrivalStatusProps) => {
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
          {isFetching && <UiComponent.SpinnerIcon css={S.loading} />}
          {!isFetching && getArrivalStatusText(isError, currentTrainArrivalCode)}
        </b>
        <span>{isError || isFetching ? '' : destinationStationDirection}</span>
        {onRefetch && <RefreshButton onRefresh={onRefetch} />}
      </motion.div>
    );
  },
);

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

TrainArrivalStatus.displayName = 'TrainArrivalStatus';

export default memo(TrainRealTimes);
