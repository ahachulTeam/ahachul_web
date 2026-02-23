import { beforeEach, describe, expect, it, vi } from 'vitest';

import { API_PATHS } from '@ahhachul/http';

import axiosInstance from '@/apis/fetcher';

import { fetchNearbyPlacesV2 } from './subway';

vi.mock('@/apis/fetcher', () => ({
  default: {
    get: vi.fn(),
  },
}));

describe('fetchNearbyPlacesV2', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('v2 주변 장소 추천 경로로 요청한다', async () => {
    vi.mocked(axiosInstance.get).mockResolvedValue({ data: { result: {} } } as never);

    const params = {
      stationId: 622,
      subwayLineId: 3,
      limit: 3,
    };

    await fetchNearbyPlacesV2(params);

    expect(axiosInstance.get).toHaveBeenCalledWith(API_PATHS.subway.stationNearbyPlacesV2, {
      params,
    });
  });

  it('limit 파라미터를 포함한다', async () => {
    vi.mocked(axiosInstance.get).mockResolvedValue({ data: { result: {} } } as never);

    await fetchNearbyPlacesV2({
      stationId: 101,
      subwayLineId: 2,
      exitNo: '1',
      limit: 5,
    });

    const call = vi.mocked(axiosInstance.get).mock.calls[0];
    expect(call?.[1]).toEqual({
      params: {
        stationId: 101,
        subwayLineId: 2,
        exitNo: '1',
        limit: 5,
      },
    });
  });
});
