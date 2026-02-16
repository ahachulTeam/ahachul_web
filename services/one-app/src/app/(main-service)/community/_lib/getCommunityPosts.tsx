import { communityQueryKeys } from '@ahhachul/domain';
import { removeFalsyValues } from '@ahhachul/utils';

import { fetchClient } from '@/lib/fetch-client';
import { type ApiResponse, type PaginatedList } from '@/types';
import { type CommunityListParams, type CommunityPost, CommunityType } from '@/types/community';

type Props = {
  pageParam?: string;
  queryKey: ReturnType<typeof communityQueryKeys.list>;
};

export async function getCommunityPosts({
  pageParam,
  queryKey,
}: Props): Promise<ApiResponse<PaginatedList<CommunityPost>>> {
  const [, , querySignature] = queryKey;
  const filters = new URLSearchParams(querySignature);

  const endpoint =
    filters.has('category') && filters.get('category') !== CommunityType.HOT
      ? 'community-posts'
      : 'community-hot-posts';

  const params = removeFalsyValues({
    ...(filters.get('keyword') && { content: filters.get('keyword') || '' }),
    ...(filters.get('subwayLineId') && { subwayLineId: filters.get('subwayLineId') || '' }),
    pageSize: 10,
    sort: 'createdAt,desc',
    ...(pageParam && { pageToken: pageParam }),
    ...(filters.has('category') &&
      filters.get('category') !== CommunityType.HOT && {
        categoryType: filters.get('category'),
      }),
  }) as Partial<CommunityListParams>;

  return fetchClient(`/${endpoint}`, {
    params: params as Record<string, string | number | boolean>,
    next: {
      tags: ['community', 'posts'],
    },
  });
}
