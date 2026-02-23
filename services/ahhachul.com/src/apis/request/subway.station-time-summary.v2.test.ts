import { beforeEach, describe, expect, it, vi } from 'vitest';

import { API_PATHS } from '@ahhachul/http';

import axiosInstance from '@/apis/fetcher';
import { StationTimeWeekType } from '@/types';

import { fetchStationTimeSummaryV2 } from './subway';

vi.mock('@/apis/fetcher', () => ({
  default: {
    get: vi.fn(),
  },
}));

describe('fetchStationTimeSummaryV2', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('v2 역 첫차/막차 요약 경로로 요청한다', async () => {
    const mockedResponse = {
      data: {
        result: {
          stationTimeWeekType: StationTimeWeekType.WEEKDAY,
          summaries: [],
        },
      },
    };

    vi.mocked(axiosInstance.get).mockResolvedValue(mockedResponse as never);

    const params = {
      stationId: 201,
      subwayLineId: 2,
      stationTimeWeekType: StationTimeWeekType.WEEKDAY,
    };

    const result = await fetchStationTimeSummaryV2(params);

    expect(axiosInstance.get).toHaveBeenCalledWith(API_PATHS.subway.stationTimeSummaryV2, {
      params,
    });
    expect(result).toEqual(mockedResponse);
  });

  it('요청 파라미터를 그대로 전달한다', async () => {
    vi.mocked(axiosInstance.get).mockResolvedValue({ data: { result: {} } } as never);

    await fetchStationTimeSummaryV2({
      stationId: 622,
      subwayLineId: 3,
      stationTimeWeekType: StationTimeWeekType.SATURDAY,
    });

    const call = vi.mocked(axiosInstance.get).mock.calls[0];
    expect(call?.[1]).toEqual({
      params: {
        stationId: 622,
        subwayLineId: 3,
        stationTimeWeekType: StationTimeWeekType.SATURDAY,
      },
    });
  });
});
