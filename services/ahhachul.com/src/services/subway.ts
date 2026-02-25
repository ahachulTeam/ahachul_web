import { useQuery } from '@tanstack/react-query';

import {
  QUERY_GC_TIME,
  QUERY_STALE_TIME,
  buildQuerySignature,
  subwayQueryKeys,
} from '@ahhachul/domain';
import { formatSubwayLineInfo } from '@ahhachul/utils';

import {
  fetchLastTrainRiskV2,
  fetchNearbyPlacesV2,
  fetchStationWeatherBriefV2,
  fetchQuickExitsV2,
  fetchStationTimesFullV2,
  fetchStationTimeSummaryV2,
  fetchSubwayRouteSearchV2,
  fetchSubwayLines,
  fetchTrainInfo,
  fetchTrainInfoV2,
  normalizeTrainInfoV2Response,
} from '@/apis/request/subway';
import { TIMESTAMP } from '@/constants';
import { APITrainInfoParams, RouteSearchStrategy, StationTimeWeekType, UpDownType } from '@/types';

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

export const useFetchSubwayLinesRaw = () =>
  useQuery({
    queryKey: [...subwayKeys.subwayLine(), 'raw'],
    queryFn: fetchSubwayLines,
    gcTime: QUERY_GC_TIME.static,
    staleTime: QUERY_STALE_TIME.static,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    select: res => res.data.result,
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
        const v2Response = await fetchTrainInfoV2(params);
        return {
          ...v2Response,
          data: {
            ...v2Response.data,
            result: normalizeTrainInfoV2Response(v2Response.data.result),
          },
        };
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

interface LastTrainRiskParams extends APITrainInfoParams {
  upDownType: UpDownType;
  stationTimeWeekType: StationTimeWeekType;
  walkingMinutes: number;
}

export const useFetchLastTrainRisk = (params: LastTrainRiskParams) => {
  const signature = buildQuerySignature({
    stationId: params.stationId,
    subwayLineId: params.subwayLineId,
    upDownType: params.upDownType,
    stationTimeWeekType: params.stationTimeWeekType,
    walkingMinutes: params.walkingMinutes,
  });

  return useQuery({
    queryKey: [...subwayKeys.trains(), 'last-train-risk-v2', signature],
    queryFn: () => fetchLastTrainRiskV2(params),
    staleTime: 10 * TIMESTAMP.SECOND,
    gcTime: QUERY_GC_TIME.feed,
    retry: 1,
    select: res => res.data.result,
  });
};

interface QuickExitsParams extends APITrainInfoParams {
  upDownType: UpDownType;
}

export const useFetchQuickExits = (params: QuickExitsParams) => {
  const signature = buildQuerySignature({
    stationId: params.stationId,
    subwayLineId: params.subwayLineId,
    upDownType: params.upDownType,
  });

  return useQuery({
    queryKey: [...subwayKeys.trains(), 'quick-exits-v2', signature],
    queryFn: () => fetchQuickExitsV2(params),
    staleTime: 30 * TIMESTAMP.SECOND,
    gcTime: QUERY_GC_TIME.feed,
    retry: 1,
    select: res => res.data.result,
  });
};

interface NearbyPlacesParams extends APITrainInfoParams {
  exitNo?: string;
  limit?: number;
}

export const useFetchNearbyPlaces = (params: NearbyPlacesParams) => {
  const signature = buildQuerySignature({
    stationId: params.stationId,
    subwayLineId: params.subwayLineId,
    exitNo: params.exitNo,
    limit: params.limit,
  });

  return useQuery({
    queryKey: [...subwayKeys.trains(), 'nearby-places-v2', signature],
    queryFn: () => fetchNearbyPlacesV2(params),
    staleTime: 60 * TIMESTAMP.SECOND,
    gcTime: QUERY_GC_TIME.feed,
    retry: 1,
    select: res => res.data.result,
  });
};

interface StationWeatherBriefParams {
  stationId: number;
}

export const useFetchStationWeatherBrief = (params: StationWeatherBriefParams) => {
  const signature = buildQuerySignature({
    stationId: params.stationId,
  });

  return useQuery({
    queryKey: [...subwayKeys.trains(), 'station-weather-brief-v2', signature],
    queryFn: () => fetchStationWeatherBriefV2(params),
    staleTime: 5 * TIMESTAMP.MINUTE,
    gcTime: QUERY_GC_TIME.feed,
    retry: 1,
    select: res => res.data.result,
  });
};

interface SubwayRouteSearchParams {
  sourceStationId: number;
  destinationStationId: number;
  strategy: RouteSearchStrategy;
  alternatives?: number;
}

export const useFetchSubwayRoutes = (
  params: SubwayRouteSearchParams,
  options?: { enabled?: boolean },
) => {
  const signature = buildQuerySignature({
    sourceStationId: params.sourceStationId,
    destinationStationId: params.destinationStationId,
    strategy: params.strategy,
    alternatives: params.alternatives,
  });

  return useQuery({
    queryKey: [...subwayKeys.trains(), 'route-search-v2', signature],
    queryFn: () => fetchSubwayRouteSearchV2(params),
    enabled: options?.enabled ?? true,
    staleTime: 30 * TIMESTAMP.SECOND,
    gcTime: QUERY_GC_TIME.feed,
    retry: 1,
    select: res => res.data.result,
  });
};

interface StationTimesFullParams extends APITrainInfoParams {}

export const useFetchStationTimesFull = (
  params: StationTimesFullParams,
  options?: { enabled?: boolean },
) => {
  const signature = buildQuerySignature({
    stationId: params.stationId,
    subwayLineId: params.subwayLineId,
  });

  return useQuery({
    queryKey: [...subwayKeys.trains(), 'station-times-full-v2', signature],
    queryFn: () => fetchStationTimesFullV2(params),
    enabled: options?.enabled ?? true,
    staleTime: 60 * TIMESTAMP.SECOND,
    gcTime: QUERY_GC_TIME.feed,
    retry: 1,
    select: res => res.data.result,
  });
};
