import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { defaultStationList } from '@/constants';
import type { UserStationList } from '@/types';

export interface IUserStationStore {
  userStations: UserStationList;
  setUserStations: (updated: UserStationList) => void;
}

export const useUserStationStore = create(
  persist<IUserStationStore>(
    set => ({
      userStations: defaultStationList,
      setUserStations: (updated: UserStationList) => {
        set({ userStations: updated });
      },
    }),
    {
      name: 'ahhachul-user-station-list',
    },
  ),
);
