import { useQuery } from '@/src/queries/query';
import { getQueryKeys } from '@/src/queries/query-key';
import { SUBWAY_INFO_LIST_KEY } from './keys';
import { SubwayApi } from '@/src/api';

export const useGetSubwayInfo = () => {
  return useQuery({
    queryKey: getQueryKeys(SUBWAY_INFO_LIST_KEY).list({}),
    queryFn: async () => {
      return await SubwayApi.getSubwayInfo();
    },
    select: (res) => res.data.result,
    staleTime: 0,
    retry: 1,
  });
};
