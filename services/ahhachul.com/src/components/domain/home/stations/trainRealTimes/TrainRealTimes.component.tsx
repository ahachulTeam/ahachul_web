import { type ReactNode, memo, useMemo, useReducer } from 'react';

import { motion } from 'motion/react';

import { RetryIcon } from '@/assets/icons/system';
import { UiComponent } from '@/components';
import { getArrivalStatusText, isSubwayNeedAnimation, motions } from '@/constants';
import {
  useFetchLastTrainRisk,
  useFetchNearbyPlaces,
  useFetchQuickExits,
  useFetchStationWeatherBrief,
  useFetchStationTimesSummary,
  useFetchTrainInfo,
} from '@/services/subway';
import { useFlow } from '@/stackflow';
import { useUserStationStore } from '@/stores/subway';
import { fade } from '@/styles';
import {
  CurrentTrainArrivalType,
  LastTrainRiskLevel,
  NearbyPlaceConfidenceLevel,
  QuickExitConfidenceLevel,
  StationSummaryAvailabilityStatus,
  StationSummaryDataSource,
  StationWeatherDataSource,
  StationTimeWeekType,
  SubwayLineType,
  UpDownType,
  type NearbyPlace,
  type QuickExitRecommendation,
  type StationTimeSummarySourceDetail,
  type WithSubwayStationId,
} from '@/types';

import * as S from './TrainRealTimes.styled';
import { resolveMinutesToLastTrainText } from './lastTrainRisk';

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

function resolveConfidenceLabel(confidenceLevel?: string): string | null {
  if (confidenceLevel === 'HIGH') {
    return '신뢰도 높음';
  }
  if (confidenceLevel === 'MEDIUM') {
    return '신뢰도 보통';
  }
  if (confidenceLevel === 'LOW') {
    return '신뢰도 낮음';
  }
  return null;
}

function resolveConfidenceBadgeColor(confidenceLevel?: string): string {
  if (confidenceLevel === 'HIGH') {
    return 'rgba(16, 185, 129, 0.72)';
  }
  if (confidenceLevel === 'MEDIUM') {
    return 'rgba(245, 158, 11, 0.72)';
  }
  return 'rgba(239, 68, 68, 0.72)';
}

function resolveFreshnessText(isStale?: boolean, freshnessSec?: number): string {
  if (isStale) {
    return '정보 지연';
  }

  if (typeof freshnessSec === 'number') {
    return `최신 수신 ${freshnessSec}초 전`;
  }

  return '';
}

function resolveRiskLabel(riskLevel?: LastTrainRiskLevel): string {
  if (riskLevel === LastTrainRiskLevel.SAFE) {
    return '막차 여유';
  }
  if (riskLevel === LastTrainRiskLevel.WARN) {
    return '막차 임박';
  }
  return '막차 위험';
}

function resolveRiskColor(riskLevel?: LastTrainRiskLevel): string {
  if (riskLevel === LastTrainRiskLevel.SAFE) {
    return 'rgba(16, 185, 129, 0.72)';
  }
  if (riskLevel === LastTrainRiskLevel.WARN) {
    return 'rgba(245, 158, 11, 0.72)';
  }
  return 'rgba(239, 68, 68, 0.72)';
}

function resolveWalkingSourceLabel(source?: 'REQUEST' | 'USER_PROFILE' | 'DEFAULT'): string {
  if (source === 'USER_PROFILE') {
    return '프로필';
  }
  if (source === 'REQUEST') {
    return '직접 입력';
  }
  return '기본값';
}

function resolveWalkingSourceColor(source?: 'REQUEST' | 'USER_PROFILE' | 'DEFAULT'): string {
  if (source === 'USER_PROFILE') {
    return 'rgba(16, 185, 129, 0.72)';
  }
  if (source === 'REQUEST') {
    return 'rgba(59, 130, 246, 0.72)';
  }
  return 'rgba(245, 158, 11, 0.72)';
}

function resolveWalkingUpdatedAtText(value?: string | null): string | null {
  if (!value) {
    return null;
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  const month = `${parsed.getMonth() + 1}`.padStart(2, '0');
  const date = `${parsed.getDate()}`.padStart(2, '0');
  const hour = `${parsed.getHours()}`.padStart(2, '0');
  const minute = `${parsed.getMinutes()}`.padStart(2, '0');
  return `${month}.${date} ${hour}:${minute} 갱신`;
}

function resolveSummaryStatusLabel(
  availabilityStatus?: StationSummaryAvailabilityStatus,
  isTemporarilyDelayed = false,
): string | null {
  if (availabilityStatus === StationSummaryAvailabilityStatus.AVAILABLE) {
    return '정상 제공';
  }
  if (availabilityStatus === StationSummaryAvailabilityStatus.PARTIAL) {
    return '부분 제공';
  }
  if (availabilityStatus === StationSummaryAvailabilityStatus.EMPTY) {
    return isTemporarilyDelayed ? '일시 지연' : '미제공';
  }
  return null;
}

function resolveSummaryStatusColor(
  availabilityStatus?: StationSummaryAvailabilityStatus,
  isTemporarilyDelayed = false,
): string {
  if (availabilityStatus === StationSummaryAvailabilityStatus.AVAILABLE) {
    return 'rgba(16, 185, 129, 0.72)';
  }
  if (availabilityStatus === StationSummaryAvailabilityStatus.PARTIAL) {
    return 'rgba(245, 158, 11, 0.72)';
  }
  if (availabilityStatus === StationSummaryAvailabilityStatus.EMPTY && isTemporarilyDelayed) {
    return 'rgba(245, 158, 11, 0.72)';
  }
  return 'rgba(239, 68, 68, 0.72)';
}

function isStationTimeSummaryTemporarilyDelayed(
  sourceDetails?: StationTimeSummarySourceDetail[],
): boolean {
  return Boolean(
    sourceDetails?.some(detail => detail.dataSource === StationSummaryDataSource.FALLBACK_EMPTY),
  );
}

function resolveQuickExitConfidenceLabel(level: QuickExitConfidenceLevel): string {
  if (level === QuickExitConfidenceLevel.HIGH) {
    return '높음';
  }
  if (level === QuickExitConfidenceLevel.MEDIUM) {
    return '보통';
  }
  return '낮음';
}

function resolveQuickExitConfidenceColor(level: QuickExitConfidenceLevel): string {
  if (level === QuickExitConfidenceLevel.HIGH) {
    return 'rgba(16, 185, 129, 0.72)';
  }
  if (level === QuickExitConfidenceLevel.MEDIUM) {
    return 'rgba(245, 158, 11, 0.72)';
  }
  return 'rgba(239, 68, 68, 0.72)';
}

function resolveQuickExitLineText(recommendation: QuickExitRecommendation): string {
  return `${recommendation.carNo}칸 · 출구 ${recommendation.exitNo} · 약 ${recommendation.walkingBenefitMinutes}분 단축`;
}

function resolveNearbyPlaceConfidenceColor(level: NearbyPlaceConfidenceLevel): string {
  if (level === NearbyPlaceConfidenceLevel.HIGH) {
    return 'rgba(16, 185, 129, 0.72)';
  }
  if (level === NearbyPlaceConfidenceLevel.MEDIUM) {
    return 'rgba(245, 158, 11, 0.72)';
  }
  return 'rgba(239, 68, 68, 0.72)';
}

function resolveNearbyPlaceLineText(place: NearbyPlace): string {
  return `${place.name} · ${place.category} · 도보 ${place.walkingMinutes}분`;
}

function resolveNearbyPlaceCrowdLabel(level: NearbyPlace['crowdLevel']): string {
  if (level === 'LOW') {
    return '여유';
  }
  if (level === 'MEDIUM') {
    return '보통';
  }
  if (level === 'HIGH') {
    return '혼잡';
  }
  return '매우 혼잡';
}

function resolveWeatherSourceLabel(
  dataSource?: StationWeatherDataSource,
  isStale?: boolean,
): string | null {
  if (dataSource === StationWeatherDataSource.FALLBACK) {
    return '정보 지연';
  }
  if (isStale || dataSource === StationWeatherDataSource.STALE_CACHE) {
    return '캐시(지연)';
  }
  if (dataSource === StationWeatherDataSource.CACHE) {
    return '캐시';
  }
  if (dataSource === StationWeatherDataSource.API) {
    return '실시간';
  }
  return null;
}

function resolveWeatherSourceColor(
  dataSource?: StationWeatherDataSource,
  isStale?: boolean,
): string {
  if (dataSource === StationWeatherDataSource.FALLBACK) {
    return 'rgba(239, 68, 68, 0.72)';
  }
  if (isStale || dataSource === StationWeatherDataSource.STALE_CACHE) {
    return 'rgba(245, 158, 11, 0.72)';
  }
  if (dataSource === StationWeatherDataSource.CACHE) {
    return 'rgba(59, 130, 246, 0.72)';
  }
  return 'rgba(16, 185, 129, 0.72)';
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

  const filterdStationsData = {
    ...data,
    trainRealTimes: data?.trainRealTimes?.filter(item => item.upDownType === sort),
  };
  const isServiceTerminated = filterdStationsData?.trainRealTimes?.length === 0;
  const currentTrain = filterdStationsData?.trainRealTimes?.[0];

  const stationTimeSummaries = stationTimeSummary?.summaries ?? defaultStationTimeSummaries;
  const stationSummaryMeta = stationTimeSummary?.meta;
  const isStationTimeSummaryEmpty = stationTimeSummaries.every(
    summary => !summary.firstDepartureTime && !summary.lastDepartureTime,
  );
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
  const walkingSourceLabel = resolveWalkingSourceLabel(lastTrainRisk?.walkingMinutesSource);
  const walkingUpdatedAtText = resolveWalkingUpdatedAtText(lastTrainRisk?.walkingMinutesUpdatedAt);

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

  let stationSummaryContent: ReactNode = stationTimeSummaries.map(summary => (
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
  ));

  if (isStationTimeSummaryFetching) {
    stationSummaryContent = (
      <div css={{ color: 'white', fontSize: '12px' }}>오늘 첫차/막차 불러오는 중...</div>
    );
  } else if (isStationTimeSummaryEmpty) {
    stationSummaryContent = (
      <div css={{ color: 'var(--ah-color-legacy-text-faint)', fontSize: '12px' }}>
        {summaryNoDataMessage}
      </div>
    );
  }

  let lastTrainRiskContent: ReactNode = (
    <div css={{ color: 'var(--ah-color-legacy-text-faint)', fontSize: '12px' }}>
      리스크 정보를 불러올 수 없습니다.
    </div>
  );

  if (isLastTrainRiskFetching) {
    lastTrainRiskContent = (
      <div css={{ color: 'var(--ah-color-legacy-text-faint)', fontSize: '12px' }}>
        막차 리스크 계산 중...
      </div>
    );
  } else if (lastTrainRisk) {
    lastTrainRiskContent = (
      <>
        <div css={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
              backgroundColor: resolveRiskColor(lastTrainRisk.riskLevel),
            }}
          >
            {resolveRiskLabel(lastTrainRisk.riskLevel)}
          </span>
          <span css={{ color: 'white', fontSize: '12px' }}>
            {resolveMinutesToLastTrainText(lastTrainRisk.minutesToLastTrain)}
          </span>
        </div>
        <div
          css={{ color: 'var(--ah-color-legacy-text-faint)', fontSize: '12px', marginTop: '6px' }}
        >
          {lastTrainRisk.message}
        </div>
        <div
          css={{
            color: 'var(--ah-color-legacy-text-faint)',
            fontSize: '11px',
            marginTop: '4px',
          }}
        >
          기준: {walkingSourceLabel}
          {walkingUpdatedAtText ? ` · ${walkingUpdatedAtText}` : ''}
        </div>
        {lastTrainRisk.walkingMinutesSource === 'DEFAULT' && (
          <div
            css={{
              color: 'var(--ah-color-legacy-text-faint)',
              fontSize: '11px',
              marginTop: '4px',
            }}
          >
            마이페이지에서 집/회사 주소를 설정하면 도보 시간이 자동 보정됩니다.
          </div>
        )}
      </>
    );
  }

  let quickExitContent: ReactNode = (
    <div css={{ color: 'var(--ah-color-legacy-text-faint)', fontSize: '12px' }}>
      추천 정보 준비 중입니다.
    </div>
  );

  if (isQuickExitFetching) {
    quickExitContent = (
      <div css={{ color: 'var(--ah-color-legacy-text-faint)', fontSize: '12px' }}>
        빠른하차/출구 추천 불러오는 중...
      </div>
    );
  } else if ((quickExitData?.recommendations?.length || 0) > 0) {
    quickExitContent = (
      <div css={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {quickExitData!.recommendations.slice(0, 2).map(recommendation => (
          <div
            key={`${recommendation.carNo}-${recommendation.exitNo}`}
            css={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '10px',
            }}
          >
            <span css={{ color: 'white', fontSize: '12px' }}>
              {resolveQuickExitLineText(recommendation)}
            </span>
            <span
              css={{
                display: 'inline-flex',
                alignItems: 'center',
                height: '18px',
                padding: '0 6px',
                borderRadius: '999px',
                fontSize: '10px',
                fontWeight: 700,
                color: 'white',
                backgroundColor: resolveQuickExitConfidenceColor(recommendation.confidenceLevel),
              }}
            >
              {resolveQuickExitConfidenceLabel(recommendation.confidenceLevel)}
            </span>
          </div>
        ))}
      </div>
    );
  }

  let nearbyPlacesContent: ReactNode = (
    <div css={{ color: 'var(--ah-color-legacy-text-faint)', fontSize: '12px' }}>
      주변 추천 정보 준비 중입니다.
    </div>
  );

  if (isNearbyPlacesFetching) {
    nearbyPlacesContent = (
      <div css={{ color: 'var(--ah-color-legacy-text-faint)', fontSize: '12px' }}>
        주변 장소 정보를 불러오는 중...
      </div>
    );
  } else if ((nearbyPlacesData?.places?.length || 0) > 0) {
    nearbyPlacesContent = (
      <div css={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {nearbyPlacesData!.places.slice(0, 3).map(place => (
          <div
            key={`${place.name}-${place.category}`}
            css={{
              display: 'grid',
              gap: '8px',
            }}
          >
            <div
              css={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '8px',
              }}
            >
              <span css={{ color: 'white', fontSize: '12px' }}>
                {resolveNearbyPlaceLineText(place)}
              </span>
              <div css={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                {place.supportsEnglishMenu && (
                  <span
                    css={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      height: '18px',
                      padding: '0 6px',
                      borderRadius: '999px',
                      fontSize: '10px',
                      fontWeight: 700,
                      color: '#0f172a',
                      backgroundColor: 'rgba(255,255,255,0.88)',
                    }}
                  >
                    영문메뉴
                  </span>
                )}
                <span
                  css={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    height: '18px',
                    padding: '0 6px',
                    borderRadius: '999px',
                    fontSize: '10px',
                    fontWeight: 700,
                    color: 'white',
                    backgroundColor: resolveNearbyPlaceConfidenceColor(place.confidenceLevel),
                  }}
                >
                  {place.openNow ? '영업중' : '영업종료'}
                </span>
              </div>
            </div>
            <span css={{ color: 'var(--ah-color-legacy-text-faint)', fontSize: '11px' }}>
              {`운영 ${place.operatingHours || '정보 없음'} · 혼잡 ${resolveNearbyPlaceCrowdLabel(
                place.crowdLevel,
              )} · 정확도 ${place.poiAccuracyScore ?? '-'}점`}
            </span>
          </div>
        ))}
      </div>
    );
  }

  const weatherSourceLabel = resolveWeatherSourceLabel(
    stationWeather?.dataSource,
    stationWeather?.isStale,
  );

  let stationWeatherContent: ReactNode = (
    <div css={{ color: 'var(--ah-color-legacy-text-faint)', fontSize: '12px' }}>
      오늘 날씨 정보를 준비 중입니다.
    </div>
  );

  if (isStationWeatherFetching) {
    stationWeatherContent = (
      <div css={{ color: 'var(--ah-color-legacy-text-faint)', fontSize: '12px' }}>
        오늘 날씨를 불러오는 중...
      </div>
    );
  } else if (stationWeather) {
    stationWeatherContent = (
      <div css={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <div css={{ color: 'white', fontSize: '12px' }}>{stationWeather.summaryText}</div>
        <div css={{ color: 'var(--ah-color-legacy-text-faint)', fontSize: '12px' }}>
          {stationWeather.cautionText}
        </div>
        <div css={{ color: 'var(--ah-color-legacy-text-faint)', fontSize: '12px' }}>
          {stationWeather.friendlyText}
        </div>
      </div>
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

        <div
          css={{
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            margin: '0 16px',
            paddingTop: '10px',
            paddingBottom: '10px',
          }}
        >
          <div css={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div
              css={{
                color: 'var(--ah-color-legacy-text-faint)',
                fontSize: '12px',
                fontWeight: 600,
              }}
            >
              오늘 날씨 안내
            </div>
            {weatherSourceLabel && !isStationWeatherFetching && (
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
                  backgroundColor: resolveWeatherSourceColor(
                    stationWeather?.dataSource,
                    stationWeather?.isStale,
                  ),
                }}
              >
                {weatherSourceLabel}
              </span>
            )}
          </div>
          <div css={{ marginTop: '8px' }}>{stationWeatherContent}</div>
        </div>

        <div
          css={{
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            margin: '0 16px',
            paddingTop: '10px',
            paddingBottom: '4px',
          }}
        >
          <div css={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
            {summaryStatusLabel && !isStationTimeSummaryFetching && (
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
                  backgroundColor: resolveSummaryStatusColor(
                    stationSummaryMeta?.availabilityStatus,
                    isSummaryTemporarilyDelayed,
                  ),
                }}
              >
                {summaryStatusLabel}
              </span>
            )}
          </div>
          {stationSummaryContent}
        </div>

        <div
          css={{
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            margin: '0 16px',
            paddingTop: '10px',
            paddingBottom: '10px',
          }}
        >
          <div css={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div
              css={{
                color: 'var(--ah-color-legacy-text-faint)',
                fontSize: '12px',
                fontWeight: 600,
              }}
            >
              막차 리스크
            </div>
            {!isLastTrainRiskFetching && lastTrainRisk && (
              <div css={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <span css={{ color: 'white', fontSize: '12px' }}>
                  도보 {lastTrainRisk.walkingMinutes}분
                </span>
                <span
                  css={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    height: '18px',
                    padding: '0 6px',
                    borderRadius: '999px',
                    fontSize: '10px',
                    fontWeight: 700,
                    color: 'white',
                    backgroundColor: resolveWalkingSourceColor(lastTrainRisk.walkingMinutesSource),
                  }}
                >
                  {resolveWalkingSourceLabel(lastTrainRisk.walkingMinutesSource)}
                </span>
              </div>
            )}
          </div>
          <div css={{ marginTop: '8px' }}>{lastTrainRiskContent}</div>
          {!isLastTrainRiskFetching && selectedStation && (
            <div
              css={{
                marginTop: '6px',
                color: 'var(--ah-color-legacy-text-faint)',
                fontSize: '11px',
              }}
            >
              {selectedStation.label || selectedStation.stationName} 기준 자동 계산
            </div>
          )}
        </div>

        <div
          css={{
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            margin: '0 16px',
            paddingTop: '10px',
            paddingBottom: '10px',
          }}
        >
          <div
            css={{
              color: 'var(--ah-color-legacy-text-faint)',
              fontSize: '12px',
              fontWeight: 600,
              marginBottom: '8px',
            }}
          >
            빠른하차/출구 추천
          </div>
          {quickExitContent}
        </div>

        <div
          css={{
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            margin: '0 16px',
            paddingTop: '10px',
            paddingBottom: '10px',
          }}
        >
          <div
            css={{
              color: 'var(--ah-color-legacy-text-faint)',
              fontSize: '12px',
              fontWeight: 600,
              marginBottom: '8px',
            }}
          >
            주변 간단 식사/편의시설
          </div>
          {nearbyPlacesContent}
        </div>

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
