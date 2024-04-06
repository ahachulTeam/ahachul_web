import { UseSuspenseQueryResult, useSuspenseQuery } from 'queries/query';
import { getQueryKeys } from 'queries/query-key';
import { type IComplaintDetail as GetComplaintDetailResponse } from 'types';
import { getComplaintDetail } from 'api/complaints';
import { COMPLAINTS_DETAIL_KEY } from './keys';

export const useGetComplaintDetail = (
  postId: string,
): UseSuspenseQueryResult<GetComplaintDetailResponse & { hasImage: boolean }> => {
  return useSuspenseQuery({
    queryKey: getQueryKeys(COMPLAINTS_DETAIL_KEY).detail(postId),
    queryFn: async () => {
      return await getComplaintDetail(postId);
    },
    select: (res) => {
      const hasImage = res.data.result.images.length > 0;
      return { ...res.data.result, hasImage };
    },
  });
};
