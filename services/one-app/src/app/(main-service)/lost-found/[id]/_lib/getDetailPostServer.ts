import { cookies } from 'next/headers';

import { lostFoundQueryKeys } from '@ahhachul/domain';
import { API_PATHS } from '@ahhachul/http';

import { API_BASE_URL } from '@/constant';

export const getLostFoundDetailPostServer = async ({
  queryKey,
}: {
  queryKey: ReturnType<typeof lostFoundQueryKeys.detail>;
}) => {
  const [, , id] = queryKey;
  const detailTags = lostFoundQueryKeys.detail(id).map(value => String(value));
  const endpoint = `${API_BASE_URL}${API_PATHS.lostFound.detail(id)}`;
  const res = await fetch(endpoint, {
    next: {
      revalidate: 3600,
      tags: detailTags,
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
