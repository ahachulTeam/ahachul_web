import { API_PATHS } from '@ahhachul/http';

import type { CommunityDelaySignalsResponse } from '@/types';

import { getCommunityDelaySignalsV2 } from './community-delay-signals';
import { fetchClient } from './fetch-client';

jest.mock('./fetch-client', () => ({
  fetchClient: jest.fn(),
}));

const mockedFetchClient = jest.mocked(fetchClient);

describe('community-delay-signals', () => {
  beforeEach(() => {
    mockedFetchClient.mockReset();
  });

  it('역/호선 신뢰 신호 API를 절대 경로로 요청한다', async () => {
    const response: CommunityDelaySignalsResponse = {
      code: '100',
      message: 'SUCCESS',
      result: {
        generatedAt: '2026-02-26T09:00:00+09:00',
        subwayLineId: 2,
        stationId: 201,
        windowMinutes: 30,
        timeSlotMinutes: 10,
        signalCount: 12,
        distinctAuthors: 7,
        medianReportedDelayMin: 6,
        confidenceLevel: 'HIGH',
        reliabilityBadgeLevel: 'SPIKE',
        sameTimeSlotSignalCount: 7,
        sameTimeSlotDistinctAuthors: 5,
        signals: [
          {
            postId: 1001,
            createdAt: '2026-02-26T08:54:00+09:00',
            writer: '출근러',
            matchedKeyword: '지연',
            reportedDelayMin: 8,
            snippet: '지연이 체감됩니다.',
          },
        ],
      },
    };

    mockedFetchClient.mockResolvedValue(response);

    await getCommunityDelaySignalsV2({
      subwayLineId: 2,
      stationId: 201,
      windowMinutes: 30,
      limit: 40,
    });

    expect(mockedFetchClient).toHaveBeenCalledWith(
      expect.stringMatching(/http:\/\/localhost:\d+\/v2\/community\/delay-signals/),
      expect.objectContaining({
        params: {
          subwayLineId: 2,
          stationId: 201,
          windowMinutes: 30,
          limit: 40,
        },
      }),
    );
    expect(API_PATHS.subway.communityDelaySignalsV2).toBe('/v2/community/delay-signals');
  });
});
