import { create, StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';

import type { KeyOf, ValueOf, StringRecord } from '@/model';

export const filterKey = 'AHAHCHUL_FILTER_STORAGE';

export type AppUniqueFilterId = ValueOf<typeof APP_UNIQUE_FILTER_ID_LIST>;
export enum APP_UNIQUE_FILTER_ID_LIST {
  COMMUNITY = 'COMMUNITY',
  LOST_FOUND = 'LOST_FOUND',
}

export type FilterState<T extends StringRecord> = {
  filters: T;
  loaded: boolean;
  activatedCount: number;
  handleSelect: <K extends KeyOf<T>>(key: K, value: T[K]) => void;
  handleReset: () => void;
};

type FilterStoreCreator<T extends StringRecord> = StateCreator<FilterState<T>>;

const createFilterStoreWithPersist = <T extends StringRecord>(
  defaultValues: T,
  uniqueId: AppUniqueFilterId,
) => {
  const createStore: FilterStoreCreator<T> = (set) => ({
    filters: defaultValues,
    activatedCount: 0,
    loaded: false,
    handleSelect: (key, value) => {
      set((state) => {
        const isDefaultValue = value === defaultValues[key];
        const wasDefaultValue = state.filters[key] === defaultValues[key];

        const newFilters = { ...state.filters, [key]: value };
        const newActiveFilterCount =
          state.activatedCount +
          (isDefaultValue && !wasDefaultValue ? -1 : 0) +
          (!isDefaultValue && wasDefaultValue ? 1 : 0);

        return {
          filters: newFilters,
          activatedCount: newActiveFilterCount,
        };
      });
    },
    handleReset: () => set({ filters: defaultValues, activatedCount: 0 }),
  });

  return create<FilterState<T>>()(
    persist(createStore, {
      name: `${filterKey}-${uniqueId}`,
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.loaded = true;
        }
      },
    }),
  );
};

export { createFilterStoreWithPersist };
