import { API_PATHS } from '@ahhachul/http';

import type { TrainRealtimeV1Response, TrainRealtimeV2Response } from '@/types';

import { fetchClient } from './fetch-client';
import {
  fetchStationTimeSummaryV2,
  fetchTrainRealtimeWithFallback,
  fetchTrainRealtimeV2,
} from './subway-realtime-v2';

jest.mock('./fetch-client', () => ({
  fetchClient: jest.fn(),
}));

const mockedFetchClient = jest.mocked(fetchClient);

describe('subway-realtime-v2', () => {
  beforeEach(() => {
    mockedFetchClient.mockReset();
  });

  it('V2 실시간 API는 절대 경로로 요청한다', async () => {
    const response: TrainRealtimeV2Response = {
      code: '100',
      message: 'SUCCESS',
      result: {
        generatedAt: '2026-02-24T00:00:00+09:00',
        dataSource: 'API',
        isStale: false,
        lastExternalRecptnAt: '2026-02-24T00:00:00+09:00',
        freshnessSec: 0,
        confidenceLevel: 'HIGH',
        trainRealTimes: [],
      },
    };
    mockedFetchClient.mockResolvedValue(response);

    await fetchTrainRealtimeV2({
      stationId: 557,
      subwayLineId: 2,
      limit: 2,
    });

    expect(mockedFetchClient).toHaveBeenCalledWith(
      expect.stringMatching(/http:\/\/localhost:\d+\/v2\/trains\/real-times/),
      {
        params: {
          stationId: 557,
          subwayLineId: 2,
          limit: 2,
        },
      },
    );
  });

  it('V2 실패 시 V1 결과를 V2 형태로 fallback 한다', async () => {
    const v1Response: TrainRealtimeV1Response = {
      code: '100',
      message: 'SUCCESS',
      result: {
        trainRealTimes: [
          {
            trainNum: '2234',
            upDownType: 'UP',
            nextStationDirection: '신대방방면',
            destinationStationDirection: '성수행',
            currentArrivalTime: 75,
            currentTrainArrivalCode: 'BEFORE_STATION_ARRIVE',
          },
        ],
      },
    };

    mockedFetchClient
      .mockRejectedValueOnce(new Error('v2 failed'))
      .mockResolvedValueOnce(v1Response);

    const result = await fetchTrainRealtimeWithFallback({
      stationId: 557,
      subwayLineId: 2,
    });

    expect(result.result.confidenceLevel).toBe('LOW');
    expect(result.result.isStale).toBe(true);
    expect(result.result.dataSource).toBe('STALE_CACHE');
    expect(result.result.trainRealTimes[0]).toEqual(
      expect.objectContaining({
        trainNo: '2234',
        upDownType: 'UP',
        arrivalCode: 'BEFORE_STATION_ARRIVE',
      }),
    );

    expect(mockedFetchClient.mock.calls[1]?.[0]).toEqual(API_PATHS.subway.trainRealTimes);
  });

  it('역 첫차/막차 요약 API는 절대 경로로 요청한다', async () => {
    mockedFetchClient.mockResolvedValue({
      code: '100',
      message: 'SUCCESS',
      result: {
        stationTimeWeekType: 'WEEKDAY',
        summaries: [],
      },
    });

    await fetchStationTimeSummaryV2({
      stationId: 557,
      subwayLineId: 2,
      stationTimeWeekType: 'WEEKDAY',
    });

    expect(mockedFetchClient).toHaveBeenCalledWith(
      expect.stringMatching(/http:\/\/localhost:\d+\/v2\/stations\/times\/summary/),
      {
        params: {
          stationId: 557,
          subwayLineId: 2,
          stationTimeWeekType: 'WEEKDAY',
        },
      },
    );
  });
});
