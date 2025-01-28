import { objectToQueryString, removeFalsyValues } from '@ahhachul/utils';

import { fetchClient } from '@/lib/fetch-client';
import { LostFoundType, type ApiResponse, type LostFoundPost, type PaginatedList } from '@/types';

type Props = {
  pageParam?: string;
  queryKey: [_1: string, _2: string, filters: string];
};

export async function getLostFoundPosts({
  pageParam,
  queryKey,
}: Props): Promise<ApiResponse<PaginatedList<LostFoundPost>>> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_1, _2, query] = queryKey;

  const filters = new URLSearchParams(query);

  const params = removeFalsyValues({
    ...(filters.get('keyword') && { keyword: filters.get('keyword') || '' }),
    ...(filters.get('subwayLineId') && { subwayLineId: filters.get('subwayLineId') || '' }),
    pageSize: 10,
    ...(pageParam && { pageToken: pageParam }),
    ...{ lostType: filters.get('category') || LostFoundType.LOST },
  });

  return await fetchClient(
    `${process.env.NEXT_PUBLIC_BASE_URL}/lost-posts?${objectToQueryString(params)}`,
    {
      next: {
        tags: ['lost-found', 'posts'],
      },
    },
  );
}
