import type { TypeActivities } from 'app/stackflow';

export const APP_UNIQUE_FILTER_ID_LIST: Record<
  Extract<KeyOf<TypeActivities>, 'Community' | 'LostFound'>,
  Extract<KeyOf<TypeActivities>, 'Community' | 'LostFound'>
> = {
  Community: 'Community',
  LostFound: 'LostFound',
} as const;
