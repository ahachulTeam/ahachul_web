import type { TypeActivities } from '@/stackflow';

import type { KeyOf } from './common';

export type AppUniqueFilterId = Extract<
  KeyOf<TypeActivities>,
  | 'CommunityPage'
  | 'CommunityStationPage'
  | 'CommunityLinePage'
  | 'LostFoundPage'
  | 'ComplaintPage'
  | 'HashtagPage'
>;
