import { type ReactNode, memo, useMemo, useReducer } from 'react';

import { motion } from 'motion/react';

import { RetryIcon } from '@/assets/icons/system';
import { UiComponent } from '@/components';
import { getArrivalStatusText, isSubwayNeedAnimation, motions } from '@/constants';
import { useFetchStationTimesSummary, useFetchTrainInfo } from '@/services/subway';
import { useFlow } from '@/stackflow';
import { fade } from '@/styles';
import {
  CurrentTrainArrivalType,
  StationTimeWeekType,
  SubwayLineType,
  UpDownType,
  WithSubwayStationId,
} from '@/types';

import * as S from './TrainRealTimes.styled';

import TrainArrivals from '../trainArrivals/TrainArrivals.component';
import SubwayUpDownFilter from '../upDownFilter/UpDownFilter.component';

interface TrainRealTimesProps extends WithSubwayStationId {
  stationName: string;
  subwayLineId: SubwayLineType;
}

function resolveStationTimeWeekType(now: Date): StationTimeWeekType {
  const day = now.getDay();

  if (day === 6) {
    return StationTimeWeekType.SATURDAY;
  }

  if (day === 0) {
    return StationTimeWeekType.HOLIDAY;
  }

  return StationTimeWeekType.WEEKDAY;
}

function formatStationTime(time: string | null | undefined): string {
  return time ? time.slice(0, 5) : '--:--';
}

function getUpDownLabel(upDownType: UpDownType): string {
  return upDownType === UpDownType.UP ? '상행' : '하행';
}

const defaultStationTimeSummaries = [
  {
    upDownType: UpDownType.UP,
    firstDepartureTime: null,
    lastDepartureTime: null,
    firstDestinationStationName: null,
    lastDestinationStationName: null,
  },
  {
    upDownType: UpDownType.DOWN,
    firstDepartureTime: null,
    lastDepartureTime: null,
    firstDestinationStationName: null,
    lastDestinationStationName: null,
  },
];

const TrainRealTimes = ({ stationId, stationName, subwayLineId }: TrainRealTimesProps) => {
  const { push } = useFlow();
  const { data, isFetching, isError, refetch } = useFetchTrainInfo({
    stationId,
    subwayLineId,
  });

  const stationTimeWeekType = useMemo(() => resolveStationTimeWeekType(new Date()), []);
  const { data: stationTimeSummary, isFetching: isStationTimeSummaryFetching } =
    useFetchStationTimesSummary({
      stationId,
      subwayLineId,
      stationTimeWeekType,
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

  const stationTimeSummaries = stationTimeSummary?.summaries ?? defaultStationTimeSummaries;

  let trainArrivalsContent: ReactNode = null;
  if (isFetching) {
    trainArrivalsContent = <div css={{ minHeight: '16.04px' }}></div>;
  } else if (isError) {
    trainArrivalsContent = <div>일시적인 오류</div>;
  } else if ((filterdStationsData?.trainRealTimes || []).length > 0) {
    trainArrivalsContent = (
      <TrainArrivals trainRealTimes={filterdStationsData?.trainRealTimes || []} />
    );
  }

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

        <div
          css={{
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            margin: '0 16px',
            paddingTop: '10px',
            paddingBottom: '4px',
          }}
        >
          <div
            css={{
              color: 'var(--ah-color-legacy-text-faint)',
              fontSize: '12px',
              fontWeight: 600,
              marginBottom: '6px',
            }}
          >
            오늘 첫차/막차
          </div>
          {isStationTimeSummaryFetching ? (
            <div css={{ color: 'white', fontSize: '12px' }}>오늘 첫차/막차 불러오는 중...</div>
          ) : (
            stationTimeSummaries.map(summary => (
              <div
                key={summary.upDownType}
                css={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '12px',
                  color: 'white',
                  marginBottom: '4px',
                }}
              >
                <span>{getUpDownLabel(summary.upDownType)}</span>
                <span>
                  {formatStationTime(summary.firstDepartureTime)} /{' '}
                  {formatStationTime(summary.lastDepartureTime)}
                </span>
              </div>
            ))
          )}
        </div>

        <div css={S.listWrap}>{trainArrivalsContent}</div>
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
        <div css={{ display: 'flex', alignItems: 'center', height: '24px' }}>
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
