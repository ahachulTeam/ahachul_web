import { cookies } from 'next/headers';

import { complaintQueryKeys } from '@ahhachul/domain';

import { API_BASE_URL } from '@/constant';

export const getComplaintDetailPostServer = async ({
  queryKey,
}: {
  queryKey: ReturnType<typeof complaintQueryKeys.detail>;
}) => {
  const [, , id] = queryKey;
  const detailTags = complaintQueryKeys.detail(id).map(value => String(value));
  const res = await fetch(`${API_BASE_URL}/complaint-posts/${id}`, {
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
