import { QueryFunction } from '@tanstack/react-query';

import { CommentList, IResponse } from '@/types';

export const getLostFoundComments: QueryFunction<
  IResponse<CommentList>,
  [_1: string, id: number, _2: string]
> = async ({ queryKey }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_1, id] = queryKey;
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/lost-posts/${id}/comments`, {
    next: {
      tags: ['lost-found-post', id.toString(), 'comments'],
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
