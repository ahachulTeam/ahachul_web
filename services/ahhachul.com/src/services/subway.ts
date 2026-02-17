import { useQuery } from '@tanstack/react-query';

import {
  QUERY_GC_TIME,
  QUERY_STALE_TIME,
  buildQuerySignature,
  subwayQueryKeys,
} from '@ahhachul/domain';
import { formatSubwayLineInfo } from '@ahhachul/utils';

import { fetchSubwayLines, fetchTrainInfo } from '@/apis/request/subway';
import { TIMESTAMP } from '@/constants';
import { APITrainInfoParams } from '@/types';

export const subwayKeys = subwayQueryKeys;

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
    queryFn: () => fetchTrainInfo(params),
    staleTime: 15 * TIMESTAMP.SECOND,
    gcTime: QUERY_GC_TIME.feed,
    select: res => {
      return res.data.result;
    },
  });
};
