import { UseSuspenseQueryResult, useSuspenseQuery } from 'queries/query';
import { getQueryKeys } from 'queries/query-key';
import { type ILostDetail as GetLostDetailResponse } from 'types';
import { getLostDetail } from 'api/lost';
import { LOST_DETAIL_KEY } from './keys';

export const useGetLostDetail = (
  postId: string,
): UseSuspenseQueryResult<GetLostDetailResponse & { hasImage: boolean }> => {
  return useSuspenseQuery({
    queryKey: getQueryKeys(LOST_DETAIL_KEY).detail(postId),
    queryFn: async () => {
      return await getLostDetail(postId);
    },
    select: (res) => {
      const hasImage = res.data.result.images.length > 0;
      return { ...res.data.result, hasImage };
    },
  });
};
