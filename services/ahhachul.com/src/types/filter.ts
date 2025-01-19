import type { TypeActivities } from '@/stackflow';

import type { KeyOf } from './common';

export type AppUniqueFilterId = Extract<KeyOf<TypeActivities>, 'CommunityPage' | 'LostFoundPage'>;
