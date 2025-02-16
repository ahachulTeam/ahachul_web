import { useQuery } from '@tanstack/react-query';

import { fetchTrainInfo } from '@/apis/request/subway';
import { APITrainInfoParams } from '@/types';

export const subwayKeys = {
  all: ['subway'] as const,
  lists: () => [...subwayKeys.all, 'list'] as const,
  list: (filters: (string | number)[]) => [...subwayKeys.lists(), ...filters] as const,
  details: () => [...subwayKeys.all, 'detail'] as const,
  detail: (id: number) => [...subwayKeys.details(), id] as const,
};

export const useFetchTrainInfo = (params: APITrainInfoParams) =>
  useQuery({
    queryKey: subwayKeys.list(Object.values(params)),
    queryFn: () => fetchTrainInfo(params),
    select: res => {
      return res.data.result;
    },
  });
