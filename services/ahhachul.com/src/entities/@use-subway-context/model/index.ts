import type { DEFAULT_STATIONS } from '../data/index';

type StationName = KeyOf<typeof DEFAULT_STATIONS>;
export interface UserStation {
  name: StationName;
  alias: string;
  stationInfos: {
    stationId: number;
    parentLineId: number;
  }[];
}
export type UserStationList = UserStation[];
export interface WithStation {
  station: UserStation;
}
