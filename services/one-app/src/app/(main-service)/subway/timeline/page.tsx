'use client';

import { useEffect, useMemo, useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { API_PATHS } from '@ahhachul/http';

import { useStationTimesFullV2Query, useSubwayRouteSearchV2Query } from '@/hooks';
import { fetchClient } from '@/lib/fetch-client';
import type { ApiResponse, StationTimeWeekType, SubwayRouteStrategy } from '@/types';

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

export default function SubwayTimelinePage() {
  const [selectedLineId, setSelectedLineId] = useState<number>(0);
  const [sourceStationId, setSourceStationId] = useState<number>(0);
  const [destinationStationId, setDestinationStationId] = useState<number>(0);
  const [strategy, setStrategy] = useState<SubwayRouteStrategy>('BALANCED');
  const [weekType, setWeekType] = useState<StationTimeWeekType>('WEEKDAY');

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
        </div>

        <div className="mt-3 grid gap-2">
          {routeQuery.isFetching ? (
            <p className="text-body-small text-gray-70">경로 계산 중...</p>
          ) : null}
          {routeQuery.isError ? (
            <p className="text-body-small text-danger">경로를 계산하지 못했습니다.</p>
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
              <p className="mt-1 text-body-small text-gray-70">
                {route.nodes.map(node => node.stationName).join(' → ')}
              </p>
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
