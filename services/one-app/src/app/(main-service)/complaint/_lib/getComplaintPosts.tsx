import { complaintQueryKeys } from '@ahhachul/domain';
import { API_PAGE_SIZE, API_PATHS, API_SORT } from '@ahhachul/http';
import { removeFalsyValues } from '@ahhachul/utils';

import { fetchClient } from '@/lib/fetch-client';
import { type ApiResponse, type PaginatedList } from '@/types';
import { type ComplaintListParams, type ComplaintPost } from '@/types/complaint';
import { extractTextFromLexical } from '@/utils';

type Props = {
  pageParam?: string;
  queryKey: ReturnType<typeof complaintQueryKeys.list>;
};

const DEFAULT_FILTER_VALUE = '0';

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

export async function getComplaintPosts({
  pageParam,
  queryKey,
}: Props): Promise<ApiResponse<PaginatedList<ComplaintPost>>> {
  const [, , querySignature] = queryKey;
  const filters = new URLSearchParams(querySignature);
  const keyword = filters.get('keyword')?.trim();
  const subwayLineIds = resolveSubwayLineIds(filters.get('subwayLineId'));
  const stationId = resolveStationId(filters.get('stationId'));

  const params = removeFalsyValues({
    ...(keyword && { keyword }),
    ...(subwayLineIds && { subwayLineIds }),
    ...(stationId && { stationId }),
    pageSize: API_PAGE_SIZE.list,
    sort: API_SORT.createdAtDesc,
    ...(pageParam && { pageToken: pageParam }),
  }) as Partial<ComplaintListParams>;

  const response = await fetchClient<ApiResponse<PaginatedList<ComplaintPost>>>(
    API_PATHS.complaint.list,
    {
      params: params as Record<string, string | number | boolean>,
      next: {
        tags: ['complaint', 'posts'],
      },
    },
  );

  return {
    ...response,
    result: {
      ...response.result,
      data: response.result.data.map(post => ({
        ...post,
        title: extractTextFromLexical(post.content, post.complaintType).slice(0, 20),
      })),
    },
  };
}
