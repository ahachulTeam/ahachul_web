import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { buildQuerySignature, QUERY_GC_TIME } from '@ahhachul/domain';

import { fetchStationTimeSummaryV2 } from '@/lib/subway-realtime-v2';
import type { StationTimeSummaryV2Query, StationTimeSummaryV2Response } from '@/types';

const stationTimeSummaryV2QueryKeys = {
  all: ['station-time-summary-v2'] as const,
  list: (signature = '') => [...stationTimeSummaryV2QueryKeys.all, signature] as const,
} as const;

export function useStationTimeSummaryV2Query(
  params: StationTimeSummaryV2Query,
  options?: Omit<UseQueryOptions<StationTimeSummaryV2Response>, 'queryKey' | 'queryFn'>,
) {
  const signature = buildQuerySignature({
    stationId: params.stationId,
    subwayLineId: params.subwayLineId,
    stationTimeWeekType: params.stationTimeWeekType,
  });

  return useQuery<StationTimeSummaryV2Response>({
    queryKey: stationTimeSummaryV2QueryKeys.list(signature),
    queryFn: () => fetchStationTimeSummaryV2(params),
    staleTime: 20 * 1000,
    gcTime: QUERY_GC_TIME.feed,
    retry: 1,
    ...options,
  });
}
