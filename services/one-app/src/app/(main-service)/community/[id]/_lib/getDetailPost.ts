import { QueryFunction } from '@tanstack/react-query';

import { communityQueryKeys } from '@ahhachul/domain';
import { API_PATHS } from '@ahhachul/http';

import { API_BASE_URL } from '@/constant';
import type { IResponse } from '@/types';
import type { CommunityDetail } from '@/types/community';

export const getCommunityDetailPost: QueryFunction<
  IResponse<CommunityDetail>,
  ReturnType<typeof communityQueryKeys.detail>
> = async ({ queryKey }) => {
  const [, , id] = queryKey;
  const detailTags = communityQueryKeys.detail(id).map(value => String(value));
  const endpoint = `${API_BASE_URL}${API_PATHS.community.detail(id)}`;
  const res = await fetch(endpoint, {
    next: {
      tags: detailTags,
    },
    credentials: 'include',
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
};
