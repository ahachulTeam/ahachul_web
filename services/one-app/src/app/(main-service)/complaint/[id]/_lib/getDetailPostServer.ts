import { cookies } from 'next/headers';

import { complaintQueryKeys } from '@ahhachul/domain';
import { API_PATHS } from '@ahhachul/http';

import { API_BASE_URL } from '@/constants';

export const getComplaintDetailPostServer = async ({
  queryKey,
}: {
  queryKey: ReturnType<typeof complaintQueryKeys.detail>;
}) => {
  const [, , id] = queryKey;
  const detailTags = complaintQueryKeys.detail(id).map(value => String(value));
  const endpoint = `${API_BASE_URL}${API_PATHS.complaint.detail(id)}`;
  const res = await fetch(endpoint, {
    next: {
      revalidate: 3600,
      tags: detailTags,
    },
    credentials: 'include',
    headers: { Cookie: (await cookies()).toString() },
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
};
