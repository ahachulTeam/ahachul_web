import axiosInstance from '@/apis/fetcher';
import type { ApiResponse, UserProfileResponseDto } from '@/types';

export const fetchUserProfile = async () => {
  const { data } = await axiosInstance.get<ApiResponse<UserProfileResponseDto>>('/members');

  return data;
};

export const fetchUserFavoriteStations = async () => {
  const { data } = await axiosInstance.get<ApiResponse<{ id: 'hello' }>>(
    '/members/bookmarks/stations',
  );

  return data;
};
