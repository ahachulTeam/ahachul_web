import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { buildQuerySignature, QUERY_GC_TIME } from '@ahhachul/domain';

import { fetchSubwayRouteSearchV2 } from '@/lib/subway-realtime-v2';
import type { SubwayRouteSearchV2Query, SubwayRouteSearchV2Response } from '@/types';

const subwayRouteSearchV2QueryKeys = {
  all: ['subway-route-search-v2'] as const,
  list: (signature = '') => [...subwayRouteSearchV2QueryKeys.all, signature] as const,
} as const;

export function useSubwayRouteSearchV2Query(
  params: SubwayRouteSearchV2Query,
  options?: Omit<UseQueryOptions<SubwayRouteSearchV2Response>, 'queryKey' | 'queryFn'>,
) {
  const signature = buildQuerySignature({
    sourceStationId: params.sourceStationId,
    destinationStationId: params.destinationStationId,
    strategy: params.strategy,
    alternatives: params.alternatives,
  });

  return useQuery<SubwayRouteSearchV2Response>({
    queryKey: subwayRouteSearchV2QueryKeys.list(signature),
    queryFn: () => fetchSubwayRouteSearchV2(params),
    staleTime: 30 * 1000,
    gcTime: QUERY_GC_TIME.feed,
    retry: 1,
    ...options,
  });
}
