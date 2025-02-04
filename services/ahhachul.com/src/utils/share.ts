import { WEB_SERVICE_URL } from '@/constants';
import type { TypeActivities } from '@/stackflow';
import type { KeyOf } from '@/types';
import type { ShareablePageMap, ShareableURLMap } from '@/types/share';

export const getSharePageURL = <T extends KeyOf<Pick<TypeActivities, KeyOf<ShareablePageMap>>>>(
  activityName: T,
): ShareableURLMap[T] => {
  const urlMap: ShareableURLMap = {
    CommunityDetailPage: `${WEB_SERVICE_URL}/community`,
    LostFoundDetailPage: `${WEB_SERVICE_URL}/lost-found`,
    ComplaintDetailPage: `${WEB_SERVICE_URL}/complaint`,
  } as const;

  return urlMap[activityName];
};
