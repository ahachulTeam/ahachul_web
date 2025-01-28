import { objectToQueryString, removeFalsyValues } from '@ahhachul/utils';

import {
  LostFoundType,
  SubwayLineFilterOptions,
  type ApiResponse,
  type LostFoundPost,
  type PaginatedList,
} from '@/types';

type Props = {
  pageParam?: string;
  queryKey: [
    _1: string,
    _2: string,
    filters: { q?: string; category?: string; subwayLineId?: SubwayLineFilterOptions },
  ];
};

export async function getLostFoundPosts({
  pageParam,
  queryKey,
}: Props): Promise<ApiResponse<PaginatedList<LostFoundPost>>> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_1, _2, filters] = queryKey;

  const queryParams = removeFalsyValues(
    {
      pageSize: 10,
      ...(pageParam && { pageToken: pageParam }),
      ...(filters?.subwayLineId &&
        +filters.subwayLineId !== 0 && {
          subwayLineId: filters?.subwayLineId,
        }),
      ...(filters?.q && { keyword: filters.q }),
      ...{ lostType: filters?.category ?? LostFoundType.LOST },
    },
    { removeZero: true, removeEmptyStrings: true },
  );

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/lost-posts?${objectToQueryString(queryParams)}`,
    {
      next: {
        tags: ['lost-found', 'posts'],
      },
    },
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}
