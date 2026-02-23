import { API_PATHS } from '@ahhachul/http';

import { API_ORIGIN_URL, TRAIN_REALTIME_V2_ENABLED } from '@/constants';
import type {
  StationTimeSummaryV2Query,
  StationTimeSummaryV2Response,
  TrainRealtimeV1Response,
  TrainRealtimeV2Query,
  TrainRealtimeV2Response,
} from '@/types';

import { fetchClient } from './fetch-client';

const TRAIN_REALTIME_V2_ENDPOINT = `${API_ORIGIN_URL}${API_PATHS.subway.trainRealTimesV2}`;
const STATION_TIME_SUMMARY_V2_ENDPOINT = `${API_ORIGIN_URL}${API_PATHS.subway.stationTimeSummaryV2}`;

function mapV1ToV2Response(v1: TrainRealtimeV1Response): TrainRealtimeV2Response {
  const generatedAt = new Date().toISOString();

  return {
    code: v1.code,
    message: v1.message,
    result: {
      generatedAt,
      dataSource: 'STALE_CACHE',
      isStale: true,
      lastExternalRecptnAt: generatedAt,
      freshnessSec: 999,
      confidenceLevel: 'LOW',
      trainRealTimes: v1.result.trainRealTimes.map(item => {
        const etaSec = Math.max(item.currentArrivalTime, 0);
        return {
          trainNo: item.trainNum,
          upDownType: item.upDownType,
          arrivalCode: item.currentTrainArrivalCode,
          etaSec,
          etaMinDisplay: Math.ceil(etaSec / 60),
          destinationStationDirection: item.destinationStationDirection,
          nextStationDirection: item.nextStationDirection,
        };
      }),
    },
  };
}

export async function fetchTrainRealtimeV2(
  params: TrainRealtimeV2Query,
): Promise<TrainRealtimeV2Response> {
  return fetchClient<TrainRealtimeV2Response>(TRAIN_REALTIME_V2_ENDPOINT, {
    params: {
      stationId: params.stationId,
      subwayLineId: params.subwayLineId,
      ...(params.upDownType && { upDownType: params.upDownType }),
      ...(params.limit && { limit: params.limit }),
    },
  });
}

export async function fetchTrainRealtimeV1(
  params: TrainRealtimeV2Query,
): Promise<TrainRealtimeV1Response> {
  return fetchClient<TrainRealtimeV1Response>(API_PATHS.subway.trainRealTimes, {
    params: {
      stationId: params.stationId,
      subwayLineId: params.subwayLineId,
      ...(params.upDownType && { upDownType: params.upDownType }),
    },
  });
}

export async function fetchTrainRealtimeWithFallback(
  params: TrainRealtimeV2Query,
  options: { forceV1?: boolean } = {},
): Promise<TrainRealtimeV2Response> {
  if (options.forceV1 || !TRAIN_REALTIME_V2_ENABLED) {
    const v1 = await fetchTrainRealtimeV1(params);
    return mapV1ToV2Response(v1);
  }

  try {
    return await fetchTrainRealtimeV2(params);
  } catch {
    const v1 = await fetchTrainRealtimeV1(params);
    return mapV1ToV2Response(v1);
  }
}

export async function fetchStationTimeSummaryV2(
  params: StationTimeSummaryV2Query,
): Promise<StationTimeSummaryV2Response> {
  return fetchClient<StationTimeSummaryV2Response>(STATION_TIME_SUMMARY_V2_ENDPOINT, {
    params: {
      stationId: params.stationId,
      subwayLineId: params.subwayLineId,
      stationTimeWeekType: params.stationTimeWeekType,
    },
  });
}
