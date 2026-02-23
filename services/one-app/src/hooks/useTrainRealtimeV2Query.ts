import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { buildQuerySignature, QUERY_GC_TIME, subwayRealtimeV2QueryKeys } from '@ahhachul/domain';

import { fetchTrainRealtimeWithFallback } from '@/lib/subway-realtime-v2';
import type { TrainRealtimeV2Query, TrainRealtimeV2Response } from '@/types';

export function useTrainRealtimeV2Query(
  params: TrainRealtimeV2Query,
  options?: Omit<UseQueryOptions<TrainRealtimeV2Response>, 'queryKey' | 'queryFn'>,
) {
  const signature = buildQuerySignature({
    stationId: params.stationId,
    subwayLineId: params.subwayLineId,
    upDownType: params.upDownType,
    limit: params.limit,
  });

  return useQuery<TrainRealtimeV2Response>({
    queryKey: subwayRealtimeV2QueryKeys.list(signature),
    queryFn: () => fetchTrainRealtimeWithFallback(params),
    staleTime: 20 * 1000,
    gcTime: QUERY_GC_TIME.feed,
    refetchInterval: 20 * 1000,
    refetchIntervalInBackground: false,
    retry: 1,
    ...options,
  });
}
