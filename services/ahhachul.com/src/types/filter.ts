import type { TypeActivities } from '@/stackflow';

import type { KeyOf } from './common';

export type IFilterState<T extends Record<string, string>> = {
  filters: T;
  loaded: boolean;
  activatedCount: number;
  handleSelect: <K extends keyof T>(key: K, value: T[K]) => void;
  handleReset: () => void;
};

export type AppUniqueFilterId = Extract<KeyOf<TypeActivities>, 'CommunityPage' | 'LostFoundPage'>;
