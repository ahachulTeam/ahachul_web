import { lostFoundQueryKeys } from '@ahhachul/domain';
import { removeFalsyValues } from '@ahhachul/utils';

import { fetchClient } from '@/lib/fetch-client';
import { LostFoundType, type ApiResponse, type LostFoundPost, type PaginatedList } from '@/types';

type Props = {
  pageParam?: string;
  queryKey: ReturnType<typeof lostFoundQueryKeys.list>;
};

export async function getLostFoundPosts({
  pageParam,
  queryKey,
}: Props): Promise<ApiResponse<PaginatedList<LostFoundPost>>> {
  const [, , querySignature] = queryKey;
  const filters = new URLSearchParams(querySignature);

  const params = removeFalsyValues({
    ...(filters.get('keyword') && { keyword: filters.get('keyword') || '' }),
    ...(filters.get('subwayLineId') && { subwayLineId: filters.get('subwayLineId') || '' }),
    pageSize: 10,
    ...(pageParam && { pageToken: pageParam }),
    ...{ lostType: filters.get('category') || LostFoundType.LOST },
  });

  return fetchClient('/lost-posts', {
    params: params as Record<string, string | number | boolean>,
    next: {
      tags: ['lost-found', 'posts'],
    },
  });
}
