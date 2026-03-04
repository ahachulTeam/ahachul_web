import { describe, expect, it } from 'vitest';

import {
  StationSummaryAvailabilityStatus,
  StationSummaryDataSource,
  StationTimeWeekType,
  StationWeatherDataSource,
  UpDownType,
} from '@/types';

import {
  isStationTimeSummaryTemporarilyDelayed,
  resolveStationTimeWeekType,
  resolveSummaryStatusLabel,
  resolveWeatherSourceLabel,
} from './TrainRealTimes.helpers';

describe('TrainRealTimes.helpers', () => {
  it('주말 여부에 따라 요일 타입을 계산한다', () => {
    expect(resolveStationTimeWeekType(new Date('2026-03-04T10:00:00+09:00'))).toBe(
      StationTimeWeekType.WEEKDAY,
    );
    expect(resolveStationTimeWeekType(new Date('2026-03-07T10:00:00+09:00'))).toBe(
      StationTimeWeekType.SATURDAY,
    );
    expect(resolveStationTimeWeekType(new Date('2026-03-08T10:00:00+09:00'))).toBe(
      StationTimeWeekType.HOLIDAY,
    );
  });

  it('시간표 EMPTY 상태에서 지연 여부를 반영한 라벨을 반환한다', () => {
    expect(resolveSummaryStatusLabel(StationSummaryAvailabilityStatus.EMPTY, false)).toBe('미제공');
    expect(resolveSummaryStatusLabel(StationSummaryAvailabilityStatus.EMPTY, true)).toBe(
      '일시 지연',
    );
  });

  it('FALLBACK_EMPTY 소스가 있으면 임시 지연으로 판단한다', () => {
    expect(
      isStationTimeSummaryTemporarilyDelayed([
        {
          upDownType: UpDownType.UP,
          dataSource: StationSummaryDataSource.CACHE,
          stationTimesCount: 2,
          fallbackReasonCode: null,
        },
      ]),
    ).toBe(false);

    expect(
      isStationTimeSummaryTemporarilyDelayed([
        {
          upDownType: UpDownType.DOWN,
          dataSource: StationSummaryDataSource.FALLBACK_EMPTY,
          stationTimesCount: 0,
          fallbackReasonCode: 'UPSTREAM_DELAY',
        },
      ]),
    ).toBe(true);
  });

  it('날씨 데이터 소스/지연 플래그를 라벨로 변환한다', () => {
    expect(resolveWeatherSourceLabel(StationWeatherDataSource.API, false)).toBe('실시간');
    expect(resolveWeatherSourceLabel(StationWeatherDataSource.CACHE, true)).toBe('캐시(지연)');
    expect(resolveWeatherSourceLabel(StationWeatherDataSource.FALLBACK, false)).toBe('정보 지연');
  });
});
