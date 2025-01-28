import { objectToQueryString, removeFalsyValues } from '@ahhachul/utils';

import { fetchClient } from '@/lib/fetch-client';
import { type ApiResponse, type PaginatedList } from '@/types';
import { type CommunityListParams, type CommunityPost, CommunityType } from '@/types/community';

type Props = {
  pageParam?: string;
  queryKey: [_1: string, _2: string, filters: string];
};

export async function getCommunityPosts({
  pageParam,
  queryKey,
}: Props): Promise<ApiResponse<PaginatedList<CommunityPost>>> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_1, _2, query] = queryKey;

  const filters = new URLSearchParams(query);

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

  return await fetchClient(
    `${process.env.NEXT_PUBLIC_BASE_URL}/${endpoint}?${objectToQueryString(params)}`,
    {
      next: {
        tags: ['community', 'posts'],
      },
    },
  );
}
