import { create, StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AppUniqueFilterId } from '../model';

type FilterState<T extends Record<string, string>> = {
  filters: T;
  setFilter: <K extends keyof T>(key: K, value: T[K]) => void;
  resetFilters: () => void;
  activeFilterCount: number;
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
<<<<<<< Updated upstream
    activeFilterCount: 0,
    setFilter: (key, value) => {
      set((state) => {
        const isDefaultValue = value === defaultValues[key];
        const wasDefaultValue = state.filters[key] === defaultValues[key];

        const newFilters = { ...state.filters, [key]: value };
        const newActiveFilterCount =
          state.activeFilterCount +
          (isDefaultValue && !wasDefaultValue ? -1 : 0) + // 기본값이었던 것을 변경하면 감소
          (!isDefaultValue && wasDefaultValue ? 1 : 0); // 기본값이 아닌 값이 설정되면 증가

        return {
          filters: newFilters,
          activeFilterCount: newActiveFilterCount,
        };
      });
    },
    resetFilters: () => set({ filters: defaultValues, activeFilterCount: 0 }),
=======
    controlledFilterLength: 0,
    setFilter: (key, value) =>
      set((state) => ({
        filters: { ...state.filters, [key]: value },
        controlledFilterLength: Object.entries({
          ...state.filters,
          [key]: value,
        }).reduce(
          (count, [k, v]) => (v !== defaultValues[k] ? count + 1 : count),
          0,
        ),
      })),
    resetFilters: () =>
      set({ filters: defaultValues, controlledFilterLength: 0 }),
>>>>>>> Stashed changes
  });

  return create<FilterState<T>>()(
    persist(createStore, {
      name: `filter-storage-${uniqueId}`,
    }),
  );
};

export { createFilterStoreWithPersist };
