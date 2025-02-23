import axios from 'axios';

import axiosInstance from '@/apis/fetcher';
import type { ApiResponse, UserProfileResponseDto } from '@/types';
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
  const { data } = await axiosInstance.get<ApiResponse<{ id: 'hello' }>>(
    '/members/bookmarks/stations',
  );

  return data;
};
