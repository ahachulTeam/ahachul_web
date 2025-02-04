import { QueryFunction } from '@tanstack/react-query';

import type { IResponse } from '@/types';
import type { CommunityDetail } from '@/types/community';

export const getCommunityDetailPost: QueryFunction<
  IResponse<CommunityDetail>,
  [_1: string, id: number]
> = async ({ queryKey }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_1, id] = queryKey;
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/community-posts/${id}`, {
    next: {
      tags: ['lcommunity-post', id.toString()],
    },
    credentials: 'include',
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
};
