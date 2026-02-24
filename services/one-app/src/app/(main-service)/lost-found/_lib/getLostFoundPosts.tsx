import { lostFoundQueryKeys } from '@ahhachul/domain';
import { API_PAGE_SIZE, API_PATHS } from '@ahhachul/http';
import { removeFalsyValues } from '@ahhachul/utils';

import { fetchClient } from '@/lib/fetch-client';
import { LostFoundType, type ApiResponse, type LostFoundPost, type PaginatedList } from '@/types';

type Props = {
  pageParam?: string;
  queryKey: ReturnType<typeof lostFoundQueryKeys.list>;
};

const DEFAULT_FILTER_VALUE = '0';

export function resolveLostType(category: string | null): LostFoundType {
  if (category === LostFoundType.ACQUIRE) {
    return LostFoundType.ACQUIRE;
  }

  return LostFoundType.LOST;
}

export function resolveSubwayLineIds(subwayLineId: string | null): string | undefined {
  if (!subwayLineId || subwayLineId === DEFAULT_FILTER_VALUE) {
    return undefined;
  }

  const parsed = Number(subwayLineId);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    return undefined;
  }

  return String(parsed);
}

export function resolveStationId(stationId: string | null): number | undefined {
  if (!stationId || stationId === DEFAULT_FILTER_VALUE) {
    return undefined;
  }

  const parsed = Number(stationId);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    return undefined;
  }

  return parsed;
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
  const stationId = resolveStationId(filters.get('stationId'));

  const params = removeFalsyValues({
    ...(keyword && { keyword }),
    ...(subwayLineIds && { subwayLineIds }),
    ...(stationId && { stationId }),
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
