import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { defaultStationList } from '@/constants';
import type { UserStationList } from '@/types';

export interface IUserStationStore {
  stations: UserStationList;
  setUserStations: (updated: UserStationList) => void;
}

export const useUserStationStore = create(
  persist<IUserStationStore>(
    set => ({
      stations: defaultStationList,
      setUserStations: (updated: UserStationList) => {
        set({ stations: updated });
      },
    }),
    {
      name: 'ahhachul-user-station-list',
    },
  ),
);
