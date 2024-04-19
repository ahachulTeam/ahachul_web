import { UseSuspenseQueryResult, useSuspenseQuery } from '@/src/queries/query';
import { getCommunityDetail } from '@/src/api/community';
import { getQueryKeys } from '@/src/queries/query-key';
import { type ICommunityDetail as GetCommunityDetailResponse } from '@/src/types';
import { COMMUNITY_DETAIL_KEY } from './keys';

export const useGetCommunityDetail = (
  postId: string,
): UseSuspenseQueryResult<GetCommunityDetailResponse & { hasImage: boolean }> => {
  return useSuspenseQuery({
    queryKey: getQueryKeys(COMMUNITY_DETAIL_KEY).detail(postId),
    queryFn: async () => {
      return await getCommunityDetail(postId);
    },
    select: (res) => {
      const hasImage = res.data.result.images.length > 0;
      return { ...res.data.result, hasImage };
    },
  });
};
