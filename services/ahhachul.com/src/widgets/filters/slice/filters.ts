import { create, StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AppUniqueFilterId } from '../model';

type FilterState<T extends Record<string, string>> = {
  filters: T;
  setFilter: <K extends keyof T>(key: K, value: T[K]) => void;
  resetFilters: () => void;
  controlledFilterLength: number;
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
    controlledFilterLength: 0,
  });

  return create<FilterState<T>>()(
    persist(createStore, {
      name: `filter-storage-${uniqueId}`,
    }),
  );
};

export { createFilterStoreWithPersist };
