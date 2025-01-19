import { create, StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';

import { RecordWithPrimitives } from '@/types';
import type { AppUniqueFilterId } from '@/types/filter';

export interface IFilterState<T extends RecordWithPrimitives> {
  filters: T;
  loaded: boolean;
  activatedCount: number;
  handleSelect: (key: keyof T, value: T[keyof T]) => void;
  handleReset: () => void;
}

type FilterStoreCreator<T extends RecordWithPrimitives> = StateCreator<IFilterState<T>>;

const createPersistentFilterStore = <T extends RecordWithPrimitives>(
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

export default createPersistentFilterStore;
