import { UseSuspenseQueryResult, useSuspenseQuery } from '@/src/queries/query';
import { getQueryKeys } from '@/src/queries/query-key';
import { type ITrainCongestionParams as GetTrainCongestionInfoRequestParams, ITrainCongestionInfo } from '@/src/types';
import { TRAIN_CONGESTION_KEY } from './keys';
import { getTrainCongestionInfo, getTrainURL } from '@/src/api/train';

export const useGetTrainCongestionInfo = (
  params: GetTrainCongestionInfoRequestParams,
): UseSuspenseQueryResult<ITrainCongestionInfo, Error> => {
  return useSuspenseQuery({
    queryKey: getQueryKeys(TRAIN_CONGESTION_KEY).list({ params, getTrainURL }),
    queryFn: async () => {
      return await getTrainCongestionInfo(params);
    },
    select: (res) => res.data.result,
    retry: 1,
  });
};
