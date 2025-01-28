import { QueryFunction } from '@tanstack/react-query';

import { IResponse, LostFoundPostDetail } from '@/types';

export const getLostFoundDetailPost: QueryFunction<
  IResponse<LostFoundPostDetail>,
  [_1: string, id: number]
> = async ({ queryKey }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_1, id] = queryKey;
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/lost-posts/${id}`, {
    next: {
      tags: ['lost-found-post', id.toString()],
    },
    credentials: 'include',
    cache: 'no-store',
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
};
