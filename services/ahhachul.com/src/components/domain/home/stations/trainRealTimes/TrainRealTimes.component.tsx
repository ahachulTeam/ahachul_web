import { type ReactNode, memo, useMemo, useReducer } from 'react';

import {
  useFetchLastTrainRisk,
  useFetchNearbyPlaces,
  useFetchQuickExits,
  useFetchStationTimesSummary,
  useFetchStationWeatherBrief,
  useFetchTrainInfo,
} from '@/services/subway';
import { useFlow } from '@/stackflow';
import { useUserStationStore } from '@/stores/subway';
import { SubwayLineType, UpDownType, type WithSubwayStationId } from '@/types';

import TrainArrivalStatus from './TrainArrivalStatus.component';
import {
  defaultStationTimeSummaries,
  isStationTimeSummaryTemporarilyDelayed,
  resolveConfidenceBadgeColor,
  resolveConfidenceLabel,
  resolveFreshnessText,
  resolveStationTimeWeekType,
  resolveSummaryStatusLabel,
} from './TrainRealTimes.helpers';
import {
  LastTrainRiskSection,
  NearbyPlacesSection,
  QuickExitSection,
  StationTimeSummarySection,
  StationWeatherSection,
} from './TrainRealTimes.sections';
import * as S from './TrainRealTimes.styled';

import TrainArrivals from '../trainArrivals/TrainArrivals.component';

interface TrainRealTimesProps extends WithSubwayStationId {
  stationName: string;
  subwayLineId: SubwayLineType;
}

const TrainRealTimes = ({ stationId, stationName, subwayLineId }: TrainRealTimesProps) => {
  const { push } = useFlow();
  const { userStations } = useUserStationStore(state => state);
  const { data, isFetching, isError, refetch } = useFetchTrainInfo({
    stationId,
    subwayLineId,
  });

  const stationTimeWeekType = useMemo(() => resolveStationTimeWeekType(new Date()), []);
  const selectedStation = useMemo(() => {
    return userStations.find(station => station.stationId === stationId) ?? null;
  }, [stationId, userStations]);

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

  const { data: lastTrainRisk, isFetching: isLastTrainRiskFetching } = useFetchLastTrainRisk({
    stationId,
    subwayLineId,
    upDownType: sort,
    stationTimeWeekType,
  });

  const { data: quickExitData, isFetching: isQuickExitFetching } = useFetchQuickExits({
    stationId,
    subwayLineId,
    upDownType: sort,
  });

  const { data: nearbyPlacesData, isFetching: isNearbyPlacesFetching } = useFetchNearbyPlaces({
    stationId,
    subwayLineId,
    limit: 3,
  });

  const { data: stationWeather, isFetching: isStationWeatherFetching } =
    useFetchStationWeatherBrief({
      stationId,
    });

  const filteredStationsData = {
    ...data,
    trainRealTimes: data?.trainRealTimes?.filter(item => item.upDownType === sort),
  };
  const isServiceTerminated = filteredStationsData?.trainRealTimes?.length === 0;
  const currentTrain = filteredStationsData?.trainRealTimes?.[0];

  const stationTimeSummaries = stationTimeSummary?.summaries ?? defaultStationTimeSummaries;
  const stationSummaryMeta = stationTimeSummary?.meta;
  const isSummaryTemporarilyDelayed = isStationTimeSummaryTemporarilyDelayed(
    stationSummaryMeta?.sourceDetails,
  );
  const summaryStatusLabel = resolveSummaryStatusLabel(
    stationSummaryMeta?.availabilityStatus,
    isSummaryTemporarilyDelayed,
  );
  const summaryNoDataMessage =
    stationSummaryMeta?.guidanceMessage ??
    '시간표 데이터를 받지 못해 첫차/막차를 표시할 수 없습니다.';
  const confidenceLabel = resolveConfidenceLabel(data?.confidenceLevel);
  const showConfidenceBadge = Boolean(confidenceLabel) && !isFetching && !isError;
  const freshnessText = resolveFreshnessText(data?.isStale, data?.freshnessSec);
  const selectedStationDisplayName = selectedStation?.label || selectedStation?.stationName;

  let trainArrivalsContent: ReactNode = null;
  if (isFetching) {
    trainArrivalsContent = <div css={{ minHeight: '16.04px' }}></div>;
  } else if (isError) {
    trainArrivalsContent = <div>일시적인 오류</div>;
  } else if ((filteredStationsData?.trainRealTimes || []).length > 0) {
    trainArrivalsContent = (
      <TrainArrivals trainRealTimes={filteredStationsData?.trainRealTimes || []} />
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
            currentTrainArrivalCode={currentTrain?.currentTrainArrivalCode}
            destinationStationDirection={currentTrain?.destinationStationDirection}
            sort={sort}
            onRefetch={refetch}
            handleSort={handleSort}
          />
        </div>

        {showConfidenceBadge && (
          <div
            css={{
              margin: '0 16px 10px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span
              css={{
                display: 'inline-flex',
                alignItems: 'center',
                height: '20px',
                padding: '0 8px',
                borderRadius: '999px',
                fontSize: '11px',
                fontWeight: 700,
                color: 'white',
                backgroundColor: resolveConfidenceBadgeColor(data?.confidenceLevel),
              }}
            >
              {confidenceLabel}
            </span>
            <span css={{ color: 'var(--ah-color-legacy-text-faint)', fontSize: '11px' }}>
              {freshnessText}
            </span>
          </div>
        )}

        <StationWeatherSection
          isStationWeatherFetching={isStationWeatherFetching}
          stationWeather={stationWeather}
        />

        <StationTimeSummarySection
          isStationTimeSummaryFetching={isStationTimeSummaryFetching}
          stationTimeSummaries={stationTimeSummaries}
          summaryStatusLabel={summaryStatusLabel}
          summaryNoDataMessage={summaryNoDataMessage}
          availabilityStatus={stationSummaryMeta?.availabilityStatus}
          isSummaryTemporarilyDelayed={isSummaryTemporarilyDelayed}
        />

        <LastTrainRiskSection
          isLastTrainRiskFetching={isLastTrainRiskFetching}
          lastTrainRisk={lastTrainRisk}
          selectedStationDisplayName={selectedStationDisplayName}
        />

        <QuickExitSection
          isQuickExitFetching={isQuickExitFetching}
          recommendations={quickExitData?.recommendations}
        />

        <NearbyPlacesSection
          isNearbyPlacesFetching={isNearbyPlacesFetching}
          places={nearbyPlacesData?.places}
        />

        <div css={S.listWrap}>{trainArrivalsContent}</div>
        <div css={S.buttonWrap}>
          <button
            css={S.button}
            onClick={() =>
              push('SubwayTimelinePage', {
                stationId,
                subwayLineId: Number(subwayLineId),
                stationName,
              })
            }
          >
            전체 시간표
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(TrainRealTimes);
