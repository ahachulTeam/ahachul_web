import { describe, expect, it } from 'vitest';

import { CurrentTrainArrivalType, UpDownType } from '@/types';

import { normalizeTrainInfoV2Response } from './subway';

describe('normalizeTrainInfoV2Response', () => {
  it('v2 응답을 기존 홈 UI 호환 형태로 변환한다', () => {
    const result = normalizeTrainInfoV2Response({
      generatedAt: '2026-02-23T22:00:00+09:00',
      dataSource: 'API',
      isStale: false,
      lastExternalRecptnAt: '2026-02-23T21:59:40+09:00',
      freshnessSec: 20,
      confidenceLevel: 'HIGH',
      trainRealTimes: [
        {
          trainNo: '2234',
          upDownType: UpDownType.UP,
          arrivalCode: 'BEFORE_STATION_ARRIVE',
          etaSec: 75,
          etaMinDisplay: 2,
          destinationStationDirection: '성수행',
          nextStationDirection: '신대방방면',
        },
      ],
    });

    expect(result.confidenceLevel).toBe('HIGH');
    expect(result.freshnessSec).toBe(20);
    expect(result.trainRealTimes[0]?.trainNum).toBe(2234);
    expect(result.trainRealTimes[0]?.currentArrivalTime).toBe(2);
    expect(result.trainRealTimes[0]?.currentTrainArrivalCode).toBe(
      CurrentTrainArrivalType.BEFORE_STATION_ARRIVE,
    );
  });

  it('알 수 없는 arrivalCode는 RUNNING으로 안전 변환한다', () => {
    const result = normalizeTrainInfoV2Response({
      generatedAt: '2026-02-23T22:00:00+09:00',
      dataSource: 'API',
      isStale: true,
      lastExternalRecptnAt: '2026-02-23T21:57:00+09:00',
      freshnessSec: 180,
      confidenceLevel: 'LOW',
      trainRealTimes: [
        {
          trainNo: 'A-UNKNOWN',
          upDownType: UpDownType.DOWN,
          arrivalCode: 'UNKNOWN_CODE',
          etaSec: 0,
          etaMinDisplay: 0,
          destinationStationDirection: '내선',
          nextStationDirection: '외선',
        },
      ],
    });

    expect(result.trainRealTimes[0]?.trainNum).toBe(0);
    expect(result.trainRealTimes[0]?.currentTrainArrivalCode).toBe(CurrentTrainArrivalType.RUNNING);
    expect(result.isStale).toBe(true);
  });
});
