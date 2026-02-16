import { QueryFunction } from '@tanstack/react-query';

import { lostFoundQueryKeys } from '@ahhachul/domain';

import { API_BASE_URL } from '@/constant';
import { IResponse, LostFoundPostDetail } from '@/types';

export const getLostFoundDetailPost: QueryFunction<
  IResponse<LostFoundPostDetail>,
  ReturnType<typeof lostFoundQueryKeys.detail>
> = async ({ queryKey }) => {
  const [, , id] = queryKey;
  const detailTags = lostFoundQueryKeys.detail(id).map(value => String(value));
  const res = await fetch(`${API_BASE_URL}/lost-posts/${id}`, {
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
