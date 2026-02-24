import axios from 'axios';

import { API_PATHS } from '@ahhachul/http';

import axiosInstance from '@/apis/fetcher';
import type {
  ApiResponse,
  APIUpdateUserResponse,
  ArticleHistoryResponseDto,
  AuthTokens,
  UserFavoriteStations,
  UserProfileResponseDto,
} from '@/types';
import { getAccessTokenInLocalStorage } from '@/utils/localStorage';

import { BASE_URL } from '../baseUrl';
import { API_PREFIX } from '../endpointPrefix';

export const fetchUserProfile = async () => {
  const { data } = await axiosInstance.get<ApiResponse<UserProfileResponseDto>>(
    API_PATHS.user.profile,
  );

  return data;
};

export const prefetchUserProfile = async () => {
  const accessToken = getAccessTokenInLocalStorage();

  const { data } = await axios.get<ApiResponse<UserProfileResponseDto>>(
    `${BASE_URL.SERVER}${API_PREFIX}${API_PATHS.user.profile}`,
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
    API_PATHS.user.favoriteStations,
  );

  return data;
};

export const prefetchUserFavoriteStations = async () => {
  const accessToken = getAccessTokenInLocalStorage();

  const { data } = await axios.get<ApiResponse<UserFavoriteStations>>(
    `${BASE_URL.SERVER}${API_PREFIX}${API_PATHS.user.favoriteStations}`,
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
    API_PATHS.user.favoriteStations,
    { stations },
    // { stations: stations.map((item: any) => ({ ...item, stationName: item.stationName + '역' })) },
  );

  return response.data;
};

export const fetchUserArticleHistories = async (limit = 30) => {
  const { data } = await axiosInstance.get<ApiResponse<ArticleHistoryResponseDto>>(
    API_PATHS.user.articleHistories,
    {
      params: { limit },
    },
  );

  return data;
};

export const updateUser = async (data: { nickname: string; auth: AuthTokens }) => {
  try {
    const accessToken = data.auth.accessToken;
    const res = await axios.patch<APIUpdateUserResponse>(
      `${BASE_URL.SERVER}${API_PREFIX}${API_PATHS.user.profile}`,
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
