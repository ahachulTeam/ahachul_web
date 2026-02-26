import { beforeEach, describe, expect, it, vi } from 'vitest';

import { API_PATHS } from '@ahhachul/http';

import axiosInstance from '@/apis/fetcher';
import { StationTimeWeekType, UpDownType } from '@/types';

import { fetchLastTrainRiskV2 } from './subway';

vi.mock('@/apis/fetcher', () => ({
  default: {
    get: vi.fn(),
  },
}));

describe('fetchLastTrainRiskV2', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('v2 막차 리스크 경로로 요청한다', async () => {
    vi.mocked(axiosInstance.get).mockResolvedValue({ data: { result: {} } } as never);

    const params = {
      stationId: 622,
      subwayLineId: 3,
      upDownType: UpDownType.DOWN,
      stationTimeWeekType: StationTimeWeekType.WEEKDAY,
      walkingMinutes: 15,
    };

    await fetchLastTrainRiskV2(params);

    expect(axiosInstance.get).toHaveBeenCalledWith(API_PATHS.subway.stationLastTrainRiskV2, {
      params,
    });
  });

  it('walkingMinutes 파라미터를 포함한다', async () => {
    vi.mocked(axiosInstance.get).mockResolvedValue({ data: { result: {} } } as never);

    await fetchLastTrainRiskV2({
      stationId: 101,
      subwayLineId: 2,
      upDownType: UpDownType.UP,
      stationTimeWeekType: StationTimeWeekType.SATURDAY,
      walkingMinutes: 9,
    });

    const call = vi.mocked(axiosInstance.get).mock.calls[0];
    expect(call?.[1]).toEqual({
      params: {
        stationId: 101,
        subwayLineId: 2,
        upDownType: UpDownType.UP,
        stationTimeWeekType: StationTimeWeekType.SATURDAY,
        walkingMinutes: 9,
      },
    });
  });

  it('walkingMinutes 없이 요청해도 v2 막차 리스크를 호출한다', async () => {
    vi.mocked(axiosInstance.get).mockResolvedValue({ data: { result: {} } } as never);

    await fetchLastTrainRiskV2({
      stationId: 557,
      subwayLineId: 18,
      upDownType: UpDownType.UP,
      stationTimeWeekType: StationTimeWeekType.WEEKDAY,
    });

    expect(axiosInstance.get).toHaveBeenCalledWith(API_PATHS.subway.stationLastTrainRiskV2, {
      params: {
        stationId: 557,
        subwayLineId: 18,
        upDownType: UpDownType.UP,
        stationTimeWeekType: StationTimeWeekType.WEEKDAY,
      },
    });
  });
});
