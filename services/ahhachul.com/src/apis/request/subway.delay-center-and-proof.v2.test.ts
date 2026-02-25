import { beforeEach, describe, expect, it, vi } from 'vitest';

import { API_PATHS } from '@ahhachul/http';

import axiosInstance from '@/apis/fetcher';
import { UpDownType } from '@/types';

import {
  createDelayProofV2,
  fetchCommunityDelaySignalsV2,
  fetchDelayCenterOverviewV2,
  fetchDelayProofV2,
} from './subway';

vi.mock('@/apis/fetcher', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

describe('delay center/proof v2 request', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('overview를 v2 delay-center 경로로 요청한다', async () => {
    vi.mocked(axiosInstance.get).mockResolvedValue({ data: { result: {} } } as never);

    const params = {
      stationId: 201,
      subwayLineId: 2,
      upDownType: UpDownType.UP,
      windowMinutes: 30,
      incidentLimit: 10,
      signalLimit: 100,
    };

    await fetchDelayCenterOverviewV2(params);

    expect(axiosInstance.get).toHaveBeenCalledWith(API_PATHS.subway.delayCenterOverviewV2, {
      params,
    });
  });

  it('증빙 발급을 v2 delay-proofs 경로로 POST 한다', async () => {
    vi.mocked(axiosInstance.post).mockResolvedValue({ data: { result: {} } } as never);

    const payload = {
      stationId: 201,
      subwayLineId: 2,
      upDownType: UpDownType.UP,
      expectedArrivalAt: '2026-02-25T15:00:00+09:00',
      customMessage: '최대한 빨리 가겠습니다.',
    };

    await createDelayProofV2(payload);

    expect(axiosInstance.post).toHaveBeenCalledWith(API_PATHS.subway.delayProofsV2, payload);
  });

  it('증빙 조회를 v2 delay-proofs/{id} 경로로 GET 한다', async () => {
    vi.mocked(axiosInstance.get).mockResolvedValue({ data: { result: {} } } as never);

    await fetchDelayProofV2('dpv2_01abc');

    expect(axiosInstance.get).toHaveBeenCalledWith('/v2/delay-proofs/dpv2_01abc');
  });

  it('커뮤니티 지연 신호를 v2 community/delay-signals 경로로 GET 한다', async () => {
    vi.mocked(axiosInstance.get).mockResolvedValue({ data: { result: {} } } as never);

    const params = {
      subwayLineId: 2,
      stationId: 201,
      windowMinutes: 30,
      limit: 40,
    };

    await fetchCommunityDelaySignalsV2(params);

    expect(axiosInstance.get).toHaveBeenCalledWith(API_PATHS.subway.communityDelaySignalsV2, {
      params,
    });
  });
});
