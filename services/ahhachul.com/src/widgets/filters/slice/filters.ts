import { create, StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AppUniqueFilterId } from '../model';

export type FilterState<T extends Record<string, string>> = {
  filters: T;
  loaded: boolean;
  activeCount: number;
  handleSelect: <K extends keyof T>(key: K, value: T[K]) => void;
  handleReset: () => void;
};

type FilterStoreCreator<T extends Record<string, string>> = StateCreator<
  FilterState<T>
>;

const createFilterStoreWithPersist = <T extends Record<string, string>>(
  defaultValues: T,
  uniqueId: AppUniqueFilterId,
) => {
  const createStore: FilterStoreCreator<T> = (set) => ({
    filters: defaultValues,
    activeCount: 0,
    loaded: false,
    handleSelect: (key, value) => {
      set((state) => {
        const isDefaultValue = value === defaultValues[key];
        const wasDefaultValue = state.filters[key] === defaultValues[key];

        const newFilters = { ...state.filters, [key]: value };
        const newActiveFilterCount =
          state.activeCount +
          (isDefaultValue && !wasDefaultValue ? -1 : 0) + // 기본값이었던 것을 변경하면 감소
          (!isDefaultValue && wasDefaultValue ? 1 : 0); // 기본값이 아닌 값이 설정되면 증가

        return {
          filters: newFilters,
          activeCount: newActiveFilterCount,
        };
      });
    },
    handleReset: () => set({ filters: defaultValues, activeCount: 0 }),
  });

  return create<FilterState<T>>()(
    persist(createStore, {
      name: `filter-storage-${uniqueId}`,
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.loaded = true;
        }
      },
    }),
  );
};

export { createFilterStoreWithPersist };
