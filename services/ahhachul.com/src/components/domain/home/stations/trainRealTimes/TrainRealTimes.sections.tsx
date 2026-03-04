import type { ReactNode } from 'react';

import {
  StationSummaryAvailabilityStatus,
  type LastTrainRiskResponse,
  type NearbyPlace,
  type QuickExitRecommendation,
  type StationTimeSummary,
  type StationWeatherBriefResponse,
} from '@/types';

import InfoPanelSection from './InfoPanelSection.component';
import {
  formatStationTime,
  getUpDownLabel,
  resolveNearbyPlaceConfidenceColor,
  resolveNearbyPlaceCrowdLabel,
  resolveNearbyPlaceLineText,
  resolveQuickExitConfidenceColor,
  resolveQuickExitConfidenceLabel,
  resolveQuickExitLineText,
  resolveRiskColor,
  resolveRiskLabel,
  resolveSummaryStatusColor,
  resolveWalkingSourceColor,
  resolveWalkingSourceLabel,
  resolveWalkingUpdatedAtText,
  resolveWeatherSourceColor,
  resolveWeatherSourceLabel,
} from './TrainRealTimes.helpers';
import { resolveMinutesToLastTrainText } from './lastTrainRisk';

interface StationWeatherSectionProps {
  isStationWeatherFetching: boolean;
  stationWeather?: StationWeatherBriefResponse;
}

export const StationWeatherSection = ({
  isStationWeatherFetching,
  stationWeather,
}: StationWeatherSectionProps) => {
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

  const badge =
    weatherSourceLabel && !isStationWeatherFetching ? (
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
    ) : null;

  return (
    <InfoPanelSection title="오늘 날씨 안내" badge={badge} contentMarginTop="8px">
      {stationWeatherContent}
    </InfoPanelSection>
  );
};

interface StationTimeSummarySectionProps {
  isStationTimeSummaryFetching: boolean;
  stationTimeSummaries: StationTimeSummary[];
  summaryStatusLabel: string | null;
  summaryNoDataMessage: string;
  availabilityStatus?: StationSummaryAvailabilityStatus;
  isSummaryTemporarilyDelayed: boolean;
}

export const StationTimeSummarySection = ({
  isStationTimeSummaryFetching,
  stationTimeSummaries,
  summaryStatusLabel,
  summaryNoDataMessage,
  availabilityStatus,
  isSummaryTemporarilyDelayed,
}: StationTimeSummarySectionProps) => {
  const isStationTimeSummaryEmpty = stationTimeSummaries.every(
    summary => !summary.firstDepartureTime && !summary.lastDepartureTime,
  );

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

  const badge =
    summaryStatusLabel && !isStationTimeSummaryFetching ? (
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
            availabilityStatus,
            isSummaryTemporarilyDelayed,
          ),
        }}
      >
        {summaryStatusLabel}
      </span>
    ) : null;

  return (
    <InfoPanelSection
      title="오늘 첫차/막차"
      badge={badge}
      titleMarginBottom="6px"
      paddingBottom="4px"
    >
      {stationSummaryContent}
    </InfoPanelSection>
  );
};

interface LastTrainRiskSectionProps {
  isLastTrainRiskFetching: boolean;
  lastTrainRisk?: LastTrainRiskResponse;
  selectedStationDisplayName?: string;
}

export const LastTrainRiskSection = ({
  isLastTrainRiskFetching,
  lastTrainRisk,
  selectedStationDisplayName,
}: LastTrainRiskSectionProps) => {
  const walkingUpdatedAtText = resolveWalkingUpdatedAtText(lastTrainRisk?.walkingMinutesUpdatedAt);
  const walkingSourceLabel = resolveWalkingSourceLabel(lastTrainRisk?.walkingMinutesSource);

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

  const badge =
    !isLastTrainRiskFetching && lastTrainRisk ? (
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
    ) : null;

  return (
    <InfoPanelSection title="막차 리스크" badge={badge} contentMarginTop="8px">
      <>
        {lastTrainRiskContent}
        {!isLastTrainRiskFetching && selectedStationDisplayName && (
          <div
            css={{
              marginTop: '6px',
              color: 'var(--ah-color-legacy-text-faint)',
              fontSize: '11px',
            }}
          >
            {selectedStationDisplayName} 기준 자동 계산
          </div>
        )}
      </>
    </InfoPanelSection>
  );
};

interface QuickExitSectionProps {
  isQuickExitFetching: boolean;
  recommendations?: QuickExitRecommendation[];
}

export const QuickExitSection = ({
  isQuickExitFetching,
  recommendations,
}: QuickExitSectionProps) => {
  const quickExitRecommendations = recommendations?.slice(0, 2) ?? [];

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
  } else if (quickExitRecommendations.length > 0) {
    quickExitContent = (
      <div css={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {quickExitRecommendations.map(recommendation => (
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

  return (
    <InfoPanelSection title="빠른하차/출구 추천" titleMarginBottom="8px">
      {quickExitContent}
    </InfoPanelSection>
  );
};

interface NearbyPlacesSectionProps {
  isNearbyPlacesFetching: boolean;
  places?: NearbyPlace[];
}

export const NearbyPlacesSection = ({
  isNearbyPlacesFetching,
  places,
}: NearbyPlacesSectionProps) => {
  const topNearbyPlaces = places?.slice(0, 3) ?? [];

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
  } else if (topNearbyPlaces.length > 0) {
    nearbyPlacesContent = (
      <div css={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {topNearbyPlaces.map(place => (
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

  return (
    <InfoPanelSection title="주변 간단 식사/편의시설" titleMarginBottom="8px">
      {nearbyPlacesContent}
    </InfoPanelSection>
  );
};
