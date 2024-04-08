import { UseQueryResult, useQuery } from '@/src/queries/query';
import { getQueryKeys } from '@/src/queries/query-key';
import { BLIND_LIST_KEY } from './keys';
import { getBlindDateURL, getBlindList } from '@/src/api/blindDate';

export const useGetBlindList = (): UseQueryResult<{}, Error> => {
  return useQuery({
    queryKey: getQueryKeys(BLIND_LIST_KEY).list({ getBlindDateURL }),
    queryFn: async () => {
      return await getBlindList();
    },
    retry: 3,
  });
};
