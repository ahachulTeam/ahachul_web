import { cookies } from 'next/headers';

import { API_BASE_URL } from '@/constant';

export const getLostFoundDetailPostServer = async ({
  queryKey,
}: {
  queryKey: [string, number];
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_1, id] = queryKey;
  const res = await fetch(`${API_BASE_URL}/lost-posts/${id}`, {
    next: {
      revalidate: 3600,
      tags: ['lost-found-post', id.toString()],
    },
    cache: 'force-cache',
    credentials: 'include',
    headers: { Cookie: (await cookies()).toString() },
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
};
