import { UseQueryResult, useQuery } from 'queries/query';
import { getQueryKeys } from 'queries/query-key';
import { BLIND_LIST_KEY } from './keys';
import { getBlindDateURL, getBlindList } from 'api/blindDate';

export const useGetBlindList = (): UseQueryResult<{}, Error> => {
  return useQuery({
    queryKey: getQueryKeys(BLIND_LIST_KEY).list({ getBlindDateURL }),
    queryFn: async () => {
      return await getBlindList();
    },
    retry: 3,
  });
};
