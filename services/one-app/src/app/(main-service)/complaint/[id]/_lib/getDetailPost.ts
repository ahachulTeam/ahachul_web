import { QueryFunction } from '@tanstack/react-query';

import { complaintQueryKeys } from '@ahhachul/domain';
import { API_PATHS } from '@ahhachul/http';

import { API_BASE_URL } from '@/constant';
import type { IResponse } from '@/types';
import { ComplaintPostDetail } from '@/types/complaint';

export const getComplaintDetailPost: QueryFunction<
  IResponse<ComplaintPostDetail>,
  ReturnType<typeof complaintQueryKeys.detail>
> = async ({ queryKey }) => {
  const [, , id] = queryKey;
  const detailTags = complaintQueryKeys.detail(id).map(value => String(value));
  const endpoint = `${API_BASE_URL}${API_PATHS.complaint.detail(id)}`;
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
