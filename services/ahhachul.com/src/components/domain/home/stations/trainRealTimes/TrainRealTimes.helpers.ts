import {
  LastTrainRiskLevel,
  NearbyPlaceConfidenceLevel,
  QuickExitConfidenceLevel,
  StationSummaryAvailabilityStatus,
  StationSummaryDataSource,
  StationWeatherDataSource,
  StationTimeWeekType,
  UpDownType,
  type NearbyPlace,
  type QuickExitRecommendation,
  type StationTimeSummary,
  type StationTimeSummarySourceDetail,
} from '@/types';

export function resolveStationTimeWeekType(now: Date): StationTimeWeekType {
  const day = now.getDay();

  if (day === 6) {
    return StationTimeWeekType.SATURDAY;
  }

  if (day === 0) {
    return StationTimeWeekType.HOLIDAY;
  }

  return StationTimeWeekType.WEEKDAY;
}

export function formatStationTime(time: string | null | undefined): string {
  return time ? time.slice(0, 5) : '--:--';
}

export function getUpDownLabel(upDownType: UpDownType): string {
  return upDownType === UpDownType.UP ? '상행' : '하행';
}

export function resolveConfidenceLabel(confidenceLevel?: string): string | null {
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

export function resolveConfidenceBadgeColor(confidenceLevel?: string): string {
  if (confidenceLevel === 'HIGH') {
    return 'rgba(16, 185, 129, 0.72)';
  }
  if (confidenceLevel === 'MEDIUM') {
    return 'rgba(245, 158, 11, 0.72)';
  }
  return 'rgba(239, 68, 68, 0.72)';
}

export function resolveFreshnessText(isStale?: boolean, freshnessSec?: number): string {
  if (isStale) {
    return '정보 지연';
  }

  if (typeof freshnessSec === 'number') {
    return `최신 수신 ${freshnessSec}초 전`;
  }

  return '';
}

export function resolveRiskLabel(riskLevel?: LastTrainRiskLevel): string {
  if (riskLevel === LastTrainRiskLevel.SAFE) {
    return '막차 여유';
  }
  if (riskLevel === LastTrainRiskLevel.WARN) {
    return '막차 임박';
  }
  return '막차 위험';
}

export function resolveRiskColor(riskLevel?: LastTrainRiskLevel): string {
  if (riskLevel === LastTrainRiskLevel.SAFE) {
    return 'rgba(16, 185, 129, 0.72)';
  }
  if (riskLevel === LastTrainRiskLevel.WARN) {
    return 'rgba(245, 158, 11, 0.72)';
  }
  return 'rgba(239, 68, 68, 0.72)';
}

export function resolveWalkingSourceLabel(source?: 'REQUEST' | 'USER_PROFILE' | 'DEFAULT'): string {
  if (source === 'USER_PROFILE') {
    return '프로필';
  }
  if (source === 'REQUEST') {
    return '직접 입력';
  }
  return '기본값';
}

export function resolveWalkingSourceColor(source?: 'REQUEST' | 'USER_PROFILE' | 'DEFAULT'): string {
  if (source === 'USER_PROFILE') {
    return 'rgba(16, 185, 129, 0.72)';
  }
  if (source === 'REQUEST') {
    return 'rgba(59, 130, 246, 0.72)';
  }
  return 'rgba(245, 158, 11, 0.72)';
}

export function resolveWalkingUpdatedAtText(value?: string | null): string | null {
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

export function resolveSummaryStatusLabel(
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

export function resolveSummaryStatusColor(
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

export function isStationTimeSummaryTemporarilyDelayed(
  sourceDetails?: StationTimeSummarySourceDetail[],
): boolean {
  return Boolean(
    sourceDetails?.some(detail => detail.dataSource === StationSummaryDataSource.FALLBACK_EMPTY),
  );
}

export function resolveQuickExitConfidenceLabel(level: QuickExitConfidenceLevel): string {
  if (level === QuickExitConfidenceLevel.HIGH) {
    return '높음';
  }
  if (level === QuickExitConfidenceLevel.MEDIUM) {
    return '보통';
  }
  return '낮음';
}

export function resolveQuickExitConfidenceColor(level: QuickExitConfidenceLevel): string {
  if (level === QuickExitConfidenceLevel.HIGH) {
    return 'rgba(16, 185, 129, 0.72)';
  }
  if (level === QuickExitConfidenceLevel.MEDIUM) {
    return 'rgba(245, 158, 11, 0.72)';
  }
  return 'rgba(239, 68, 68, 0.72)';
}

export function resolveQuickExitLineText(recommendation: QuickExitRecommendation): string {
  return `${recommendation.carNo}칸 · 출구 ${recommendation.exitNo} · 약 ${recommendation.walkingBenefitMinutes}분 단축`;
}

export function resolveNearbyPlaceConfidenceColor(level: NearbyPlaceConfidenceLevel): string {
  if (level === NearbyPlaceConfidenceLevel.HIGH) {
    return 'rgba(16, 185, 129, 0.72)';
  }
  if (level === NearbyPlaceConfidenceLevel.MEDIUM) {
    return 'rgba(245, 158, 11, 0.72)';
  }
  return 'rgba(239, 68, 68, 0.72)';
}

export function resolveNearbyPlaceLineText(place: NearbyPlace): string {
  return `${place.name} · ${place.category} · 도보 ${place.walkingMinutes}분`;
}

export function resolveNearbyPlaceCrowdLabel(level: NearbyPlace['crowdLevel']): string {
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

export function resolveWeatherSourceLabel(
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

export function resolveWeatherSourceColor(
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

export const defaultStationTimeSummaries: StationTimeSummary[] = [
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
