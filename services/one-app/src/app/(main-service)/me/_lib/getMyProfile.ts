import { fetchClient } from '@/lib/fetch-client';
import type { ApiResponse, User } from '@/types';

type FavoriteStation = {
  stationId: number;
  stationName: string;
  lineId: number;
  lineName: string;
};

export type FavoriteStationList = {
  stationInfoList: FavoriteStation[];
};

export async function getMyProfile() {
  return fetchClient<ApiResponse<User>>('/members');
}

export async function getMyFavoriteStations() {
  return fetchClient<ApiResponse<FavoriteStationList>>('/members/bookmarks/stations');
}
