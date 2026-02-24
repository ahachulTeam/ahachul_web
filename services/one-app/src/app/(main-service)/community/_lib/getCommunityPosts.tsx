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

const DEFAULT_FILTER_VALUE = '0';

export function resolveCommunityCategory(category: string | null): CommunityType {
  if (
    category === CommunityType.FREE ||
    category === CommunityType.HUMOR ||
    category === CommunityType.INSIGHT
  ) {
    return category;
  }

  return CommunityType.HOT;
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

export async function getCommunityPosts({
  pageParam,
  queryKey,
}: Props): Promise<ApiResponse<PaginatedList<CommunityPost>>> {
  const [, , querySignature] = queryKey;
  const filters = new URLSearchParams(querySignature);
  const category = resolveCommunityCategory(filters.get('category'));
  const keyword = filters.get('keyword')?.trim();
  const subwayLineIds = resolveSubwayLineIds(filters.get('subwayLineId'));
  const stationId = resolveStationId(filters.get('stationId'));

  const hasHashTagFilter = Boolean(filters.get('hashTag'));
  const hasWriterFilter = Boolean(filters.get('writer'));
  const endpoint =
    category !== CommunityType.HOT || hasHashTagFilter || hasWriterFilter
      ? API_PATHS.community.list
      : API_PATHS.community.hotList;

  const params = removeFalsyValues({
    ...(keyword && { content: keyword }),
    ...(filters.get('hashTag') && { hashTag: filters.get('hashTag') || '' }),
    ...(filters.get('writer') && { writer: filters.get('writer') || '' }),
    ...(subwayLineIds && { subwayLineIds }),
    ...(stationId && { stationId }),
    pageSize: API_PAGE_SIZE.list,
    sort: API_SORT.createdAtDesc,
    ...(pageParam && { pageToken: pageParam }),
    ...(category !== CommunityType.HOT && { categoryType: category }),
  }) as Partial<CommunityListParams>;

  return fetchClient(endpoint, {
    params: params as Record<string, string | number | boolean>,
    next: {
      tags: ['community', 'posts'],
    },
  });
}
