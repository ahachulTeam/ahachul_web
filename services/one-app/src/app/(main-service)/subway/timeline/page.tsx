'use client';

import { useEffect, useMemo, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import { API_PATHS } from '@ahhachul/http';

import { useStationTimesFullV2Query, useSubwayRouteSearchV2Query } from '@/hooks';
import { fetchClient } from '@/lib/fetch-client';
import type {
  ApiResponse,
  StationTimeWeekType,
  SubwayRouteAccessibilityMode,
  SubwayRouteCrowdingPreference,
  SubwayRouteLuggageMode,
  SubwayRouteStrategy,
  SubwayRouteTravelerContext,
  SubwayRouteV2,
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

type RoutePanelTab = 'PLANNER' | 'TIMELINE' | 'COACH' | 'TIMETABLE';

const PANEL_TABS: { value: RoutePanelTab; label: string; description: string }[] = [
  { value: 'PLANNER', label: '길찾기 허브', description: '입력 + 추천 경로' },
  { value: 'TIMELINE', label: '타임라인 상세', description: '단계별 이동 흐름' },
  { value: 'COACH', label: '개인화/접근성', description: '접근성·혼잡·긴급액션' },
  { value: 'TIMETABLE', label: '역 전체 시간표', description: '요일·상하행 조회' },
];

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

function resolveDifficultyLabel(level?: string): string {
  const labels: Record<string, string> = {
    EASY: '쉬움',
    MODERATE: '보통',
    HARD: '어려움',
  };
  return labels[level ?? ''] ?? '정보 없음';
}

function resolveConfidenceStyle(level?: string): {
  label: string;
  className: string;
} {
  if (level === 'HIGH') {
    return {
      label: '신뢰도 높음',
      className: 'border border-green-30 bg-green-10 text-green-90',
    };
  }

  if (level === 'MEDIUM') {
    return {
      label: '신뢰도 보통',
      className: 'border border-yellow-40 bg-yellow-10 text-yellow-100',
    };
  }

  return {
    label: '신뢰도 낮음',
    className: 'border border-red-40 bg-red-10 text-red-100',
  };
}

function renderRouteSummary(route: SubwayRouteV2) {
  const confidenceStyle = resolveConfidenceStyle(route.quality?.confidenceLevel);

  return (
    <article key={`route-${route.rank}`} className="rounded-2xl border border-gray-30 bg-white p-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-label-medium text-gray-100">경로 {route.rank}</p>
          <p className="mt-1 text-body-small text-gray-70">
            정차 {route.summary.totalStops} · 환승 {route.summary.transferCount} · 예상{' '}
            {route.summary.estimatedMinutes}분
          </p>
        </div>
        <span className={`rounded-full px-2 py-1 text-caption ${confidenceStyle.className}`}>
          {confidenceStyle.label}
        </span>
      </div>

      {route.quality ? (
        <div className="mt-2 grid grid-cols-2 gap-2 rounded-xl border border-gray-20 bg-gray-05 p-2">
          <p className="text-caption text-gray-80">품질점수 {route.quality.totalScore}</p>
          <p className="text-caption text-gray-80">접근성 {route.quality.accessibilityScore}</p>
          <p className="text-caption text-gray-80">혼잡쾌적 {route.quality.crowdingComfortScore}</p>
          <p className="text-caption text-gray-80">
            지연확률 {route.quality.delayProbabilityPercent}%
          </p>
        </div>
      ) : null}

      {route.quality?.badges?.length ? (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {route.quality.badges.map(badge => (
            <span
              key={`${route.rank}-badge-${badge}`}
              className="rounded-full bg-gray-20 px-2 py-0.5 text-caption text-gray-90"
            >
              {resolveBadgeLabel(badge)}
            </span>
          ))}
        </div>
      ) : null}

      <p className="mt-2 text-caption text-gray-70">
        {route.nodes.map(node => node.stationName).join(' -> ')}
      </p>
    </article>
  );
}

export default function SubwayTimelinePage() {
  const searchParams = useSearchParams();

  const [activeTab, setActiveTab] = useState<RoutePanelTab>('PLANNER');
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
  const [selectedRouteRank, setSelectedRouteRank] = useState<number | null>(null);
  const [queryStationApplied, setQueryStationApplied] = useState(false);

  const queryLineId = Number(searchParams.get('subwayLineId') ?? 0);
  const queryStationId = Number(searchParams.get('stationId') ?? 0);

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
    if (!subwayLines.length || selectedLineId > 0) {
      return;
    }

    if (queryLineId > 0 && subwayLines.some(line => line.id === queryLineId)) {
      setSelectedLineId(queryLineId);
      return;
    }

    setSelectedLineId(subwayLines[0].id);
  }, [queryLineId, selectedLineId, subwayLines]);

  useEffect(() => {
    if (!stationOptions.length) {
      setSourceStationId(0);
      setDestinationStationId(0);
      setQueryStationApplied(false);
      return;
    }

    const canApplyQueryStation =
      !queryStationApplied &&
      queryStationId > 0 &&
      stationOptions.some(station => station.id === queryStationId);

    setSourceStationId(prev => {
      if (canApplyQueryStation) {
        return queryStationId;
      }
      if (stationOptions.some(station => station.id === prev)) {
        return prev;
      }
      return stationOptions[0].id;
    });

    setDestinationStationId(prev => {
      let sourceCandidate = stationOptions[0].id;

      if (canApplyQueryStation) {
        sourceCandidate = queryStationId;
      } else if (stationOptions.some(station => station.id === sourceStationId)) {
        sourceCandidate = sourceStationId;
      }

      if (stationOptions.some(station => station.id === prev) && prev !== sourceCandidate) {
        return prev;
      }

      return (
        stationOptions.find(station => station.id !== sourceCandidate)?.id ?? stationOptions[0].id
      );
    });

    if (canApplyQueryStation) {
      setQueryStationApplied(true);
    }
  }, [queryStationApplied, queryStationId, sourceStationId, stationOptions]);

  useEffect(() => {
    if (
      sourceStationId <= 0 ||
      destinationStationId <= 0 ||
      sourceStationId !== destinationStationId
    ) {
      return;
    }

    const fallbackDestination = stationOptions.find(station => station.id !== sourceStationId);
    if (fallbackDestination) {
      setDestinationStationId(fallbackDestination.id);
    }
  }, [destinationStationId, sourceStationId, stationOptions]);

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

  const routes = routeQuery.data?.result.routes ?? [];
  const oneClickActions = routeQuery.data?.result.oneClickActions ?? [];

  useEffect(() => {
    if (!routes.length) {
      setSelectedRouteRank(null);
      return;
    }

    setSelectedRouteRank(prev => {
      if (prev != null && routes.some(route => route.rank === prev)) {
        return prev;
      }
      return routes[0].rank;
    });
  }, [routes]);

  const selectedRoute = routes.find(route => route.rank === selectedRouteRank) ?? null;
  const sourceStationName =
    stationOptions.find(station => station.id === sourceStationId)?.name ?? '출발역';
  const destinationStationName =
    stationOptions.find(station => station.id === destinationStationId)?.name ?? '도착역';

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
    <main className="min-h-screen bg-gray-10 px-4 pb-24 pt-4">
      <section className="rounded-3xl border border-gray-90 bg-gray-100 p-5 text-white">
        <p className="text-caption text-gray-50">A-HACHUL ROUTE REDESIGN</p>
        <h1 className="mt-2 text-title-large text-white">지하철 길찾기 허브</h1>
        <p className="mt-2 text-body-small text-gray-40">
          최단시간만이 아니라 환승 리스크, 접근성, 혼잡도, 막차 안전도까지 합산해 경로를 추천합니다.
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          <span className="rounded-full border border-green-30 bg-green-10 px-2 py-1 text-caption text-green-90">
            {selectedLine?.name ?? '호선 선택'}
          </span>
          <span className="rounded-full border border-gray-70 bg-gray-90 px-2 py-1 text-caption text-gray-20">
            {sourceStationName} {'->'} {destinationStationName}
          </span>
          <span className="rounded-full border border-blue-30 bg-blue-10 px-2 py-1 text-caption text-blue-90">
            추천 경로 {routes.length}개
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          {PANEL_TABS.map(tab => {
            const isActive = activeTab === tab.value;
            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => setActiveTab(tab.value)}
                className={
                  isActive
                    ? 'rounded-xl border border-key-color bg-key-color px-3 py-2 text-left'
                    : 'rounded-xl border border-gray-70 bg-gray-90 px-3 py-2 text-left'
                }
              >
                <p
                  className={
                    isActive ? 'text-label-medium text-white' : 'text-label-medium text-gray-20'
                  }
                >
                  {tab.label}
                </p>
                <p
                  className={
                    isActive ? 'mt-1 text-caption text-gray-20' : 'mt-1 text-caption text-gray-60'
                  }
                >
                  {tab.description}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {activeTab === 'PLANNER' ? (
        <section className="mt-3 rounded-3xl border border-gray-30 bg-white p-4">
          <h2 className="text-title-small text-gray-100">경로 입력</h2>
          <p className="mt-1 text-body-small text-gray-70">
            출발역/도착역과 이동 전략을 선택하면 바로 추천 경로를 계산합니다.
          </p>

          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <label className="text-label-small text-gray-80">
              호선
              <select
                value={selectedLineId}
                onChange={event => {
                  setSelectedLineId(Number(event.target.value));
                  setQueryStationApplied(true);
                }}
                className="mt-1 h-10 w-full rounded-xl border border-gray-40 bg-white px-3 text-body-small text-gray-100"
              >
                {subwayLines.map(line => (
                  <option key={line.id} value={line.id}>
                    {line.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="text-label-small text-gray-80">
              전략
              <select
                value={strategy}
                onChange={event => setStrategy(event.target.value as SubwayRouteStrategy)}
                className="mt-1 h-10 w-full rounded-xl border border-gray-40 bg-white px-3 text-body-small text-gray-100"
              >
                {STRATEGY_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="text-label-small text-gray-80">
              출발역
              <select
                value={sourceStationId}
                onChange={event => setSourceStationId(Number(event.target.value))}
                className="mt-1 h-10 w-full rounded-xl border border-gray-40 bg-white px-3 text-body-small text-gray-100"
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
                className="mt-1 h-10 w-full rounded-xl border border-gray-40 bg-white px-3 text-body-small text-gray-100"
              >
                {stationOptions.map(station => (
                  <option key={station.id} value={station.id}>
                    {station.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <h3 className="mt-4 text-label-medium text-gray-100">추천 경로</h3>
          {routeQuery.isFetching ? (
            <p className="mt-2 text-body-small text-gray-70">경로 계산 중...</p>
          ) : null}
          {routeQuery.isError ? (
            <p className="mt-2 text-body-small text-danger">경로를 계산하지 못했습니다.</p>
          ) : null}
          {!routeQuery.isFetching && !routeQuery.isError && !routes.length ? (
            <p className="mt-2 text-body-small text-gray-70">추천 가능한 경로가 없습니다.</p>
          ) : null}

          {!routeQuery.isFetching && !routeQuery.isError && routes.length ? (
            <div className="mt-2 grid gap-2">
              {routes.map(route => (
                <div
                  key={`planner-route-${route.rank}`}
                  className="rounded-2xl border border-gray-30 bg-gray-05 p-3"
                >
                  {renderRouteSummary(route)}
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedRouteRank(route.rank);
                      setActiveTab('TIMELINE');
                    }}
                    className="mt-2 h-9 w-full rounded-xl border border-key-color bg-white text-label-medium text-key-color"
                  >
                    타임라인 상세 보기
                  </button>
                </div>
              ))}
            </div>
          ) : null}
        </section>
      ) : null}

      {activeTab === 'TIMELINE' ? (
        <section className="mt-3 rounded-3xl border border-gray-30 bg-white p-4">
          <h2 className="text-title-small text-gray-100">타임라인 상세</h2>
          <p className="mt-1 text-body-small text-gray-70">
            탑승 위치, 환승 포인트, 혼잡도, 접근성 요소를 단계별로 확인합니다.
          </p>

          {selectedRoute == null ? (
            <p className="mt-3 text-body-small text-gray-70">
              먼저 길찾기 허브에서 경로를 선택해주세요.
            </p>
          ) : (
            <>
              <div className="mt-3 rounded-2xl border border-gray-30 bg-gray-05 p-3">
                {renderRouteSummary(selectedRoute)}
              </div>

              <div className="mt-3 rounded-2xl border border-gray-20 bg-white p-3">
                <p className="text-label-medium text-gray-100">이동 단계</p>
                <ol className="mt-2 grid gap-2">
                  {selectedRoute.nodes.map((node, index) => (
                    <li
                      key={`route-node-${node.order}`}
                      className="rounded-xl border border-gray-20 bg-gray-05 p-2"
                    >
                      <p className="text-label-small text-gray-100">
                        {index + 1}. {node.stationName}
                      </p>
                      <p className="mt-1 text-caption text-gray-70">
                        {node.isTransfer ? '환승 지점' : '이동 구간'}
                      </p>
                    </li>
                  ))}
                </ol>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {selectedRoute.edges.map((edge, index) => (
                    <span
                      key={`route-edge-${edge.fromStationId}-${edge.toStationId}-${index}`}
                      className="rounded-full bg-gray-20 px-2 py-0.5 text-caption text-gray-90"
                    >
                      {edge.subwayLineName}
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}
        </section>
      ) : null}

      {activeTab === 'COACH' ? (
        <section className="mt-3 rounded-3xl border border-gray-30 bg-white p-4">
          <h2 className="text-title-small text-gray-100">개인화/접근성 코치</h2>
          <p className="mt-1 text-body-small text-gray-70">
            사용 상황과 선호값을 반영해 접근성/혼잡/짐 모드까지 세밀하게 조정합니다.
          </p>

          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <label className="text-label-small text-gray-80">
              보행 선호
              <select
                value={walkingPreference}
                onChange={event =>
                  setWalkingPreference(event.target.value as SubwayRouteWalkingPreference)
                }
                className="mt-1 h-10 w-full rounded-xl border border-gray-40 bg-white px-3 text-body-small text-gray-100"
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
                className="mt-1 h-10 w-full rounded-xl border border-gray-40 bg-white px-3 text-body-small text-gray-100"
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
                className="mt-1 h-10 w-full rounded-xl border border-gray-40 bg-white px-3 text-body-small text-gray-100"
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
                className="mt-1 h-10 w-full rounded-xl border border-gray-40 bg-white px-3 text-body-small text-gray-100"
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
                className="mt-1 h-10 w-full rounded-xl border border-gray-40 bg-white px-3 text-body-small text-gray-100"
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
                className="mt-1 h-10 w-full rounded-xl border border-gray-40 bg-white px-3 text-body-small text-gray-100"
              >
                {LOCALE_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {oneClickActions.length ? (
            <div className="mt-3 rounded-2xl border border-gray-30 bg-gray-05 p-3">
              <p className="text-label-medium text-gray-100">다국어 긴급/신고 원클릭</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {oneClickActions.map(action => (
                  <button
                    key={action.actionType}
                    type="button"
                    onClick={() => {
                      void handleOneClickAction(action);
                    }}
                    className="rounded-full border border-gray-40 bg-white px-3 py-1 text-label-small text-gray-90"
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

          {selectedRoute ? (
            <div className="mt-3 grid gap-2">
              {selectedRoute.accessibilityProfile ? (
                <article className="rounded-2xl border border-gray-30 bg-white p-3">
                  <p className="text-label-medium text-gray-100">접근성 프로필</p>
                  <p className="mt-1 text-caption text-gray-70">
                    난이도{' '}
                    {resolveDifficultyLabel(
                      selectedRoute.accessibilityProfile.inStationDifficultyLevel,
                    )}{' '}
                    · 계단구간 {selectedRoute.accessibilityProfile.estimatedStairSections} ·
                    엘리베이터 친화 환승{' '}
                    {selectedRoute.accessibilityProfile.elevatorFriendlyTransferCount}
                  </p>
                  <p className="mt-1 text-caption text-gray-70">
                    {selectedRoute.accessibilityProfile.mobilityNote}
                  </p>
                </article>
              ) : null}

              {selectedRoute.boardingGuide ? (
                <article className="rounded-2xl border border-gray-30 bg-white p-3">
                  <p className="text-label-medium text-gray-100">탑승 위치 가이드</p>
                  <p className="mt-1 text-caption text-gray-70">
                    추천 칸 {selectedRoute.boardingGuide.primaryCarNo}
                    {selectedRoute.boardingGuide.transferOptimizedCarNo
                      ? ` / 환승 최적 칸 ${selectedRoute.boardingGuide.transferOptimizedCarNo}`
                      : ''}
                  </p>
                  <p className="mt-1 text-caption text-gray-70">
                    {selectedRoute.boardingGuide.reason}
                  </p>
                </article>
              ) : null}

              {selectedRoute.crowdingGuide ? (
                <article className="rounded-2xl border border-gray-30 bg-white p-3">
                  <p className="text-label-medium text-gray-100">혼잡도 가이드</p>
                  <p className="mt-1 text-caption text-gray-70">
                    현재 {resolveCrowdingLevelLabel(selectedRoute.crowdingGuide.predictedLevel)} ·
                    덜 붐비는 칸{' '}
                    {selectedRoute.crowdingGuide.lessCrowdedCars.join(', ') || '정보 없음'}
                  </p>
                  <p className="mt-1 text-caption text-gray-70">
                    {selectedRoute.crowdingGuide.recommendation}
                  </p>
                </article>
              ) : null}

              {selectedRoute.nearbyEssentials?.items?.length ? (
                <article className="rounded-2xl border border-gray-30 bg-white p-3">
                  <p className="text-label-medium text-gray-100">
                    {selectedRoute.nearbyEssentials.stationName} 주변 필수 정보
                  </p>
                  <div className="mt-2 grid gap-2">
                    {selectedRoute.nearbyEssentials.items.map(item => (
                      <div
                        key={`${selectedRoute.rank}-${item.essentialType}-${item.name}`}
                        className="rounded-xl border border-gray-20 bg-gray-05 p-2"
                      >
                        <p className="text-caption text-gray-90">
                          {resolveEssentialTypeLabel(item.essentialType)} · {item.name}
                        </p>
                        <p className="mt-1 text-caption text-gray-70">
                          도보 {item.walkingMinutes}분 · 운영 {item.operatingHours || '정보 없음'} ·
                          혼잡 {resolveCrowdingLevelLabel(item.crowdLevel)} · 신뢰도{' '}
                          {item.reliabilityScore}
                        </p>
                      </div>
                    ))}
                  </div>
                </article>
              ) : null}

              {selectedRoute.travelModeTags?.length ? (
                <div className="flex flex-wrap gap-1.5">
                  {selectedRoute.travelModeTags.map(tag => (
                    <span
                      key={`tag-${tag}`}
                      className="rounded-full bg-gray-100 px-2 py-1 text-caption text-white"
                    >
                      {resolveTravelTagLabel(tag)}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}
        </section>
      ) : null}

      {activeTab === 'TIMETABLE' ? (
        <section className="mt-3 rounded-3xl border border-gray-30 bg-white p-4">
          <h2 className="text-title-small text-gray-100">역 전체 시간표</h2>
          <p className="mt-1 text-body-small text-gray-70">
            선택한 출발역 기준 요일/상하행 전체 시간표를 제공합니다.
          </p>

          <div className="mt-2 flex flex-wrap gap-2">
            {WEEK_OPTIONS.map(option => (
              <button
                key={option.value}
                type="button"
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
            <p className="mt-2 text-body-small text-danger">시간표를 불러오지 못했습니다.</p>
          ) : null}

          {!timetableQuery.isFetching && !timetableQuery.isError
            ? selectedWeek?.upDownTimetables.map(timetable => (
                <div
                  key={timetable.upDownType}
                  className="mt-3 rounded-2xl border border-gray-30 bg-gray-05 p-3"
                >
                  <p className="text-label-medium text-gray-100">
                    {timetable.upDownType === 'UP' ? '상행' : '하행'}
                  </p>
                  {timetable.stationTimes.length === 0 ? (
                    <p className="mt-1 text-body-small text-gray-70">
                      제공 가능한 시간표가 없습니다.
                    </p>
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
              ))
            : null}
        </section>
      ) : null}
    </main>
  );
}
