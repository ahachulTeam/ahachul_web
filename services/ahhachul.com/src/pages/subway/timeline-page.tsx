import { type CSSProperties, useEffect, useMemo, useState } from 'react';

import { type ActivityComponentType } from '@stackflow/react';

import { LayoutComponent } from '@/components';
import {
  useFetchStationTimesFull,
  useFetchSubwayLinesRaw,
  useFetchSubwayRoutes,
} from '@/services/subway';
import {
  RouteAccessibilityMode,
  RouteCrowdingPreference,
  RouteLuggageMode,
  RouteSearchStrategy,
  RouteTravelerContext,
  RouteWalkingPreference,
  StationTimeWeekType,
  type SubwayRoute,
  type UpDownType,
} from '@/types';

type SubwayTimelineParams = {
  stationId?: number;
  subwayLineId?: number;
  stationName?: string;
};

type RoutePanelTab = 'PLANNER' | 'TIMELINE' | 'COACH' | 'TIMETABLE';

type RouteOneClickAction = {
  actionType: string;
  title: string;
  deepLink: string;
  payloadTemplate: string | null;
};

const PANEL_TABS: { value: RoutePanelTab; label: string; description: string }[] = [
  { value: 'PLANNER', label: '길찾기 허브', description: '입력 + 추천 경로' },
  { value: 'TIMELINE', label: '타임라인 상세', description: '단계별 이동 흐름' },
  { value: 'COACH', label: '개인화/접근성', description: '접근성·혼잡·긴급액션' },
  { value: 'TIMETABLE', label: '역 전체 시간표', description: '요일·상하행 조회' },
];

const STRATEGY_OPTIONS: { value: RouteSearchStrategy; label: string }[] = [
  { value: RouteSearchStrategy.BALANCED, label: '균형(시간+환승)' },
  { value: RouteSearchStrategy.MIN_TRANSFER, label: '최소 환승' },
  { value: RouteSearchStrategy.MIN_STOP, label: '최소 정차' },
];

const WEEK_OPTIONS: { value: StationTimeWeekType; label: string }[] = [
  { value: StationTimeWeekType.WEEKDAY, label: '평일' },
  { value: StationTimeWeekType.SATURDAY, label: '토요일' },
  { value: StationTimeWeekType.HOLIDAY, label: '공휴일' },
];

const WALKING_OPTIONS: { value: RouteWalkingPreference; label: string }[] = [
  { value: RouteWalkingPreference.FAST, label: '빠른 이동' },
  { value: RouteWalkingPreference.LESS_STAIRS, label: '계단 적음' },
];

const ACCESSIBILITY_OPTIONS: { value: RouteAccessibilityMode; label: string }[] = [
  { value: RouteAccessibilityMode.BALANCED, label: '기본' },
  { value: RouteAccessibilityMode.ELEVATOR_PRIORITY, label: '엘리베이터 우선' },
  { value: RouteAccessibilityMode.STAIRS_MINIMIZED, label: '계단 최소' },
  { value: RouteAccessibilityMode.WHEELCHAIR, label: '휠체어' },
  { value: RouteAccessibilityMode.STROLLER, label: '유모차' },
];

const CROWDING_OPTIONS: { value: RouteCrowdingPreference; label: string }[] = [
  { value: RouteCrowdingPreference.BALANCED, label: '기본' },
  { value: RouteCrowdingPreference.LESS_CROWDED, label: '덜 붐비는 칸 우선' },
];

const LUGGAGE_OPTIONS: { value: RouteLuggageMode; label: string }[] = [
  { value: RouteLuggageMode.NORMAL, label: '기본' },
  { value: RouteLuggageMode.HEAVY_LUGGAGE, label: '짐 많음' },
  { value: RouteLuggageMode.AIRPORT_TRAVEL, label: '공항 이동' },
];

const TRAVELER_CONTEXT_OPTIONS: { value: RouteTravelerContext; label: string }[] = [
  { value: RouteTravelerContext.COMMUTE, label: '출퇴근' },
  { value: RouteTravelerContext.SCHOOL, label: '등하교' },
  { value: RouteTravelerContext.TRAVEL, label: '관광/여행' },
];

const LOCALE_OPTIONS: { value: 'ko' | 'en' | 'th' | 'cn'; label: string }[] = [
  { value: 'ko', label: '한국어' },
  { value: 'en', label: 'English' },
  { value: 'th', label: 'ไทย' },
  { value: 'cn', label: '中文' },
];

const baseSectionStyle: CSSProperties = {
  border: '1px solid #e5e7eb',
  borderRadius: 24,
  padding: 16,
  background: '#ffffff',
};

const fieldLabelStyle: CSSProperties = {
  fontSize: 12,
  color: '#4b5563',
  display: 'grid',
  gap: 6,
};

const fieldInputStyle: CSSProperties = {
  width: '100%',
  height: 40,
  borderRadius: 12,
  border: '1px solid #d1d5db',
  background: '#ffffff',
  color: '#111827',
  fontSize: 13,
  padding: '0 10px',
};

const pillStyle: CSSProperties = {
  borderRadius: 999,
  padding: '4px 10px',
  fontSize: 11,
  fontWeight: 600,
};

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

function resolveConfidenceStyle(level?: string): { label: string; style: CSSProperties } {
  if (level === 'HIGH') {
    return {
      label: '신뢰도 높음',
      style: { border: '1px solid #7adf97', background: '#eafbf0', color: '#0e7a2f' },
    };
  }

  if (level === 'MEDIUM') {
    return {
      label: '신뢰도 보통',
      style: { border: '1px solid #f4d06a', background: '#fff8e3', color: '#8d6200' },
    };
  }

  return {
    label: '신뢰도 낮음',
    style: { border: '1px solid #f3a1a1', background: '#fff0f0', color: '#9c2c2c' },
  };
}

function renderRouteSummary(route: SubwayRoute) {
  const confidenceStyle = resolveConfidenceStyle(route.quality?.confidenceLevel);

  return (
    <article
      style={{ border: '1px solid #e5e7eb', borderRadius: 16, background: '#fff', padding: 12 }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 8,
          alignItems: 'flex-start',
        }}
      >
        <div>
          <p style={{ fontSize: 13, color: '#111827', fontWeight: 700 }}>경로 {route.rank}</p>
          <p style={{ marginTop: 4, fontSize: 12, color: '#4b5563' }}>
            정차 {route.summary.totalStops} · 환승 {route.summary.transferCount} · 예상{' '}
            {route.summary.estimatedMinutes}분
          </p>
        </div>
        <span style={{ ...pillStyle, ...confidenceStyle.style }}>{confidenceStyle.label}</span>
      </div>

      {route.quality ? (
        <div
          style={{
            marginTop: 8,
            border: '1px solid #e5e7eb',
            borderRadius: 12,
            background: '#f9fafb',
            padding: 8,
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gap: 6,
          }}
        >
          <p style={{ margin: 0, fontSize: 11, color: '#374151' }}>
            품질점수 {route.quality.totalScore}
          </p>
          <p style={{ margin: 0, fontSize: 11, color: '#374151' }}>
            접근성 {route.quality.accessibilityScore}
          </p>
          <p style={{ margin: 0, fontSize: 11, color: '#374151' }}>
            혼잡쾌적 {route.quality.crowdingComfortScore}
          </p>
          <p style={{ margin: 0, fontSize: 11, color: '#374151' }}>
            지연확률 {route.quality.delayProbabilityPercent}%
          </p>
        </div>
      ) : null}

      {route.quality?.badges?.length ? (
        <div style={{ marginTop: 8, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {route.quality.badges.map(badge => (
            <span
              key={`${route.rank}-badge-${badge}`}
              style={{
                borderRadius: 999,
                background: '#eef2f7',
                color: '#334155',
                padding: '2px 8px',
                fontSize: 11,
              }}
            >
              {resolveBadgeLabel(badge)}
            </span>
          ))}
        </div>
      ) : null}

      <p style={{ marginTop: 8, marginBottom: 0, fontSize: 11, color: '#4b5563' }}>
        {route.nodes.map(node => node.stationName).join(' -> ')}
      </p>
    </article>
  );
}

const SubwayTimeLinePage: ActivityComponentType<SubwayTimelineParams> = ({
  params,
}: {
  params: SubwayTimelineParams;
}) => {
  const { data: linePayload, isLoading: isLineLoading } = useFetchSubwayLinesRaw();
  const subwayLines = linePayload?.subwayLines ?? [];

  const [activeTab, setActiveTab] = useState<RoutePanelTab>('PLANNER');
  const [selectedLineId, setSelectedLineId] = useState<number>(0);
  const [sourceStationId, setSourceStationId] = useState<number>(0);
  const [destinationStationId, setDestinationStationId] = useState<number>(0);
  const [selectedWeekType, setSelectedWeekType] = useState<StationTimeWeekType>(
    StationTimeWeekType.WEEKDAY,
  );
  const [strategy, setStrategy] = useState<RouteSearchStrategy>(RouteSearchStrategy.BALANCED);
  const [walkingPreference, setWalkingPreference] = useState<RouteWalkingPreference>(
    RouteWalkingPreference.FAST,
  );
  const [accessibilityMode, setAccessibilityMode] = useState<RouteAccessibilityMode>(
    RouteAccessibilityMode.BALANCED,
  );
  const [crowdingPreference, setCrowdingPreference] = useState<RouteCrowdingPreference>(
    RouteCrowdingPreference.BALANCED,
  );
  const [luggageMode, setLuggageMode] = useState<RouteLuggageMode>(RouteLuggageMode.NORMAL);
  const [travelerContext, setTravelerContext] = useState<RouteTravelerContext>(
    RouteTravelerContext.COMMUTE,
  );
  const [routeLocale, setRouteLocale] = useState<'ko' | 'en' | 'th' | 'cn'>('ko');
  const [oneClickNotice, setOneClickNotice] = useState<string | null>(null);
  const [selectedRouteRank, setSelectedRouteRank] = useState<number | null>(null);
  const [queryStationApplied, setQueryStationApplied] = useState(false);

  const queryLineId = Number(params.subwayLineId ?? 0);
  const queryStationId = Number(params.stationId ?? 0);
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

  const routeQuery = useFetchSubwayRoutes(
    {
      sourceStationId,
      destinationStationId,
      strategy,
      alternatives: 3,
      walkingPreference,
      stationTimeWeekType: selectedWeekType,
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

  const fullTimetableQuery = useFetchStationTimesFull(
    {
      stationId: sourceStationId,
      subwayLineId: selectedLineId,
    },
    {
      enabled: sourceStationId > 0 && selectedLineId > 0,
    },
  );

  const selectedWeek = useMemo(
    () =>
      fullTimetableQuery.data?.weeks.find(week => week.stationTimeWeekType === selectedWeekType),
    [fullTimetableQuery.data?.weeks, selectedWeekType],
  );

  const routes = routeQuery.data?.routes ?? [];
  const oneClickActions: RouteOneClickAction[] = routeQuery.data?.oneClickActions ?? [];

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

  const handleOneClickAction = async (action: RouteOneClickAction) => {
    if (action.actionType === 'COPY_EMERGENCY_PHRASE') {
      const phrase = action.payloadTemplate?.trim();
      if (!phrase) {
        setOneClickNotice('긴급 문구를 복사하지 못했습니다.');
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
    <LayoutComponent.Base>
      <main
        style={{
          minHeight: '100%',
          background: '#f3f4f6',
          padding: '16px 16px 96px',
          display: 'grid',
          gap: 12,
        }}
      >
        <section
          style={{
            borderRadius: 24,
            border: '1px solid #111827',
            background: '#111827',
            color: '#fff',
            padding: 20,
          }}
        >
          <p style={{ fontSize: 11, letterSpacing: 0.2, color: '#cbd5e1', margin: 0 }}>
            A-HACHUL ROUTE REDESIGN
          </p>
          <h1 style={{ margin: '8px 0 0', fontSize: 26, lineHeight: '32px', fontWeight: 800 }}>
            지하철 길찾기 허브
          </h1>
          <p style={{ margin: '8px 0 0', fontSize: 13, lineHeight: '20px', color: '#d1d5db' }}>
            최단시간만이 아니라 환승 리스크, 접근성, 혼잡도, 막차 안전도까지 합산해 경로를
            추천합니다.
          </p>

          <div style={{ marginTop: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <span
              style={{
                ...pillStyle,
                border: '1px solid #7adf97',
                background: '#eafbf0',
                color: '#0e7a2f',
              }}
            >
              {selectedLine?.name ?? '호선 선택'}
            </span>
            <span
              style={{
                ...pillStyle,
                border: '1px solid #4b5563',
                background: '#1f2937',
                color: '#d1d5db',
              }}
            >
              {sourceStationName} {'->'} {destinationStationName}
            </span>
            <span
              style={{
                ...pillStyle,
                border: '1px solid #93c5fd',
                background: '#e8f2ff',
                color: '#1d4ed8',
              }}
            >
              추천 경로 {routes.length}개
            </span>
          </div>

          <div
            style={{
              marginTop: 16,
              display: 'grid',
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              gap: 8,
            }}
          >
            {PANEL_TABS.map(tab => {
              const isActive = activeTab === tab.value;
              return (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => setActiveTab(tab.value)}
                  style={{
                    borderRadius: 12,
                    border: isActive ? '1px solid #22c55e' : '1px solid #374151',
                    background: isActive ? '#22c55e' : '#1f2937',
                    padding: '10px 12px',
                    textAlign: 'left',
                    cursor: 'pointer',
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      fontSize: 13,
                      color: isActive ? '#fff' : '#d1d5db',
                      fontWeight: 700,
                    }}
                  >
                    {tab.label}
                  </p>
                  <p
                    style={{
                      margin: '4px 0 0',
                      fontSize: 11,
                      color: isActive ? '#dcfce7' : '#9ca3af',
                    }}
                  >
                    {tab.description}
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        {activeTab === 'PLANNER' ? (
          <section style={baseSectionStyle}>
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#111827' }}>
              경로 입력
            </h2>
            <p style={{ margin: '6px 0 0', fontSize: 13, color: '#4b5563' }}>
              출발역/도착역과 이동 전략을 선택하면 바로 추천 경로를 계산합니다.
            </p>

            <div style={{ marginTop: 12, display: 'grid', gap: 12 }}>
              <label style={fieldLabelStyle}>
                호선
                <select
                  value={selectedLineId}
                  onChange={event => {
                    setSelectedLineId(Number(event.target.value));
                    setQueryStationApplied(true);
                  }}
                  style={fieldInputStyle}
                >
                  {subwayLines.map(line => (
                    <option key={line.id} value={line.id}>
                      {line.name}
                    </option>
                  ))}
                </select>
              </label>

              <label style={fieldLabelStyle}>
                전략
                <select
                  value={strategy}
                  onChange={event => setStrategy(event.target.value as RouteSearchStrategy)}
                  style={fieldInputStyle}
                >
                  {STRATEGY_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label style={fieldLabelStyle}>
                출발역
                <select
                  value={sourceStationId}
                  onChange={event => setSourceStationId(Number(event.target.value))}
                  style={fieldInputStyle}
                >
                  {stationOptions.map(station => (
                    <option key={station.id} value={station.id}>
                      {station.name}
                    </option>
                  ))}
                </select>
              </label>

              <label style={fieldLabelStyle}>
                도착역
                <select
                  value={destinationStationId}
                  onChange={event => setDestinationStationId(Number(event.target.value))}
                  style={fieldInputStyle}
                >
                  {stationOptions.map(station => (
                    <option key={station.id} value={station.id}>
                      {station.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <h3 style={{ margin: '16px 0 0', fontSize: 14, fontWeight: 700, color: '#111827' }}>
              추천 경로
            </h3>
            {isLineLoading ? (
              <p style={{ marginTop: 8, fontSize: 13, color: '#4b5563' }}>호선 정보 로딩 중...</p>
            ) : null}
            {routeQuery.isFetching ? (
              <p style={{ marginTop: 8, fontSize: 13, color: '#4b5563' }}>경로 계산 중...</p>
            ) : null}
            {routeQuery.isError ? (
              <p style={{ marginTop: 8, fontSize: 13, color: '#dc2626' }}>
                경로를 계산하지 못했습니다.
              </p>
            ) : null}
            {!routeQuery.isFetching && !routeQuery.isError && !routes.length ? (
              <p style={{ marginTop: 8, fontSize: 13, color: '#4b5563' }}>
                추천 가능한 경로가 없습니다.
              </p>
            ) : null}

            {!routeQuery.isFetching && !routeQuery.isError && routes.length ? (
              <div style={{ marginTop: 8, display: 'grid', gap: 8 }}>
                {routes.map(route => (
                  <div
                    key={`planner-route-${route.rank}`}
                    style={{
                      borderRadius: 16,
                      border: '1px solid #e5e7eb',
                      background: '#f9fafb',
                      padding: 12,
                    }}
                  >
                    {renderRouteSummary(route)}
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedRouteRank(route.rank);
                        setActiveTab('TIMELINE');
                      }}
                      style={{
                        marginTop: 8,
                        width: '100%',
                        height: 36,
                        borderRadius: 12,
                        border: '1px solid #22c55e',
                        background: '#fff',
                        color: '#16a34a',
                        fontSize: 13,
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
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
          <section style={baseSectionStyle}>
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#111827' }}>
              타임라인 상세
            </h2>
            <p style={{ margin: '6px 0 0', fontSize: 13, color: '#4b5563' }}>
              탑승 위치, 환승 포인트, 혼잡도, 접근성 요소를 단계별로 확인합니다.
            </p>

            {selectedRoute == null ? (
              <p style={{ marginTop: 12, fontSize: 13, color: '#4b5563' }}>
                먼저 길찾기 허브에서 경로를 선택해주세요.
              </p>
            ) : (
              <>
                <div
                  style={{
                    marginTop: 12,
                    borderRadius: 16,
                    border: '1px solid #e5e7eb',
                    background: '#f9fafb',
                    padding: 12,
                  }}
                >
                  {renderRouteSummary(selectedRoute)}
                </div>

                <div
                  style={{
                    marginTop: 12,
                    borderRadius: 16,
                    border: '1px solid #e5e7eb',
                    background: '#fff',
                    padding: 12,
                  }}
                >
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#111827' }}>
                    이동 단계
                  </p>
                  <ol
                    style={{
                      margin: '8px 0 0',
                      padding: 0,
                      listStyle: 'none',
                      display: 'grid',
                      gap: 8,
                    }}
                  >
                    {selectedRoute.nodes.map((node, index) => (
                      <li
                        key={`route-node-${node.order}`}
                        style={{
                          borderRadius: 12,
                          border: '1px solid #e5e7eb',
                          background: '#f9fafb',
                          padding: 10,
                        }}
                      >
                        <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: '#111827' }}>
                          {index + 1}. {node.stationName}
                        </p>
                        <p style={{ margin: '4px 0 0', fontSize: 11, color: '#6b7280' }}>
                          {node.isTransfer ? '환승 지점' : '이동 구간'}
                        </p>
                      </li>
                    ))}
                  </ol>

                  <div style={{ marginTop: 10, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {selectedRoute.edges.map((edge, index) => (
                      <span
                        key={`route-edge-${edge.fromStationId}-${edge.toStationId}-${index}`}
                        style={{
                          borderRadius: 999,
                          background: '#eef2f7',
                          color: '#334155',
                          fontSize: 11,
                          padding: '2px 8px',
                        }}
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
          <section style={baseSectionStyle}>
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#111827' }}>
              개인화/접근성 코치
            </h2>
            <p style={{ margin: '6px 0 0', fontSize: 13, color: '#4b5563' }}>
              사용 상황과 선호값을 반영해 접근성/혼잡/짐 모드까지 세밀하게 조정합니다.
            </p>

            <div style={{ marginTop: 12, display: 'grid', gap: 12 }}>
              <label style={fieldLabelStyle}>
                보행 선호
                <select
                  value={walkingPreference}
                  onChange={event =>
                    setWalkingPreference(event.target.value as RouteWalkingPreference)
                  }
                  style={fieldInputStyle}
                >
                  {WALKING_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label style={fieldLabelStyle}>
                접근성 모드
                <select
                  value={accessibilityMode}
                  onChange={event =>
                    setAccessibilityMode(event.target.value as RouteAccessibilityMode)
                  }
                  style={fieldInputStyle}
                >
                  {ACCESSIBILITY_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label style={fieldLabelStyle}>
                혼잡 선호
                <select
                  value={crowdingPreference}
                  onChange={event =>
                    setCrowdingPreference(event.target.value as RouteCrowdingPreference)
                  }
                  style={fieldInputStyle}
                >
                  {CROWDING_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label style={fieldLabelStyle}>
                짐 모드
                <select
                  value={luggageMode}
                  onChange={event => setLuggageMode(event.target.value as RouteLuggageMode)}
                  style={fieldInputStyle}
                >
                  {LUGGAGE_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label style={fieldLabelStyle}>
                이용 맥락
                <select
                  value={travelerContext}
                  onChange={event => setTravelerContext(event.target.value as RouteTravelerContext)}
                  style={fieldInputStyle}
                >
                  {TRAVELER_CONTEXT_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label style={fieldLabelStyle}>
                액션 언어
                <select
                  value={routeLocale}
                  onChange={event =>
                    setRouteLocale(event.target.value as 'ko' | 'en' | 'th' | 'cn')
                  }
                  style={fieldInputStyle}
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
              <div
                style={{
                  marginTop: 12,
                  borderRadius: 16,
                  border: '1px solid #e5e7eb',
                  background: '#f9fafb',
                  padding: 12,
                }}
              >
                <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#111827' }}>
                  다국어 긴급/신고 원클릭
                </p>
                <div style={{ marginTop: 8, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {oneClickActions.map(action => (
                    <button
                      key={action.actionType}
                      type="button"
                      onClick={() => {
                        void handleOneClickAction(action);
                      }}
                      style={{
                        borderRadius: 999,
                        border: '1px solid #d1d5db',
                        background: '#fff',
                        padding: '5px 12px',
                        fontSize: 12,
                        color: '#1f2937',
                        cursor: 'pointer',
                      }}
                    >
                      {action.title}
                    </button>
                  ))}
                </div>
                {oneClickNotice ? (
                  <p style={{ margin: '8px 0 0', fontSize: 12, color: '#4b5563' }}>
                    {oneClickNotice}
                  </p>
                ) : null}
              </div>
            ) : null}

            {selectedRoute ? (
              <div style={{ marginTop: 12, display: 'grid', gap: 8 }}>
                {selectedRoute.accessibilityProfile ? (
                  <article
                    style={{
                      borderRadius: 16,
                      border: '1px solid #e5e7eb',
                      background: '#fff',
                      padding: 12,
                    }}
                  >
                    <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#111827' }}>
                      접근성 프로필
                    </p>
                    <p style={{ margin: '4px 0 0', fontSize: 12, color: '#4b5563' }}>
                      난이도{' '}
                      {resolveDifficultyLabel(
                        selectedRoute.accessibilityProfile.inStationDifficultyLevel,
                      )}{' '}
                      · 계단구간 {selectedRoute.accessibilityProfile.estimatedStairSections} ·
                      엘리베이터 친화 환승{' '}
                      {selectedRoute.accessibilityProfile.elevatorFriendlyTransferCount}
                    </p>
                    <p style={{ margin: '4px 0 0', fontSize: 12, color: '#4b5563' }}>
                      {selectedRoute.accessibilityProfile.mobilityNote}
                    </p>
                  </article>
                ) : null}

                {selectedRoute.boardingGuide ? (
                  <article
                    style={{
                      borderRadius: 16,
                      border: '1px solid #e5e7eb',
                      background: '#fff',
                      padding: 12,
                    }}
                  >
                    <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#111827' }}>
                      탑승 위치 가이드
                    </p>
                    <p style={{ margin: '4px 0 0', fontSize: 12, color: '#4b5563' }}>
                      추천 칸 {selectedRoute.boardingGuide.primaryCarNo}
                      {selectedRoute.boardingGuide.transferOptimizedCarNo
                        ? ` / 환승 최적 칸 ${selectedRoute.boardingGuide.transferOptimizedCarNo}`
                        : ''}
                    </p>
                    <p style={{ margin: '4px 0 0', fontSize: 12, color: '#4b5563' }}>
                      {selectedRoute.boardingGuide.reason}
                    </p>
                  </article>
                ) : null}

                {selectedRoute.crowdingGuide ? (
                  <article
                    style={{
                      borderRadius: 16,
                      border: '1px solid #e5e7eb',
                      background: '#fff',
                      padding: 12,
                    }}
                  >
                    <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#111827' }}>
                      혼잡도 가이드
                    </p>
                    <p style={{ margin: '4px 0 0', fontSize: 12, color: '#4b5563' }}>
                      현재 {resolveCrowdingLevelLabel(selectedRoute.crowdingGuide.predictedLevel)} ·
                      덜 붐비는 칸{' '}
                      {selectedRoute.crowdingGuide.lessCrowdedCars.join(', ') || '정보 없음'}
                    </p>
                    <p style={{ margin: '4px 0 0', fontSize: 12, color: '#4b5563' }}>
                      {selectedRoute.crowdingGuide.recommendation}
                    </p>
                  </article>
                ) : null}

                {selectedRoute.nearbyEssentials?.items?.length ? (
                  <article
                    style={{
                      borderRadius: 16,
                      border: '1px solid #e5e7eb',
                      background: '#fff',
                      padding: 12,
                    }}
                  >
                    <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#111827' }}>
                      {selectedRoute.nearbyEssentials.stationName} 주변 필수 정보
                    </p>
                    <div style={{ marginTop: 8, display: 'grid', gap: 6 }}>
                      {selectedRoute.nearbyEssentials.items.map(item => (
                        <div
                          key={`${selectedRoute.rank}-${item.essentialType}-${item.name}`}
                          style={{
                            borderRadius: 12,
                            border: '1px solid #e5e7eb',
                            background: '#f9fafb',
                            padding: 10,
                          }}
                        >
                          <p style={{ margin: 0, fontSize: 12, color: '#111827' }}>
                            {resolveEssentialTypeLabel(item.essentialType)} · {item.name}
                          </p>
                          <p style={{ margin: '4px 0 0', fontSize: 11, color: '#4b5563' }}>
                            도보 {item.walkingMinutes}분 · 운영 {item.operatingHours || '정보 없음'}{' '}
                            · 혼잡 {resolveCrowdingLevelLabel(item.crowdLevel)} · 신뢰도{' '}
                            {item.reliabilityScore}
                          </p>
                        </div>
                      ))}
                    </div>
                  </article>
                ) : null}

                {selectedRoute.travelModeTags?.length ? (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {selectedRoute.travelModeTags.map(tag => (
                      <span
                        key={`travel-tag-${tag}`}
                        style={{
                          borderRadius: 999,
                          background: '#111827',
                          color: '#fff',
                          padding: '4px 10px',
                          fontSize: 11,
                          fontWeight: 600,
                        }}
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
          <section style={baseSectionStyle}>
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#111827' }}>
              역 전체 시간표
            </h2>
            <p style={{ margin: '6px 0 0', fontSize: 13, color: '#4b5563' }}>
              선택한 출발역 기준 요일/상하행 전체 시간표를 제공합니다.
            </p>

            <div style={{ marginTop: 8, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {WEEK_OPTIONS.map(option => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setSelectedWeekType(option.value)}
                  style={{
                    height: 32,
                    borderRadius: 999,
                    border:
                      selectedWeekType === option.value ? '1px solid #111827' : '1px solid #d1d5db',
                    background: selectedWeekType === option.value ? '#111827' : '#ffffff',
                    color: selectedWeekType === option.value ? '#ffffff' : '#111827',
                    fontSize: 12,
                    fontWeight: 600,
                    padding: '0 12px',
                    cursor: 'pointer',
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>

            {fullTimetableQuery.isFetching ? (
              <p style={{ marginTop: 8, fontSize: 13, color: '#4b5563' }}>시간표 로딩 중...</p>
            ) : null}
            {fullTimetableQuery.isError ? (
              <p style={{ marginTop: 8, fontSize: 13, color: '#dc2626' }}>
                시간표를 불러오지 못했습니다.
              </p>
            ) : null}

            {!fullTimetableQuery.isFetching && !fullTimetableQuery.isError
              ? selectedWeek?.upDownTimetables.map(timetable => (
                  <div
                    key={timetable.upDownType}
                    style={{
                      marginTop: 12,
                      borderRadius: 16,
                      border: '1px solid #e5e7eb',
                      background: '#f9fafb',
                      padding: 12,
                    }}
                  >
                    <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#111827' }}>
                      {resolveUpDownLabel(timetable.upDownType)}
                    </p>
                    {timetable.stationTimes.length === 0 ? (
                      <p style={{ margin: '6px 0 0', fontSize: 12, color: '#4b5563' }}>
                        제공 가능한 시간표가 없습니다.
                      </p>
                    ) : (
                      <div style={{ marginTop: 6, maxHeight: 176, overflowY: 'auto' }}>
                        {timetable.stationTimes.slice(0, 40).map((item, index) => (
                          <p
                            key={`${timetable.upDownType}-${item.departureTime}-${index}`}
                            style={{ margin: '0 0 4px', fontSize: 12, color: '#374151' }}
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
    </LayoutComponent.Base>
  );
};

function resolveUpDownLabel(upDownType: UpDownType): string {
  return upDownType === 'UP' ? '상행' : '하행';
}

export default SubwayTimeLinePage;
