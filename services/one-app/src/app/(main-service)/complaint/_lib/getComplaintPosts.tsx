import { complaintQueryKeys } from '@ahhachul/domain';
import { removeFalsyValues } from '@ahhachul/utils';

import { fetchClient } from '@/lib/fetch-client';
import { type ApiResponse, type PaginatedList, SubwayLineFilterOptions } from '@/types';
import { type ComplaintListParams, type ComplaintPost } from '@/types/complaint';
import { extractTextFromLexical } from '@/util';

type Props = {
  pageParam?: string;
  queryKey: ReturnType<typeof complaintQueryKeys.list>;
};

export async function getComplaintPosts({
  pageParam,
  queryKey,
}: Props): Promise<ApiResponse<PaginatedList<ComplaintPost>>> {
  const [, , querySignature] = queryKey;
  const filters = new URLSearchParams(querySignature);
  const subwayLineId = filters.get('subwayLineId');

  const params = removeFalsyValues({
    ...(filters.get('keyword') && { keyword: filters.get('keyword') || '' }),
    ...(subwayLineId &&
      subwayLineId !== SubwayLineFilterOptions.ALL_LINES && { subwayLineId: Number(subwayLineId) }),
    pageSize: 10,
    sort: 'createdAt,desc',
    ...(pageParam && { pageToken: pageParam }),
  }) as Partial<ComplaintListParams>;

  const response = await fetchClient<ApiResponse<PaginatedList<ComplaintPost>>>(
    '/complaint-posts',
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
