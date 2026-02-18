import { QueryFunction } from '@tanstack/react-query';

import { lostFoundQueryKeys } from '@ahhachul/domain';
import { API_PATHS } from '@ahhachul/http';

import { API_BASE_URL } from '@/constants';
import { IResponse, LostFoundPostDetail } from '@/types';

export const getLostFoundDetailPost: QueryFunction<
  IResponse<LostFoundPostDetail>,
  ReturnType<typeof lostFoundQueryKeys.detail>
> = async ({ queryKey }) => {
  const [, , id] = queryKey;
  const detailTags = lostFoundQueryKeys.detail(id).map(value => String(value));
  const endpoint = `${API_BASE_URL}${API_PATHS.lostFound.detail(id)}`;
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
