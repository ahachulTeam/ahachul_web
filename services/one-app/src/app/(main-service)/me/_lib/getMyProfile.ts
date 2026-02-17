import { API_PATHS } from '@ahhachul/http';

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
  return fetchClient<ApiResponse<User>>(API_PATHS.user.profile);
}

export async function getMyFavoriteStations() {
  return fetchClient<ApiResponse<FavoriteStationList>>(API_PATHS.user.favoriteStations);
}
