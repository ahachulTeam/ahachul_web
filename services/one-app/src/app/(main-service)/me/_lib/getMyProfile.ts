import { API_PATHS } from '@ahhachul/http';

import { fetchClient } from '@/lib/fetch-client';
import type { ApiResponse, User } from '@/types';

export type FavoriteStation = {
  stationId: number;
  stationName: string;
  lineId?: number;
  lineName?: string;
  label?: string | null;
  subwayLineInfoList?: Array<{
    subwayLineId: number;
    subwayLineName: string;
  }>;
};

export type FavoriteStationList = {
  stationInfoList: FavoriteStation[];
};

export type CheckNicknameResponse = ApiResponse<{
  available: boolean;
}>;

export type UpdateMemberResponse = ApiResponse<{
  nickname: string | null;
  gender: string | null;
  ageRange: string | null;
  profilePublic: boolean;
  emailPublic: boolean;
  genderAgePublic: boolean;
  postsPublic: boolean;
  commentsPublic: boolean;
}>;

export type UpdateMemberPayload = {
  nickname?: string;
  profilePublic?: boolean;
  emailPublic?: boolean;
  genderAgePublic?: boolean;
  postsPublic?: boolean;
  commentsPublic?: boolean;
};

export type FavoriteStationPayload = {
  stationName: string;
  label?: string;
};

export async function getMyProfile() {
  return fetchClient<ApiResponse<User>>(API_PATHS.user.profile);
}

export async function getMyFavoriteStations() {
  return fetchClient<ApiResponse<FavoriteStationList>>(API_PATHS.user.favoriteStations);
}

export async function checkNicknameAvailability(nickname: string) {
  return fetchClient<CheckNicknameResponse>(API_PATHS.user.checkNickname, {
    method: 'POST',
    body: JSON.stringify({ nickname }),
    skipAuth: true,
  });
}

export async function updateMyProfile(payload: UpdateMemberPayload) {
  return fetchClient<UpdateMemberResponse>(API_PATHS.user.profile, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

export async function updateMyFavoriteStations(stations: FavoriteStationPayload[]) {
  return fetchClient<ApiResponse<FavoriteStationList>>(API_PATHS.user.favoriteStations, {
    method: 'POST',
    body: JSON.stringify({ stations }),
  });
}
