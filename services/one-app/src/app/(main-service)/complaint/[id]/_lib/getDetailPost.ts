import { QueryFunction } from '@tanstack/react-query';

import type { IResponse } from '@/types';
import { ComplaintPostDetail } from '@/types/complaint';

export const getComplaintDetailPost: QueryFunction<
  IResponse<ComplaintPostDetail>,
  [_1: string, id: number]
> = async ({ queryKey }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_1, id] = queryKey;
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/complaintcomplaint-posts/${id}`, {
    next: {
      tags: ['complaint-post', id.toString()],
    },
    credentials: 'include',
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
};
