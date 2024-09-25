import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ParamsOfCommunityList } from '../model/params';

const defaultCommunityFilters = {};

type ICommunityFilters = Omit<ParamsOfCommunityList, 'page' | 'size'>;
interface ICommunityFilterStore {
  filters: ICommunityFilters;
  setFilters: (updated: ICommunityFilters) => void;
}

export const useCommunityFilterStore = create(
  persist<ICommunityFilterStore>(
    (set) => ({
      filters: defaultCommunityFilters,
      setFilters: (updated: ICommunityFilters) => {
        set({ filters: updated });
      },
    }),
    {
      name: 'community-filters',
    },
  ),
);
