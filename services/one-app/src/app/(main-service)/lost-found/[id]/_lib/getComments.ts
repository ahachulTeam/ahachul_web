import { QueryFunction } from '@tanstack/react-query';

import { lostFoundQueryKeys } from '@ahhachul/domain';
import { API_PATHS } from '@ahhachul/http';

import { API_BASE_URL } from '@/constants';
import { CommentList, IResponse } from '@/types';

export const getLostFoundComments: QueryFunction<
  IResponse<CommentList>,
  ReturnType<typeof lostFoundQueryKeys.comments>
> = async ({ queryKey }) => {
  const [, , id] = queryKey;
  const commentTags = lostFoundQueryKeys.comments(id).map(value => String(value));
  const endpoint = `${API_BASE_URL}${API_PATHS.lostFound.comments(id)}`;
  const res = await fetch(endpoint, {
    next: {
      tags: commentTags,
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
