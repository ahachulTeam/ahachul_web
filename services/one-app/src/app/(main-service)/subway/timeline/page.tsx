'use client';

import { useEffect, useMemo, useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { API_PATHS } from '@ahhachul/http';

import { useStationTimesFullV2Query, useSubwayRouteSearchV2Query } from '@/hooks';
import { fetchClient } from '@/lib/fetch-client';
import type {
  ApiResponse,
  SubwayRouteAccessibilityMode,
  SubwayRouteCrowdingPreference,
  SubwayRouteLuggageMode,
  StationTimeWeekType,
  SubwayRouteStrategy,
  SubwayRouteTravelerContext,
  SubwayRouteWalkingPreference,
} from '@/types';

type SubwayLineCatalogStation = {
  id: number;
  name: string;
};

type SubwayLineCatalogLine = {
  id: number;
  name: string;
  stations: SubwayLineCatalogStation[];
};

type SubwayLineCatalogResponse = {
  subwayLines: SubwayLineCatalogLine[];
};

const STRATEGY_OPTIONS: { value: SubwayRouteStrategy; label: string }[] = [
  { value: 'BALANCED', label: '균형(시간+환승)' },
  { value: 'MIN_TRANSFER', label: '최소 환승' },
  { value: 'MIN_STOP', label: '최소 정차' },
];

const WEEK_OPTIONS: { value: StationTimeWeekType; label: string }[] = [
  { value: 'WEEKDAY', label: '평일' },
  { value: 'SATURDAY', label: '토요일' },
  { value: 'HOLIDAY', label: '공휴일' },
];

const WALKING_OPTIONS: { value: SubwayRouteWalkingPreference; label: string }[] = [
  { value: 'FAST', label: '빠른 이동' },
  { value: 'LESS_STAIRS', label: '계단 적음' },
];

const ACCESSIBILITY_OPTIONS: { value: SubwayRouteAccessibilityMode; label: string }[] = [
  { value: 'BALANCED', label: '기본' },
  { value: 'ELEVATOR_PRIORITY', label: '엘리베이터 우선' },
  { value: 'STAIRS_MINIMIZED', label: '계단 최소' },
  { value: 'WHEELCHAIR', label: '휠체어' },
  { value: 'STROLLER', label: '유모차' },
];

const CROWDING_OPTIONS: { value: SubwayRouteCrowdingPreference; label: string }[] = [
  { value: 'BALANCED', label: '기본' },
  { value: 'LESS_CROWDED', label: '덜 붐비는 칸 우선' },
];

const LUGGAGE_OPTIONS: { value: SubwayRouteLuggageMode; label: string }[] = [
  { value: 'NORMAL', label: '기본' },
  { value: 'HEAVY_LUGGAGE', label: '짐 많음' },
  { value: 'AIRPORT_TRAVEL', label: '공항 이동' },
];

const TRAVELER_CONTEXT_OPTIONS: { value: SubwayRouteTravelerContext; label: string }[] = [
  { value: 'COMMUTE', label: '출퇴근' },
  { value: 'SCHOOL', label: '등하교' },
  { value: 'TRAVEL', label: '관광/여행' },
];

const LOCALE_OPTIONS: { value: 'ko' | 'en' | 'th' | 'cn'; label: string }[] = [
  { value: 'ko', label: '한국어' },
  { value: 'en', label: 'English' },
  { value: 'th', label: 'ไทย' },
  { value: 'cn', label: '中文' },
];

function resolveBadgeLabel(badge: string): string {
  const labels: Record<string, string> = {
    BEST_RECOMMENDED: '최적 추천',
    TRANSFER_HEAVY: '환승 부담',
    WALKING_HEAVY: '보행 부담',
    LAST_TRAIN_RISK: '막차 위험',
    DELAY_RISK: '지연 위험',
    DATA_LIMITED: '데이터 제한',
    ACCESSIBILITY_RECOMMENDED: '접근성 반영',
    CROWDING_AVOIDANCE: '혼잡 회피',
    AIRPORT_FRIENDLY: '공항 이동 친화',
    TOURIST_FRIENDLY: '관광 이동 친화',
  };
  return labels[badge] ?? badge;
}

function resolveCrowdingLevelLabel(level?: string): string {
  const labels: Record<string, string> = {
    LOW: '여유',
    MEDIUM: '보통',
    HIGH: '혼잡',
    VERY_HIGH: '매우 혼잡',
  };
  return labels[level ?? ''] ?? '정보 없음';
}

function resolveTravelTagLabel(tag: string): string {
  const labels: Record<string, string> = {
    AIRPORT_FRIENDLY: '공항 이동',
    TOURIST_FRIENDLY: '관광 이동',
    ACCESSIBILITY_PRIORITY: '접근성 우선',
    LESS_CROWDED_RECOMMENDED: '혼잡 회피',
  };
  return labels[tag] ?? tag;
}

function resolveEssentialTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    CONVENIENCE_STORE: '편의점',
    RESTROOM: '화장실',
    ATM: 'ATM',
    LATE_NIGHT_FOOD: '늦은 시간 식당',
  };
  return labels[type] ?? type;
}

export default function SubwayTimelinePage() {
  const [selectedLineId, setSelectedLineId] = useState<number>(0);
  const [sourceStationId, setSourceStationId] = useState<number>(0);
  const [destinationStationId, setDestinationStationId] = useState<number>(0);
  const [strategy, setStrategy] = useState<SubwayRouteStrategy>('BALANCED');
  const [weekType, setWeekType] = useState<StationTimeWeekType>('WEEKDAY');
  const [walkingPreference, setWalkingPreference] = useState<SubwayRouteWalkingPreference>('FAST');
  const [accessibilityMode, setAccessibilityMode] =
    useState<SubwayRouteAccessibilityMode>('BALANCED');
  const [crowdingPreference, setCrowdingPreference] =
    useState<SubwayRouteCrowdingPreference>('BALANCED');
  const [luggageMode, setLuggageMode] = useState<SubwayRouteLuggageMode>('NORMAL');
  const [travelerContext, setTravelerContext] = useState<SubwayRouteTravelerContext>('COMMUTE');
  const [routeLocale, setRouteLocale] = useState<'ko' | 'en' | 'th' | 'cn'>('ko');
  const [oneClickNotice, setOneClickNotice] = useState<string | null>(null);

  const subwayLineCatalogQuery = useQuery({
    queryKey: ['subway-lines-for-timeline'],
    queryFn: () => fetchClient<ApiResponse<SubwayLineCatalogResponse>>(API_PATHS.subway.lines),
    staleTime: 60 * 1000,
    select: response => response.result.subwayLines ?? [],
  });

  const subwayLines = subwayLineCatalogQuery.data ?? [];
  const selectedLine = subwayLines.find(line => line.id === selectedLineId);
  const stationOptions = selectedLine?.stations ?? [];

  useEffect(() => {
    if (!subwayLines.length) {
      return;
    }
    if (selectedLineId <= 0) {
      setSelectedLineId(subwayLines[0].id);
    }
  }, [selectedLineId, subwayLines]);

  useEffect(() => {
    if (!stationOptions.length) {
      setSourceStationId(0);
      setDestinationStationId(0);
      return;
    }

    setSourceStationId(prev => {
      if (stationOptions.some(station => station.id === prev)) {
        return prev;
      }
      return stationOptions[0].id;
    });

    setDestinationStationId(prev => {
      if (stationOptions.some(station => station.id === prev) && prev !== stationOptions[0].id) {
        return prev;
      }
      return (stationOptions[1] ?? stationOptions[0]).id;
    });
  }, [stationOptions]);

  const routeQuery = useSubwayRouteSearchV2Query(
    {
      sourceStationId,
      destinationStationId,
      strategy,
      alternatives: 3,
      walkingPreference,
      stationTimeWeekType: weekType,
      accessibilityMode,
      crowdingPreference,
      luggageMode,
      travelerContext,
      locale: routeLocale,
    },
    {
      enabled: sourceStationId > 0 && destinationStationId > 0,
    },
  );

  const timetableQuery = useStationTimesFullV2Query(
    {
      stationId: sourceStationId,
      subwayLineId: selectedLineId,
    },
    {
      enabled: sourceStationId > 0 && selectedLineId > 0,
    },
  );

  const selectedWeek = useMemo(
    () => timetableQuery.data?.result.weeks.find(week => week.stationTimeWeekType === weekType),
    [timetableQuery.data?.result.weeks, weekType],
  );
  const oneClickActions = routeQuery.data?.result.oneClickActions ?? [];

  const handleOneClickAction = async (action: {
    actionType: string;
    deepLink: string;
    payloadTemplate: string | null;
  }) => {
    if (typeof window === 'undefined') {
      return;
    }

    if (action.actionType === 'COPY_EMERGENCY_PHRASE') {
      const phrase = action.payloadTemplate?.trim();
      if (!phrase) {
        return;
      }

      try {
        await navigator.clipboard.writeText(phrase);
        setOneClickNotice('긴급 문구를 복사했습니다.');
      } catch {
        setOneClickNotice('긴급 문구 복사에 실패했습니다.');
      }
      return;
    }

    if (!action.deepLink) {
      return;
    }

    window.location.assign(action.deepLink);
  };

  return (
    <main className="min-h-screen bg-gray-10 px-5 pb-24 pt-4">
      <section className="rounded-2xl border border-gray-30 bg-white p-4">
        <h1 className="text-title-small text-gray-100">지하철 길찾기</h1>
        <p className="mt-1 text-body-small text-gray-70">
          출발역/도착역과 전략을 선택하면 최적 경로를 계산합니다.
        </p>

        <div className="mt-3 grid gap-2">
          <label className="text-label-small text-gray-80">
            호선
            <select
              value={selectedLineId}
              onChange={event => setSelectedLineId(Number(event.target.value))}
              className="mt-1 h-10 w-full rounded-lg border border-gray-40 bg-white px-2 text-body-small text-gray-100"
            >
              {subwayLines.map(line => (
                <option key={line.id} value={line.id}>
                  {line.name}
                </option>
              ))}
            </select>
          </label>

          <label className="text-label-small text-gray-80">
            출발역
            <select
              value={sourceStationId}
              onChange={event => setSourceStationId(Number(event.target.value))}
              className="mt-1 h-10 w-full rounded-lg border border-gray-40 bg-white px-2 text-body-small text-gray-100"
            >
              {stationOptions.map(station => (
                <option key={station.id} value={station.id}>
                  {station.name}
                </option>
              ))}
            </select>
          </label>

          <label className="text-label-small text-gray-80">
            도착역
            <select
              value={destinationStationId}
              onChange={event => setDestinationStationId(Number(event.target.value))}
              className="mt-1 h-10 w-full rounded-lg border border-gray-40 bg-white px-2 text-body-small text-gray-100"
            >
              {stationOptions.map(station => (
                <option key={station.id} value={station.id}>
                  {station.name}
                </option>
              ))}
            </select>
          </label>

          <label className="text-label-small text-gray-80">
            전략
            <select
              value={strategy}
              onChange={event => setStrategy(event.target.value as SubwayRouteStrategy)}
              className="mt-1 h-10 w-full rounded-lg border border-gray-40 bg-white px-2 text-body-small text-gray-100"
            >
              {STRATEGY_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="text-label-small text-gray-80">
            보행 선호
            <select
              value={walkingPreference}
              onChange={event =>
                setWalkingPreference(event.target.value as SubwayRouteWalkingPreference)
              }
              className="mt-1 h-10 w-full rounded-lg border border-gray-40 bg-white px-2 text-body-small text-gray-100"
            >
              {WALKING_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="text-label-small text-gray-80">
            접근성 모드
            <select
              value={accessibilityMode}
              onChange={event =>
                setAccessibilityMode(event.target.value as SubwayRouteAccessibilityMode)
              }
              className="mt-1 h-10 w-full rounded-lg border border-gray-40 bg-white px-2 text-body-small text-gray-100"
            >
              {ACCESSIBILITY_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="text-label-small text-gray-80">
            혼잡 선호
            <select
              value={crowdingPreference}
              onChange={event =>
                setCrowdingPreference(event.target.value as SubwayRouteCrowdingPreference)
              }
              className="mt-1 h-10 w-full rounded-lg border border-gray-40 bg-white px-2 text-body-small text-gray-100"
            >
              {CROWDING_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="text-label-small text-gray-80">
            짐 모드
            <select
              value={luggageMode}
              onChange={event => setLuggageMode(event.target.value as SubwayRouteLuggageMode)}
              className="mt-1 h-10 w-full rounded-lg border border-gray-40 bg-white px-2 text-body-small text-gray-100"
            >
              {LUGGAGE_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="text-label-small text-gray-80">
            이용 맥락
            <select
              value={travelerContext}
              onChange={event =>
                setTravelerContext(event.target.value as SubwayRouteTravelerContext)
              }
              className="mt-1 h-10 w-full rounded-lg border border-gray-40 bg-white px-2 text-body-small text-gray-100"
            >
              {TRAVELER_CONTEXT_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="text-label-small text-gray-80">
            액션 언어
            <select
              value={routeLocale}
              onChange={event => setRouteLocale(event.target.value as 'ko' | 'en' | 'th' | 'cn')}
              className="mt-1 h-10 w-full rounded-lg border border-gray-40 bg-white px-2 text-body-small text-gray-100"
            >
              {LOCALE_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-3 grid gap-2">
          {routeQuery.isFetching ? (
            <p className="text-body-small text-gray-70">경로 계산 중...</p>
          ) : null}
          {routeQuery.isError ? (
            <p className="text-body-small text-danger">경로를 계산하지 못했습니다.</p>
          ) : null}

          {!routeQuery.isFetching && !routeQuery.isError && oneClickActions.length > 0 ? (
            <div className="rounded-xl border border-gray-30 bg-gray-05 p-3">
              <p className="text-label-medium text-gray-100">다국어 긴급/신고 원클릭</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {oneClickActions.map(action => (
                  <button
                    key={action.actionType}
                    type="button"
                    onClick={() => {
                      void handleOneClickAction(action);
                    }}
                    className="rounded-full border border-gray-40 px-3 py-1 text-label-small text-gray-90"
                  >
                    {action.title}
                  </button>
                ))}
              </div>
              {oneClickNotice ? (
                <p className="mt-2 text-body-small text-gray-70">{oneClickNotice}</p>
              ) : null}
            </div>
          ) : null}

          {(routeQuery.data?.result.routes ?? []).map(route => (
            <article
              key={`route-${route.rank}`}
              className="rounded-xl border border-gray-30 bg-gray-05 p-3"
            >
              <div className="text-label-medium text-gray-100">경로 {route.rank}</div>
              <p className="mt-1 text-body-small text-gray-80">
                정차 {route.summary.totalStops} · 환승 {route.summary.transferCount} · 예상{' '}
                {route.summary.estimatedMinutes}분
              </p>
              {route.quality ? (
                <p className="mt-1 text-body-small text-gray-100">
                  품질 {route.quality.totalScore}점 · 접근성 {route.quality.accessibilityScore}점 ·
                  혼잡쾌적 {route.quality.crowdingComfortScore}점 · 지연확률{' '}
                  {route.quality.delayProbabilityPercent}%
                </p>
              ) : null}
              {route.quality?.badges?.length ? (
                <div className="mt-1 flex flex-wrap gap-1">
                  {route.quality.badges.map(badge => (
                    <span
                      key={`${route.rank}-${badge}`}
                      className="rounded-full bg-gray-20 px-2 py-0.5 text-caption text-gray-90"
                    >
                      {resolveBadgeLabel(badge)}
                    </span>
                  ))}
                </div>
              ) : null}

              {route.travelModeTags?.length ? (
                <div className="mt-1 flex flex-wrap gap-1">
                  {route.travelModeTags.map(tag => (
                    <span
                      key={`${route.rank}-tag-${tag}`}
                      className="rounded-full bg-gray-100 px-2 py-0.5 text-caption text-white"
                    >
                      {resolveTravelTagLabel(tag)}
                    </span>
                  ))}
                </div>
              ) : null}

              <p className="mt-1 text-body-small text-gray-70">
                {route.nodes.map(node => node.stationName).join(' → ')}
              </p>
              {route.accessibilityProfile ? (
                <p className="mt-1 text-caption text-gray-70">
                  접근성: {route.accessibilityProfile.inStationDifficultyLevel} · 예상 계단구간{' '}
                  {route.accessibilityProfile.estimatedStairSections} · 엘리베이터 친화 환승{' '}
                  {route.accessibilityProfile.elevatorFriendlyTransferCount}
                </p>
              ) : null}
              {route.boardingGuide ? (
                <p className="mt-1 text-caption text-gray-70">
                  탑승 추천 {route.boardingGuide.primaryCarNo}
                  {route.boardingGuide.transferOptimizedCarNo
                    ? ` (환승 ${route.boardingGuide.transferOptimizedCarNo})`
                    : ''}{' '}
                  · {route.boardingGuide.recommendedDoorPosition}
                </p>
              ) : null}
              {route.crowdingGuide ? (
                <p className="mt-1 text-caption text-gray-70">
                  혼잡 {resolveCrowdingLevelLabel(route.crowdingGuide.predictedLevel)} · 덜 붐비는
                  칸 {route.crowdingGuide.lessCrowdedCars.join(', ')}
                </p>
              ) : null}
              {route.nearbyEssentials?.items?.length ? (
                <div className="mt-2 rounded-lg border border-gray-20 bg-white p-2">
                  <p className="text-caption text-gray-90">
                    {route.nearbyEssentials.stationName} 주변 필수 정보
                  </p>
                  <div className="mt-1 grid gap-1">
                    {route.nearbyEssentials.items.map(item => (
                      <p
                        key={`${route.rank}-${item.essentialType}-${item.name}`}
                        className="text-caption text-gray-70"
                      >
                        {resolveEssentialTypeLabel(item.essentialType)} · {item.name} · 도보{' '}
                        {item.walkingMinutes}분 · 운영 {item.operatingHours || '정보 없음'} · 혼잡{' '}
                        {resolveCrowdingLevelLabel(item.crowdLevel)} · 정확도{' '}
                        {item.poiAccuracyScore ?? '정보 없음'} · 신뢰도 {item.reliabilityScore}
                      </p>
                    ))}
                  </div>
                </div>
              ) : null}
              {route.quality?.reasons?.length ? (
                <p className="mt-1 text-caption text-gray-70">{route.quality.reasons[0]}</p>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className="mt-3 rounded-2xl border border-gray-30 bg-white p-4">
        <h2 className="text-title-small text-gray-100">역 전체 시간표</h2>
        <p className="mt-1 text-body-small text-gray-70">
          선택한 출발역의 요일/상하행 전체 시간표를 제공합니다.
        </p>

        <div className="mt-2 flex flex-wrap gap-2">
          {WEEK_OPTIONS.map(option => (
            <button
              key={option.value}
              onClick={() => setWeekType(option.value)}
              className={
                weekType === option.value
                  ? 'h-8 rounded-full bg-gray-100 px-3 text-label-small text-white'
                  : 'h-8 rounded-full border border-gray-40 bg-white px-3 text-label-small text-gray-90'
              }
            >
              {option.label}
            </button>
          ))}
        </div>

        {timetableQuery.isFetching ? (
          <p className="mt-2 text-body-small text-gray-70">시간표 로딩 중...</p>
        ) : null}
        {timetableQuery.isError ? (
          <p className="mt-2 text-body-small text-danger">시간표 조회 실패</p>
        ) : null}

        {!timetableQuery.isFetching &&
          !timetableQuery.isError &&
          selectedWeek?.upDownTimetables.map(timetable => (
            <div key={timetable.upDownType} className="mt-3 rounded-xl border border-gray-30 p-3">
              <p className="text-label-medium text-gray-100">
                {timetable.upDownType === 'UP' ? '상행' : '하행'}
              </p>
              {timetable.stationTimes.length === 0 ? (
                <p className="mt-1 text-body-small text-gray-70">제공 가능한 시간표가 없습니다.</p>
              ) : (
                <div className="mt-1 max-h-44 overflow-y-auto">
                  {timetable.stationTimes.slice(0, 40).map((item, index) => (
                    <p
                      key={`${timetable.upDownType}-${item.departureTime}-${index}`}
                      className="text-body-small text-gray-80"
                    >
                      {item.departureTime.slice(0, 5)} · {item.arrivalStationName}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
      </section>
    </main>
  );
}
