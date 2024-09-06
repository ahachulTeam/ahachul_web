import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserStationList } from '../model';

const defaultStationList: UserStationList = [
  {
    name: '광교중앙',
    alias: '집',
    stationInfos: [
      {
        stationId: 579,
        parentLineId: 10,
      },
    ],
  },
  {
    name: '강남',
    alias: '회사',
    stationInfos: [
      {
        stationId: 121,
        parentLineId: 2,
      },
      {
        stationId: 568,
        parentLineId: 10,
      },
    ],
  },
  {
    name: '종로3가',
    alias: '즐겨찾는 역',
    stationInfos: [
      {
        stationId: 31,
        parentLineId: 1,
      },
      {
        stationId: 171,
        parentLineId: 3,
      },
      {
        stationId: 267,
        parentLineId: 5,
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
    (set) => ({
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
