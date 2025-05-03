import { memo, useReducer } from 'react';

import { motion } from 'motion/react';

import { RetryIcon } from '@/assets/icons/system';
import { UiComponent } from '@/components';
import { getArrivalStatusText, isSubwayNeedAnimation, motions } from '@/constants';
import { useFetchTrainInfo } from '@/services/subway';
import { useFlow } from '@/stackflow';
import { fade } from '@/styles';
import { CurrentTrainArrivalType, SubwayLineType, UpDownType, WithSubwayStationId } from '@/types';

import * as S from './TrainRealTimes.styled';

import TrainArrivals from '../trainArrivals/TrainArrivals.component';
import SubwayUpDownFilter from '../upDownFilter/UpDownFilter.component';

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

  const [sort, handleSort] = useReducer(
    prev => (prev === UpDownType.UP ? UpDownType.DOWN : UpDownType.UP),
    UpDownType.UP,
  );

  const filterdStationsData = {
    ...data,
    trainRealTimes: data?.trainRealTimes?.filter(item => item.upDownType === sort),
  };
  const isServiceTerminated = filterdStationsData?.trainRealTimes?.length === 0;
  const currentTrain = filterdStationsData?.trainRealTimes?.[0];

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
            isServiceTerminated={isServiceTerminated}
            currentArrivalTime={currentTrain?.currentArrivalTime}
            currentTrainArrivalCode={currentTrain?.currentTrainArrivalCode}
            destinationStationDirection={currentTrain?.destinationStationDirection}
            sort={sort}
            onRefetch={refetch}
            handleSort={handleSort}
          />
        </div>

        <div css={S.listWrap}>
          {isFetching ? (
            <div css={{ minHeight: '16.04px' }}></div>
          ) : isError ? (
            <div>일시적인 오류</div>
          ) : (
            (filterdStationsData?.trainRealTimes || []).length > 0 && (
              <TrainArrivals trainRealTimes={filterdStationsData?.trainRealTimes || []} />
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
  sort: UpDownType;
  isError: boolean;
  isFetching: boolean;
  currentArrivalTime?: number;
  isServiceTerminated: boolean;
  destinationStationDirection?: string;
  currentTrainArrivalCode?: CurrentTrainArrivalType;
  onRefetch: () => void;
  handleSort: () => void;
}

const TrainArrivalStatus = memo(
  ({
    sort,
    isError,
    isFetching,
    isServiceTerminated,
    currentTrainArrivalCode,
    destinationStationDirection = '',
    onRefetch,
    handleSort,
  }: TrainArrivalStatusProps) => {
    return (
      <motion.div
        exit="exit"
        animate="animate"
        initial="initial"
        css={S.arrivalInfoLabel}
        variants={motions.fadeIn(0.3)}
      >
        <div css={{ display: 'flex', alignItems: 'center' }}>
          <b
            css={{
              animation: isSubwayNeedAnimation(currentTrainArrivalCode)
                ? `${fade} 2s infinite ease-in-out`
                : 'none',
            }}
          >
            {isFetching && <UiComponent.SpinnerIcon css={S.loading} />}
            {!isFetching &&
              getArrivalStatusText(isError, isServiceTerminated, currentTrainArrivalCode)}
          </b>
          <span>{isError || isFetching ? '' : destinationStationDirection}</span>
        </div>
        <div css={S.upDown}>
          <SubwayUpDownFilter sort={sort} handleSort={handleSort} />
          <div />
          <RefreshButton onRefresh={onRefetch} />
        </div>
      </motion.div>
    );
  },
);

interface RefreshButtonProps {
  onRefresh: () => void;
}

const RefreshButton = ({ onRefresh }: RefreshButtonProps) => {
  return (
    <button css={S.refetchBtnCss} onClick={onRefresh} aria-label="새로고침">
      <RetryIcon />
    </button>
  );
};

TrainArrivalStatus.displayName = 'TrainArrivalStatus';

export default memo(TrainRealTimes);
