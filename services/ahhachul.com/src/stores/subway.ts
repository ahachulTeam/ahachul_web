import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { UserStationList } from '@/types';

const defaultStationList: UserStationList = [
  {
    name: '종로3가',
    label: '즐겨찾는 역',
    stationInfos: [
      {
        stationId: 41,
        parentLineId: 1,
      },
      {
        stationId: 41,
        parentLineId: 3,
      },
      {
        stationId: 41,
        parentLineId: 5,
      },
    ],
  },
  {
    name: '강남',
    label: '회사',
    stationInfos: [
      {
        stationId: 557,
        parentLineId: 2,
      },
      {
        stationId: 557,
        parentLineId: 18,
      },
    ],
  },
  {
    name: '광교중앙',
    label: '집',
    stationInfos: [
      {
        stationId: 272,
        parentLineId: 18,
      },
    ],
  },
];

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
      name: 'user-station-list',
    },
  ),
);
