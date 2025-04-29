import { useQuery } from '@tanstack/react-query';

import { fetchSubwayLines, fetchTrainInfo } from '@/apis/request/subway';
import { TIMESTAMP } from '@/constants';
import { APITrainInfoParams } from '@/types';
import { formatSubwayLineInfo } from '@/utils';

export const subwayKeys = {
  all: ['subway'] as const,
  subwayLine: () => [...subwayKeys.all, 'subway-line'] as const,
  trains: () => [...subwayKeys.all, 'list'] as const,
  train: (filters: (string | number)[]) => [...subwayKeys.trains(), ...filters] as const,
};

export const useFetchSubwayLines = () =>
  useQuery({
    queryKey: subwayKeys.subwayLine(),
    queryFn: fetchSubwayLines,
    gcTime: Infinity,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    select: res => {
      return formatSubwayLineInfo(res.data.result);
    },
  });

export const useFetchTrainInfo = (params: APITrainInfoParams) => {
  return useQuery({
    refetchInterval: 30 * TIMESTAMP.SECOND,
    queryKey: subwayKeys.train(Object.values(params)),
    queryFn: () => fetchTrainInfo(params),
    select: res => {
      return res.data.result;
    },
  });
};
