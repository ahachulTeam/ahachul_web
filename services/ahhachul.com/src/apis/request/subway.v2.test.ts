import { describe, expect, it, vi, beforeEach } from 'vitest';

import { API_PATHS } from '@ahhachul/http';

import axiosInstance from '@/apis/fetcher';

import { fetchSubwayRouteSearchV3, fetchTrainInfoV2 } from './subway';

vi.mock('@/apis/fetcher', () => ({
  default: {
    get: vi.fn(),
  },
}));

describe('fetchTrainInfoV2', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('v2 실시간 도착정보 경로로 요청한다', async () => {
    const mockedResponse = {
      data: {
        result: {
          generatedAt: '2026-02-23T22:00:00+09:00',
          dataSource: 'API',
          isStale: false,
          lastExternalRecptnAt: '2026-02-23T21:59:45+09:00',
          freshnessSec: 15,
          confidenceLevel: 'HIGH',
          trainRealTimes: [],
        },
      },
    };

    vi.mocked(axiosInstance.get).mockResolvedValue(mockedResponse as never);

    const params = {
      stationId: 201,
      subwayLineId: 2,
    };

    const result = await fetchTrainInfoV2(params);

    const [url, config] = vi.mocked(axiosInstance.get).mock.calls[0] ?? [];
    expect(url).toEqual(expect.stringContaining(API_PATHS.subway.trainRealTimesV2));
    expect(config).toEqual({ params });
    expect(result).toEqual(mockedResponse);
  });

  it('요청 파라미터를 그대로 전달한다', async () => {
    vi.mocked(axiosInstance.get).mockResolvedValue({ data: { result: {} } } as never);

    await fetchTrainInfoV2({
      stationId: 101,
      subwayLineId: 1,
    });

    const call = vi.mocked(axiosInstance.get).mock.calls[0];
    expect(call?.[1]).toEqual({
      params: {
        stationId: 101,
        subwayLineId: 1,
      },
    });
  });
});

describe('fetchSubwayRouteSearchV3', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('v3 경로탐색 경로로 요청한다', async () => {
    vi.mocked(axiosInstance.get).mockResolvedValue({ data: { result: {} } } as never);

    const params = {
      sourceStationId: 201,
      destinationStationId: 301,
      strategy: 'BALANCED' as const,
      alternatives: 3,
      walkingPreference: 'LESS_STAIRS' as const,
      stationTimeWeekType: 'WEEKDAY' as const,
    };

    await fetchSubwayRouteSearchV3(params);

    const [url, config] = vi.mocked(axiosInstance.get).mock.calls[0] ?? [];
    expect(url).toEqual(expect.stringContaining(API_PATHS.subway.routeSearchV3));
    expect(config).toEqual({ params });
  });
});
