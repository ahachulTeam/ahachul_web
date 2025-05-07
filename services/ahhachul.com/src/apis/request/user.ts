import axios from 'axios';

import axiosInstance from '@/apis/fetcher';
import type {
  ApiResponse,
  APIUpdateUserResponse,
  AuthTokens,
  UserFavoriteStations,
  UserProfileResponseDto,
} from '@/types';
import { getAccessTokenInLocalStorage } from '@/utils/localStorage';

import { BASE_URL } from '../baseUrl';
import { API_PREFIX } from '../endpointPrefix';

export const fetchUserProfile = async () => {
  const { data } = await axiosInstance.get<ApiResponse<UserProfileResponseDto>>('/members');

  return data;
};

export const prefetchUserProfile = async () => {
  const accessToken = getAccessTokenInLocalStorage();

  const { data } = await axios.get<ApiResponse<UserProfileResponseDto>>(
    `${BASE_URL.SERVER}${API_PREFIX}/members`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return data;
};

export const fetchUserFavoriteStations = async () => {
  const { data } = await axiosInstance.get<ApiResponse<UserFavoriteStations>>(
    '/members/bookmarks/stations',
  );

  return data;
};

export const prefetchUserFavoriteStations = async () => {
  const accessToken = getAccessTokenInLocalStorage();

  const { data } = await axios.get<ApiResponse<UserFavoriteStations>>(
    `${BASE_URL.SERVER}${API_PREFIX}/members/bookmarks/stations`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return data;
};

export const createUserFavoriteStations = async (stations: any) => {
  const response = await axiosInstance.post<ApiResponse<UserFavoriteStations>>(
    '/members/bookmarks/stations',
    { stations },
    // { stations: stations.map((item: any) => ({ ...item, stationName: item.stationName + '역' })) },
  );

  return response.data;
};

export const updateUser = async (data: { nickname: string; auth: AuthTokens }) => {
  try {
    const accessToken = data.auth.accessToken;
    const res = await axios.patch<APIUpdateUserResponse>(
      `${import.meta.env.VITE_BASE_URL}/v1/members`,
      { nickname: data.nickname },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Update user failed: ${error.response?.data?.message || error.message}`);
    } else {
      console.error('Unexpected error during user update:', error);
      throw new Error('An unexpected error occurred during user update.');
    }
  }
};
