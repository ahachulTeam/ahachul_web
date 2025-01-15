import { create, StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';

import type { IFilterState, AppUniqueFilterId } from '@/types/filter';

type FilterStoreCreator<T extends Record<string, string>> = StateCreator<IFilterState<T>>;

const createFilterStoreWithPersist = <T extends Record<string, string>>(
  defaultValues: T,
  uniqueId: AppUniqueFilterId,
) => {
  const createStore: FilterStoreCreator<T> = set => ({
    filters: defaultValues,
    activatedCount: 0,
    loaded: false,
    handleSelect: (key, value) => {
      set(state => {
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

  return create<IFilterState<T>>()(
    persist(createStore, {
      name: `filter-storage-${uniqueId}`,
      onRehydrateStorage: () => state => {
        if (state) {
          state.loaded = true;
        }
      },
    }),
  );
};

export default createFilterStoreWithPersist;
