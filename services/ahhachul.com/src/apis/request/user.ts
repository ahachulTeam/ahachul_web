import axios from 'axios';

import { API_PATHS } from '@ahhachul/http';

import axiosInstance from '@/apis/fetcher';
import type {
  ApiResponse,
  APIUpdateUserResponse,
  ArticleHistoryResponseDto,
  AuthTokens,
  CommuteCoachDto,
  CreateFavoriteRouteRequestDto,
  FavoriteRouteDto,
  FavoriteRouteListDto,
  ProfileVisibilitySettings,
  RouteConnectionRecommendationsDto,
  StoryItemDto,
  UserStoriesResponseDto,
  UserProfileDetailResponseDto,
  UserFavoriteStations,
  UserProfileResponseDto,
} from '@/types';
import { getAccessTokenInLocalStorage } from '@/utils/localStorage';
import { createActionLogger } from '@/utils/observability';

import { BASE_URL } from '../baseUrl';
import { API_PREFIX } from '../endpointPrefix';

const userRequestLogger = createActionLogger('user-request');

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

type FavoriteStationPayload = {
  stationName: string;
  label?: string;
  stationId?: number;
};

type UserProfileDetailFetchOptions = {
  asPublic?: boolean;
  limit?: number;
};

export const createUserFavoriteStations = async (stations: FavoriteStationPayload[]) => {
  const response = await axiosInstance.post<ApiResponse<UserFavoriteStations>>(
    API_PATHS.user.favoriteStations,
    { stations },
  );

  return response.data;
};

export const fetchUserProfileDetail = async (
  username: string,
  options: UserProfileDetailFetchOptions = {},
) => {
  const { asPublic = false, limit = 20 } = options;
  const { data } = await axiosInstance.get<ApiResponse<UserProfileDetailResponseDto>>(
    API_PATHS.user.profileDetail(username),
    {
      params: {
        asPublic,
        limit,
      },
    },
  );

  return data;
};

export const fetchUserFavoriteRouteRecommendations = async (limit = 3) => {
  const { data } = await axiosInstance.get<ApiResponse<FavoriteRouteListDto>>(
    API_PATHS.user.favoriteRouteRecommendations,
    {
      params: { limit },
    },
  );

  return data;
};

export const fetchUserCommuteCoachToday = async (
  params: { targetArrivalAt?: string; timezone?: string } = {},
) => {
  const { data } = await axiosInstance.get<ApiResponse<CommuteCoachDto>>(
    API_PATHS.user.commuteCoachToday,
    {
      params,
    },
  );

  return data;
};

export const fetchUserFavoriteRoutes = async () => {
  const { data } = await axiosInstance.get<ApiResponse<FavoriteRouteListDto>>(
    API_PATHS.user.favoriteRoutes,
  );

  return data;
};

export const fetchUserRouteConnectionRecommendations = async (
  params: { limit?: number; groupLimit?: number } = {},
) => {
  const { data } = await axiosInstance.get<ApiResponse<RouteConnectionRecommendationsDto>>(
    API_PATHS.user.routeConnectionRecommendations,
    {
      params,
    },
  );

  return data;
};

export const createUserFavoriteRoute = async (payload: CreateFavoriteRouteRequestDto) => {
  const { data } = await axiosInstance.post<ApiResponse<FavoriteRouteDto>>(
    API_PATHS.user.favoriteRoutes,
    payload,
  );

  return data;
};

export const deleteUserFavoriteRoute = async (routeId: number) => {
  const { data } = await axiosInstance.delete<ApiResponse<{ routeId: number }>>(
    API_PATHS.user.favoriteRoute(routeId),
  );

  return data;
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

type UserStoriesFetchOptions = {
  asPublic?: boolean;
  limit?: number;
};

type CreateStoryPayload = {
  image: File;
  caption?: string;
  stationId?: number;
  subwayLineId?: number;
};

export const fetchMyStoriesV2 = async (limit = 24) => {
  const { data } = await axiosInstance.get<ApiResponse<UserStoriesResponseDto>>(
    API_PATHS.story.myStoriesV2,
    {
      params: { limit },
    },
  );

  return data;
};

export const fetchUserStoriesV2 = async (
  username: string,
  options: UserStoriesFetchOptions = {},
) => {
  const { asPublic = false, limit = 24 } = options;
  const { data } = await axiosInstance.get<ApiResponse<UserStoriesResponseDto>>(
    API_PATHS.story.memberStoriesV2(username),
    {
      params: {
        asPublic,
        limit,
      },
    },
  );

  return data;
};

export const createStoryV2 = async (payload: CreateStoryPayload) => {
  const formData = new FormData();
  const content = {
    ...(payload.caption?.trim() ? { caption: payload.caption.trim() } : {}),
    ...(payload.stationId ? { stationId: payload.stationId } : {}),
    ...(payload.subwayLineId ? { subwayLineId: payload.subwayLineId } : {}),
  };

  formData.append('content', new Blob([JSON.stringify(content)], { type: 'application/json' }));
  formData.append('image', payload.image);

  const { data } = await axiosInstance.post<ApiResponse<{ story: StoryItemDto }>>(
    API_PATHS.story.createV2,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return data;
};

export const deleteStoryV2 = async (storyId: number) => {
  const { data } = await axiosInstance.delete<ApiResponse<{ storyId: number; deleted: boolean }>>(
    API_PATHS.story.deleteV2(storyId),
  );

  return data;
};

type UpdateUserPayload = Partial<ProfileVisibilitySettings> & {
  nickname?: string;
  imageUrl?: string;
  auth?: AuthTokens;
};

export const updateUser = async ({ auth, ...payload }: UpdateUserPayload) => {
  if (!Object.keys(payload).length) {
    throw new Error('업데이트할 사용자 정보가 없습니다.');
  }

  try {
    const headers =
      auth?.accessToken == null
        ? undefined
        : {
            Authorization: `Bearer ${auth.accessToken}`,
          };

    const res = await axios.patch<APIUpdateUserResponse>(
      `${BASE_URL.SERVER}${API_PREFIX}${API_PATHS.user.profile}`,
      payload,
      headers ? { headers } : undefined,
    );

    return res.data;
  } catch (error) {
    userRequestLogger.fail(
      'update-user',
      error,
      {
        hasAuthToken: Boolean(auth?.accessToken),
      },
      '회원 정보를 업데이트하지 못했습니다.',
    );
    if (axios.isAxiosError(error)) {
      throw new Error(`Update user failed: ${error.response?.data?.message || error.message}`);
    } else {
      throw new Error('An unexpected error occurred during user update.');
    }
  }
};
