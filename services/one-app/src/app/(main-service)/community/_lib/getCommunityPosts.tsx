import { communityQueryKeys } from '@ahhachul/domain';
import { API_PAGE_SIZE, API_PATHS, API_SORT } from '@ahhachul/http';
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

  const hasHashTagFilter = Boolean(filters.get('hashTag'));
  const hasWriterFilter = Boolean(filters.get('writer'));
  const endpoint =
    hasHashTagFilter ||
    hasWriterFilter ||
    (filters.has('category') && filters.get('category') !== CommunityType.HOT)
      ? API_PATHS.community.list
      : API_PATHS.community.hotList;

  const params = removeFalsyValues({
    ...(filters.get('keyword') && { content: filters.get('keyword') || '' }),
    ...(filters.get('hashTag') && { hashTag: filters.get('hashTag') || '' }),
    ...(filters.get('writer') && { writer: filters.get('writer') || '' }),
    ...(filters.get('subwayLineId') && { subwayLineId: filters.get('subwayLineId') || '' }),
    pageSize: API_PAGE_SIZE.list,
    sort: API_SORT.createdAtDesc,
    ...(pageParam && { pageToken: pageParam }),
    ...(filters.has('category') &&
      filters.get('category') !== CommunityType.HOT && {
        categoryType: filters.get('category'),
      }),
  }) as Partial<CommunityListParams>;

  return fetchClient(endpoint, {
    params: params as Record<string, string | number | boolean>,
    next: {
      tags: ['community', 'posts'],
    },
  });
}
