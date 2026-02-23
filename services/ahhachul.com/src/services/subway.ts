import { useQuery } from '@tanstack/react-query';

import {
  QUERY_GC_TIME,
  QUERY_STALE_TIME,
  buildQuerySignature,
  subwayQueryKeys,
} from '@ahhachul/domain';
import { formatSubwayLineInfo } from '@ahhachul/utils';

import {
  fetchStationTimeSummaryV2,
  fetchSubwayLines,
  fetchTrainInfo,
  fetchTrainInfoV2,
} from '@/apis/request/subway';
import { TIMESTAMP } from '@/constants';
import { APITrainInfoParams, StationTimeWeekType } from '@/types';

export const subwayKeys = subwayQueryKeys;

const isTrainRealtimeV2Enabled = import.meta.env.VITE_TRAIN_REALTIME_V2_ENABLED === 'true';

export const useFetchSubwayLines = () =>
  useQuery({
    queryKey: subwayKeys.subwayLine(),
    queryFn: fetchSubwayLines,
    gcTime: QUERY_GC_TIME.static,
    staleTime: QUERY_STALE_TIME.static,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    select: res => {
      return formatSubwayLineInfo(res.data.result);
    },
  });

export const useFetchTrainInfo = (params: APITrainInfoParams) => {
  const trainQuerySignature = buildQuerySignature({
    subwayLineId: params.subwayLineId,
    stationId: params.stationId,
  });

  return useQuery({
    refetchInterval: 30 * TIMESTAMP.SECOND,
    queryKey: subwayKeys.train(trainQuerySignature),
    queryFn: async () => {
      if (!isTrainRealtimeV2Enabled) {
        return fetchTrainInfo(params);
      }

      try {
        return await fetchTrainInfoV2(params);
      } catch {
        return fetchTrainInfo(params);
      }
    },
    staleTime: 15 * TIMESTAMP.SECOND,
    gcTime: QUERY_GC_TIME.feed,
    select: res => {
      return res.data.result;
    },
  });
};

interface StationTimeSummaryParams extends APITrainInfoParams {
  stationTimeWeekType: StationTimeWeekType;
}

export const useFetchStationTimesSummary = (params: StationTimeSummaryParams) => {
  const stationTimeSummarySignature = buildQuerySignature({
    subwayLineId: params.subwayLineId,
    stationId: params.stationId,
    stationTimeWeekType: params.stationTimeWeekType,
  });

  return useQuery({
    queryKey: [...subwayKeys.trains(), 'station-time-summary-v2', stationTimeSummarySignature],
    queryFn: () => fetchStationTimeSummaryV2(params),
    staleTime: QUERY_STALE_TIME.feed,
    gcTime: QUERY_GC_TIME.feed,
    retry: 1,
    select: res => {
      return res.data.result;
    },
  });
};
