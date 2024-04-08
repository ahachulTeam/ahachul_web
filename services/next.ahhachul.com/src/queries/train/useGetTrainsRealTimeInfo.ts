import { UseQueryResult, useQuery } from '@/src/queries/query';
import { getQueryKeys } from '@/src/queries/query-key';
import { type ITrainParams as GetTrainsRealTimeInfoRequestParams, ITrainRealTimeInfo } from '@/src/types';
import { TRAINS_REAL_TIME_LIST_KEY } from './keys';
import { getTrainsRealTimeInfo, getTrainURL } from '@/src/api/train';

export const useGetTrainsRealTimeInfo = (
  params: GetTrainsRealTimeInfoRequestParams,
): UseQueryResult<ITrainRealTimeInfo, Error> => {
  return useQuery({
    queryKey: getQueryKeys(TRAINS_REAL_TIME_LIST_KEY).list({ params, getTrainURL }),
    queryFn: async () => {
      return await getTrainsRealTimeInfo(params);
    },
    select: (res) => res.data.result,
    staleTime: 0,
    retry: 1,
  });
};
