import { type ReactNode, memo, useMemo, useReducer, useState } from 'react';

import { motion } from 'motion/react';

import { RetryIcon } from '@/assets/icons/system';
import { UiComponent } from '@/components';
import { getArrivalStatusText, isSubwayNeedAnimation, motions } from '@/constants';
import {
  useFetchLastTrainRisk,
  useFetchNearbyPlaces,
  useFetchQuickExits,
  useFetchStationTimesSummary,
  useFetchTrainInfo,
} from '@/services/subway';
import { useFlow } from '@/stackflow';
import { fade } from '@/styles';
import {
  CurrentTrainArrivalType,
  LastTrainRiskLevel,
  NearbyPlaceConfidenceLevel,
  QuickExitConfidenceLevel,
  StationTimeWeekType,
  SubwayLineType,
  UpDownType,
  type NearbyPlace,
  type QuickExitRecommendation,
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
  const [walkingMinutes, setWalkingMinutes] = useState(15);

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
    walkingMinutes,
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

  const filterdStationsData = {
    ...data,
    trainRealTimes: data?.trainRealTimes?.filter(item => item.upDownType === sort),
  };
  const isServiceTerminated = filterdStationsData?.trainRealTimes?.length === 0;
  const currentTrain = filterdStationsData?.trainRealTimes?.[0];

  const stationTimeSummaries = stationTimeSummary?.summaries ?? defaultStationTimeSummaries;
  const confidenceLabel = resolveConfidenceLabel(data?.confidenceLevel);
  const showConfidenceBadge = Boolean(confidenceLabel) && !isFetching && !isError;
  const freshnessText = resolveFreshnessText(data?.isStale, data?.freshnessSec);

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
        ))}
      </div>
    );
  }

  const handleWalkingMinutesChange = (value: string) => {
    const parsedValue = Number(value);

    if (Number.isNaN(parsedValue)) {
      setWalkingMinutes(0);
      return;
    }

    const boundedValue = Math.max(0, Math.min(Math.round(parsedValue), 120));
    setWalkingMinutes(boundedValue);
  };

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
            <label css={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'white' }}>
              <span css={{ fontSize: '12px' }}>도보</span>
              <input
                type="number"
                min={0}
                max={120}
                value={walkingMinutes}
                onChange={event => handleWalkingMinutesChange(event.target.value)}
                css={{
                  width: '54px',
                  height: '24px',
                  borderRadius: '6px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'rgba(255,255,255,0.04)',
                  color: 'white',
                  textAlign: 'right',
                  padding: '0 6px',
                  fontSize: '12px',
                }}
              />
              <span css={{ fontSize: '12px' }}>분</span>
            </label>
          </div>
          <div css={{ marginTop: '8px' }}>{lastTrainRiskContent}</div>
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
