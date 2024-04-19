import { useQuery } from 'queries/query';
import { getQueryKeys } from 'queries/query-key';
import { SUBWAY_INFO_LIST_KEY } from './keys';
import { SubwayApi } from 'api';

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
