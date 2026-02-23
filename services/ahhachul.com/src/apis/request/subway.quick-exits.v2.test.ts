import { beforeEach, describe, expect, it, vi } from 'vitest';

import { API_PATHS } from '@ahhachul/http';

import axiosInstance from '@/apis/fetcher';
import { UpDownType } from '@/types';

import { fetchQuickExitsV2 } from './subway';

vi.mock('@/apis/fetcher', () => ({
  default: {
    get: vi.fn(),
  },
}));

describe('fetchQuickExitsV2', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('v2 빠른하차/출구 추천 경로로 요청한다', async () => {
    vi.mocked(axiosInstance.get).mockResolvedValue({ data: { result: {} } } as never);

    const params = {
      stationId: 622,
      subwayLineId: 3,
      upDownType: UpDownType.DOWN,
    };

    await fetchQuickExitsV2(params);

    expect(axiosInstance.get).toHaveBeenCalledWith(API_PATHS.subway.stationQuickExitsV2, {
      params,
    });
  });

  it('필수 파라미터를 포함한다', async () => {
    vi.mocked(axiosInstance.get).mockResolvedValue({ data: { result: {} } } as never);

    await fetchQuickExitsV2({
      stationId: 101,
      subwayLineId: 2,
      upDownType: UpDownType.UP,
    });

    const call = vi.mocked(axiosInstance.get).mock.calls[0];
    expect(call?.[1]).toEqual({
      params: {
        stationId: 101,
        subwayLineId: 2,
        upDownType: UpDownType.UP,
      },
    });
  });
});
