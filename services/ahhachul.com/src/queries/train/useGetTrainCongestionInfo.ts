import { UseSuspenseQueryResult, useSuspenseQuery } from 'queries/query';
import { getQueryKeys } from 'queries/query-key';
import { type ITrainCongestionParams as GetTrainCongestionInfoRequestParams, ITrainCongestionInfo } from 'types';
import { TRAIN_CONGESTION_KEY } from './keys';
import { getTrainCongestionInfo, getTrainURL } from 'api/train';

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
