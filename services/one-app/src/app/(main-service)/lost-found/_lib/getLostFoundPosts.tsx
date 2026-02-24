import { lostFoundQueryKeys } from '@ahhachul/domain';
import { API_PAGE_SIZE, API_PATHS } from '@ahhachul/http';
import { removeFalsyValues } from '@ahhachul/utils';

import { fetchClient } from '@/lib/fetch-client';
import {
  LostFoundType,
  SubwayLineFilterOptions,
  type ApiResponse,
  type LostFoundPost,
  type PaginatedList,
} from '@/types';

type Props = {
  pageParam?: string;
  queryKey: ReturnType<typeof lostFoundQueryKeys.list>;
};

export function resolveLostType(category: string | null): LostFoundType {
  if (category === LostFoundType.ACQUIRE) {
    return LostFoundType.ACQUIRE;
  }

  return LostFoundType.LOST;
}

export function resolveSubwayLineIds(subwayLineId: string | null): string | undefined {
  if (!subwayLineId || subwayLineId === SubwayLineFilterOptions.ALL_LINES) {
    return undefined;
  }

  return subwayLineId;
}

export async function getLostFoundPosts({
  pageParam,
  queryKey,
}: Props): Promise<ApiResponse<PaginatedList<LostFoundPost>>> {
  const [, , querySignature] = queryKey;
  const filters = new URLSearchParams(querySignature);
  const keyword = filters.get('keyword')?.trim();
  const lostType = resolveLostType(filters.get('category'));
  const subwayLineIds = resolveSubwayLineIds(filters.get('subwayLineId'));

  const params = removeFalsyValues({
    ...(keyword && { keyword }),
    ...(subwayLineIds && { subwayLineIds }),
    pageSize: API_PAGE_SIZE.list,
    ...(pageParam && { pageToken: pageParam }),
    lostType,
  });

  return fetchClient(API_PATHS.lostFound.list, {
    params: params as Record<string, string | number | boolean>,
    next: {
      tags: ['lost-found', 'posts'],
    },
  });
}
