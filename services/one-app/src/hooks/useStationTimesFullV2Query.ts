import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { buildQuerySignature, QUERY_GC_TIME } from '@ahhachul/domain';

import { fetchStationTimesFullV2 } from '@/lib/subway-realtime-v2';
import type { StationTimesFullV2Query, StationTimesFullV2Response } from '@/types';

const stationTimesFullV2QueryKeys = {
  all: ['station-times-full-v2'] as const,
  list: (signature = '') => [...stationTimesFullV2QueryKeys.all, signature] as const,
} as const;

export function useStationTimesFullV2Query(
  params: StationTimesFullV2Query,
  options?: Omit<UseQueryOptions<StationTimesFullV2Response>, 'queryKey' | 'queryFn'>,
) {
  const signature = buildQuerySignature({
    stationId: params.stationId,
    subwayLineId: params.subwayLineId,
  });

  return useQuery<StationTimesFullV2Response>({
    queryKey: stationTimesFullV2QueryKeys.list(signature),
    queryFn: () => fetchStationTimesFullV2(params),
    staleTime: 60 * 1000,
    gcTime: QUERY_GC_TIME.feed,
    retry: 1,
    ...options,
  });
}
