import { API_PATHS } from '@ahhachul/http';

import type {
  DelayCenterOverviewResponse,
  DelayProofCreateResponse,
  DelayProofGetResponse,
} from '@/types';

import { createDelayProofV2, getDelayCenterOverviewV2, getDelayProofV2 } from './delay-proof';
import { fetchClient } from './fetch-client';

jest.mock('./fetch-client', () => ({
  fetchClient: jest.fn(),
}));

const mockedFetchClient = jest.mocked(fetchClient);

describe('delay-proof', () => {
  beforeEach(() => {
    mockedFetchClient.mockReset();
  });

  it('지연 증빙 발급 API를 절대 경로로 요청한다', async () => {
    const response: DelayProofCreateResponse = {
      code: '100',
      message: 'SUCCESS',
      result: {
        proofId: 'dpv2_01abc',
        issuedAt: '2026-02-24T10:21:12+09:00',
        expiresAt: '2026-02-25T10:21:12+09:00',
        grade: 'B',
        confidenceLevel: 'MEDIUM',
        evidenceSummary: {
          official: {
            matched: false,
            eventCount: 0,
            dataSource: 'OFFICIAL_FEED_NOT_CONFIGURED',
            incidents: [],
          },
          community: {
            signalCount: 0,
            distinctAuthors: 0,
            medianReportedDelayMin: null,
            confidenceLevel: 'LOW',
            signals: [],
          },
          realtime: {
            isStale: true,
            freshnessSec: 120,
            confidenceLevel: 'LOW',
            generatedAt: '2026-02-24T10:21:12+09:00',
          },
        },
        text: '지하철 지연으로 10:35 도착예정입니다.',
        shareUrl: 'https://ahhachul.com/proofs/dpv2_01abc',
        signature: 'c2lnbmF0dXJl',
      },
    };
    mockedFetchClient.mockResolvedValue(response);

    await createDelayProofV2({
      stationId: 201,
      subwayLineId: 2,
      upDownType: 'UP',
      expectedArrivalAt: '2026-02-24T10:35:00+09:00',
      customMessage: '최대한 빨리 가겠습니다.',
    });

    expect(mockedFetchClient).toHaveBeenCalledWith(
      expect.stringMatching(/http:\/\/localhost:\d+\/v2\/delay-proofs/),
      expect.objectContaining({
        method: 'POST',
      }),
    );
  });

  it('지연 증빙 조회 API를 절대 경로로 요청한다', async () => {
    const response: DelayProofGetResponse = {
      code: '100',
      message: 'SUCCESS',
      result: {
        proofId: 'dpv2_01abc',
        issuedAt: '2026-02-24T10:21:12+09:00',
        expiresAt: '2026-02-25T10:21:12+09:00',
        grade: 'B',
        confidenceLevel: 'MEDIUM',
        evidenceSummary: {
          official: {
            matched: false,
            eventCount: 0,
            dataSource: 'OFFICIAL_FEED_NOT_CONFIGURED',
            incidents: [],
          },
          community: {
            signalCount: 0,
            distinctAuthors: 0,
            medianReportedDelayMin: null,
            confidenceLevel: 'LOW',
            signals: [],
          },
          realtime: {
            isStale: true,
            freshnessSec: 120,
            confidenceLevel: 'LOW',
            generatedAt: '2026-02-24T10:21:12+09:00',
          },
        },
        text: '지하철 지연으로 10:35 도착예정입니다.',
        shareUrl: 'https://ahhachul.com/proofs/dpv2_01abc',
        signature: 'c2lnbmF0dXJl',
      },
    };
    mockedFetchClient.mockResolvedValue(response);

    await getDelayProofV2('dpv2_01abc');

    expect(mockedFetchClient).toHaveBeenCalledWith(
      expect.stringMatching(/http:\/\/localhost:\d+\/v2\/delay-proofs\/dpv2_01abc/),
    );
    expect(API_PATHS.subway.delayProofV2('dpv2_01abc')).toBe('/v2/delay-proofs/dpv2_01abc');
  });

  it('지연/사고 통합 센터 overview API를 절대 경로로 요청한다', async () => {
    const response: DelayCenterOverviewResponse = {
      code: '100',
      message: 'SUCCESS',
      result: {
        generatedAt: '2026-02-25T14:40:12+09:00',
        stationId: 201,
        subwayLineId: 2,
        upDownType: 'UP',
        realtime: {
          generatedAt: '2026-02-25T14:40:12+09:00',
          dataSource: 'API',
          isStale: false,
          freshnessSec: 27,
          confidenceLevel: 'HIGH',
          etaSec: 75,
          etaMinDisplay: 2,
          destinationStationDirection: '성수행',
          nextStationDirection: '신대방방면',
        },
        official: {
          dataSource: 'OFFICIAL_FEED',
          eventCount: 2,
          activeEventCount: 1,
          incidents: [],
        },
        community: {
          signalCount: 18,
          distinctAuthors: 11,
          medianReportedDelayMin: 8,
          confidenceLevel: 'HIGH',
          signals: [],
        },
        recommendation: {
          gradePreview: 'A',
          confidenceLevel: 'HIGH',
          estimatedDelayMin: 12,
          recommendedExpectedArrivalAt: '2026-02-25T14:52:12+09:00',
          recommendedMessage: '추천 증빙 문구',
        },
      },
    };
    mockedFetchClient.mockResolvedValue(response);

    await getDelayCenterOverviewV2({
      stationId: 201,
      subwayLineId: 2,
      upDownType: 'UP',
      windowMinutes: 30,
      incidentLimit: 10,
      signalLimit: 50,
    });

    expect(mockedFetchClient).toHaveBeenCalledWith(
      expect.stringMatching(/http:\/\/localhost:\d+\/v2\/delay-centers\/overview/),
      expect.objectContaining({
        params: expect.objectContaining({
          stationId: 201,
          subwayLineId: 2,
          upDownType: 'UP',
        }),
      }),
    );
    expect(API_PATHS.subway.delayCenterOverviewV2).toBe('/v2/delay-centers/overview');
  });
});
