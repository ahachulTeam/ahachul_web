import { type CSSProperties, useEffect, useMemo, useState } from 'react';

import { type ActivityComponentType } from '@stackflow/react';

import { LayoutComponent } from '@/components';
import {
  useFetchStationTimesFull,
  useFetchSubwayLinesRaw,
  useFetchSubwayRoutes,
} from '@/services/subway';
import {
  RouteSearchStrategy,
  RouteWalkingPreference,
  StationTimeWeekType,
  type SubwayLine,
  type UpDownType,
} from '@/types';

type SubwayTimelineParams = {
  stationId?: number;
  subwayLineId?: number;
  stationName?: string;
};

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

const sectionStyle: CSSProperties = {
  border: '1px solid #E4E6EB',
  borderRadius: '12px',
  padding: '14px',
  background: '#FFFFFF',
};

const SubwayTimeLinePage: ActivityComponentType<SubwayTimelineParams> = ({
  params,
}: {
  params: SubwayTimelineParams;
}) => {
  const { data: linePayload, isLoading: isLineLoading } = useFetchSubwayLinesRaw();
  const subwayLines = linePayload?.subwayLines ?? [];

  const [selectedLineId, setSelectedLineId] = useState<number | null>(null);
  const [sourceStationId, setSourceStationId] = useState<number | null>(null);
  const [destinationStationId, setDestinationStationId] = useState<number | null>(null);
  const [selectedWeekType, setSelectedWeekType] = useState<StationTimeWeekType>(
    StationTimeWeekType.WEEKDAY,
  );
  const [strategy, setStrategy] = useState<RouteSearchStrategy>(RouteSearchStrategy.BALANCED);
  const [walkingPreference, setWalkingPreference] = useState<RouteWalkingPreference>(
    RouteWalkingPreference.FAST,
  );

  useEffect(() => {
    if (!subwayLines.length) {
      return;
    }

    const defaultLineId = Number(params.subwayLineId);
    const defaultLine = subwayLines.find(line => line.id === defaultLineId) ?? subwayLines[0];
    if (selectedLineId === null) {
      setSelectedLineId(defaultLine.id);
    }
  }, [params.subwayLineId, selectedLineId, subwayLines]);

  const selectedLine: SubwayLine | undefined = useMemo(() => {
    if (selectedLineId === null) {
      return undefined;
    }
    return subwayLines.find(line => line.id === selectedLineId);
  }, [selectedLineId, subwayLines]);

  const stations = selectedLine?.stations ?? [];

  useEffect(() => {
    if (!stations.length) {
      setSourceStationId(null);
      setDestinationStationId(null);
      return;
    }

    const firstStation = stations[0];
    const secondStation = stations[1] ?? stations[0];
    const defaultStationId = Number(params.stationId);
    const sourceCandidate =
      stations.find(station => station.id === defaultStationId) ?? firstStation;

    setSourceStationId(prev => {
      if (prev !== null && stations.some(station => station.id === prev)) {
        return prev;
      }
      return sourceCandidate.id;
    });

    setDestinationStationId(prev => {
      if (
        prev !== null &&
        stations.some(station => station.id === prev) &&
        prev !== sourceCandidate.id
      ) {
        return prev;
      }
      return secondStation.id;
    });
  }, [params.stationId, stations]);

  const hasRouteSearchParams = sourceStationId !== null && destinationStationId !== null;
  const routeQuery = useFetchSubwayRoutes(
    {
      sourceStationId: sourceStationId ?? 0,
      destinationStationId: destinationStationId ?? 0,
      strategy,
      alternatives: 3,
      walkingPreference,
      stationTimeWeekType: selectedWeekType,
    },
    {
      enabled: hasRouteSearchParams,
    },
  );

  const fullTimetableQuery = useFetchStationTimesFull(
    {
      stationId: sourceStationId ?? 0,
      subwayLineId: selectedLineId ?? 0,
    },
    {
      enabled: sourceStationId !== null && selectedLineId !== null,
    },
  );

  const selectedWeek = fullTimetableQuery.data?.weeks.find(
    week => week.stationTimeWeekType === selectedWeekType,
  );

  return (
    <LayoutComponent.Base>
      <div
        style={{
          minHeight: '100%',
          background: '#F8F9FB',
          padding: '16px',
          display: 'grid',
          gap: '12px',
        }}
      >
        <section style={sectionStyle}>
          <h1 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>지하철 길찾기</h1>
          <p style={{ color: '#5F6368', fontSize: '13px', marginBottom: '12px' }}>
            출발역/도착역을 고르면 최적 경로와 환승 정보를 제공합니다.
          </p>

          <div style={{ display: 'grid', gap: '8px' }}>
            <label style={{ fontSize: '12px', color: '#444' }}>
              호선
              <select
                value={selectedLineId ?? ''}
                onChange={event => setSelectedLineId(Number(event.target.value))}
                style={{ width: '100%', height: '36px', marginTop: '4px' }}
              >
                {subwayLines.map(line => (
                  <option key={line.id} value={line.id}>
                    {line.name}
                  </option>
                ))}
              </select>
            </label>

            <label style={{ fontSize: '12px', color: '#444' }}>
              출발역
              <select
                value={sourceStationId ?? ''}
                onChange={event => setSourceStationId(Number(event.target.value))}
                style={{ width: '100%', height: '36px', marginTop: '4px' }}
              >
                {stations.map(station => (
                  <option key={station.id} value={station.id}>
                    {station.name}
                  </option>
                ))}
              </select>
            </label>

            <label style={{ fontSize: '12px', color: '#444' }}>
              도착역
              <select
                value={destinationStationId ?? ''}
                onChange={event => setDestinationStationId(Number(event.target.value))}
                style={{ width: '100%', height: '36px', marginTop: '4px' }}
              >
                {stations.map(station => (
                  <option key={station.id} value={station.id}>
                    {station.name}
                  </option>
                ))}
              </select>
            </label>

            <label style={{ fontSize: '12px', color: '#444' }}>
              전략
              <select
                value={strategy}
                onChange={event => setStrategy(event.target.value as RouteSearchStrategy)}
                style={{ width: '100%', height: '36px', marginTop: '4px' }}
              >
                {STRATEGY_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label style={{ fontSize: '12px', color: '#444' }}>
              보행 선호
              <select
                value={walkingPreference}
                onChange={event =>
                  setWalkingPreference(event.target.value as RouteWalkingPreference)
                }
                style={{ width: '100%', height: '36px', marginTop: '4px' }}
              >
                {WALKING_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div style={{ marginTop: '12px', display: 'grid', gap: '8px' }}>
            {isLineLoading ? <div>호선 정보를 불러오는 중입니다.</div> : null}
            {routeQuery.isFetching ? <div>경로를 계산하는 중입니다.</div> : null}
            {routeQuery.isError ? (
              <div>경로를 찾지 못했습니다. 조건을 다시 확인해주세요.</div>
            ) : null}
            {!routeQuery.isFetching &&
              !routeQuery.isError &&
              (routeQuery.data?.routes ?? []).map(route => (
                <article
                  key={`route-${route.rank}`}
                  style={{
                    border: '1px solid #EAECEF',
                    borderRadius: '10px',
                    padding: '10px',
                    background: '#FBFBFD',
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: '14px' }}>경로 {route.rank}</div>
                  <div style={{ fontSize: '12px', color: '#5F6368', marginTop: '4px' }}>
                    정차 {route.summary.totalStops} · 환승 {route.summary.transferCount} · 예상{' '}
                    {route.summary.estimatedMinutes}분
                  </div>
                  {route.quality ? (
                    <div style={{ fontSize: '12px', marginTop: '4px' }}>
                      품질 {route.quality.totalScore}점 · 지연확률{' '}
                      {route.quality.delayProbabilityPercent}%
                    </div>
                  ) : null}
                  {route.quality?.badges?.length ? (
                    <div
                      style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginTop: '4px' }}
                    >
                      {route.quality.badges.map(badge => (
                        <span
                          key={`${route.rank}-${badge}`}
                          style={{
                            border: '1px solid #E2E8F0',
                            borderRadius: '999px',
                            padding: '1px 6px',
                            fontSize: '11px',
                            color: '#334155',
                            background: '#F8FAFC',
                          }}
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  ) : null}
                  <div style={{ fontSize: '12px', marginTop: '6px' }}>
                    {route.nodes.map(node => node.stationName).join(' → ')}
                  </div>
                  {route.quality?.reasons?.length ? (
                    <div style={{ fontSize: '12px', color: '#64748B', marginTop: '6px' }}>
                      {route.quality.reasons[0]}
                    </div>
                  ) : null}
                </article>
              ))}
          </div>
        </section>

        <section style={sectionStyle}>
          <h2 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px' }}>역 전체 시간표</h2>
          <p style={{ color: '#5F6368', fontSize: '13px', marginBottom: '12px' }}>
            선택한 출발역 기준으로 요일/상하행 전체 시간표를 확인합니다.
          </p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '10px' }}>
            {WEEK_OPTIONS.map(option => (
              <button
                key={option.value}
                onClick={() => setSelectedWeekType(option.value)}
                style={{
                  height: '30px',
                  padding: '0 10px',
                  borderRadius: '999px',
                  border:
                    selectedWeekType === option.value ? '1px solid #111' : '1px solid #D1D5DB',
                  background: selectedWeekType === option.value ? '#111' : '#FFF',
                  color: selectedWeekType === option.value ? '#FFF' : '#111',
                  cursor: 'pointer',
                }}
              >
                {option.label}
              </button>
            ))}
          </div>

          {fullTimetableQuery.isFetching ? <div>시간표를 불러오는 중입니다.</div> : null}
          {fullTimetableQuery.isError ? <div>시간표 조회에 실패했습니다.</div> : null}

          {!fullTimetableQuery.isFetching &&
            !fullTimetableQuery.isError &&
            selectedWeek?.upDownTimetables.map(timetable => (
              <div key={timetable.upDownType} style={{ marginBottom: '10px' }}>
                <div style={{ fontSize: '13px', fontWeight: 700 }}>
                  {resolveUpDownLabel(timetable.upDownType)}
                </div>
                {timetable.stationTimes.length === 0 ? (
                  <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>
                    제공 가능한 시간표가 없습니다.
                  </div>
                ) : (
                  <div style={{ marginTop: '4px', maxHeight: '160px', overflowY: 'auto' }}>
                    {timetable.stationTimes.slice(0, 40).map((time, index) => (
                      <div
                        key={`${timetable.upDownType}-${time.departureTime}-${index}`}
                        style={{ fontSize: '12px', padding: '2px 0', color: '#1F2937' }}
                      >
                        {time.departureTime.slice(0, 5)} · {time.arrivalStationName}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
        </section>
      </div>
    </LayoutComponent.Base>
  );
};

function resolveUpDownLabel(upDownType: UpDownType): string {
  return upDownType === 'UP' ? '상행' : '하행';
}

export default SubwayTimeLinePage;
