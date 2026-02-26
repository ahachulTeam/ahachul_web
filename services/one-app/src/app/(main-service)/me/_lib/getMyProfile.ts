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
  imageUrl?: string | null;
  profilePublic: boolean;
  emailPublic: boolean;
  genderAgePublic: boolean;
  postsPublic: boolean;
  commentsPublic: boolean;
}>;

export type UpdateMemberPayload = {
  nickname?: string;
  imageUrl?: string;
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

export type FavoriteRouteNode = {
  stationId: number;
  stationName: string;
  order: number;
  favorite: boolean;
};

export type FavoriteRouteEdge = {
  fromStationId: number;
  toStationId: number;
  subwayLineId: number;
  subwayLineName: string;
};

export type FavoriteRouteSummary = {
  totalStops: number;
  transferCount: number;
  estimatedMinutes: number;
};

export type FavoriteRouteType = 'RECOMMENDED' | 'CUSTOM';

export type FavoriteRoute = {
  routeId: number | null;
  routeType: FavoriteRouteType;
  title?: string | null;
  sourceStationId: number;
  sourceStationName: string;
  destinationStationId: number;
  destinationStationName: string;
  nodes: FavoriteRouteNode[];
  edges: FavoriteRouteEdge[];
  summary: FavoriteRouteSummary;
};

export type FavoriteRouteList = {
  routes: FavoriteRoute[];
};

export type CommuteCoachRiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export type CommuteCoach = {
  generatedAt: string;
  targetArrivalAt: string;
  safeDepartureAt: string | null;
  departureInMinutes: number | null;
  riskLevel: CommuteCoachRiskLevel;
  riskReasons: string[];
  primaryRoute: FavoriteRoute | null;
  alternativeRoutes: FavoriteRoute[];
  guidanceMessage: string;
};

export type CreateFavoriteRoutePayload = {
  sourceStationId: number;
  destinationStationId: number;
  title?: string;
};

export type RouteConnectionPolicy = {
  sourceMaxDistance: number;
  destinationMaxDistance: number;
  totalMaxDistance: number;
};

export type RouteConnectionAnchorRoute = {
  sourceStationId: number;
  sourceStationName: string;
  destinationStationId: number;
  destinationStationName: string;
};

export type RouteConnectionRecommendation = {
  memberId: number;
  nickname: string;
  routeId: number | null;
  title?: string | null;
  sourceStationId: number;
  sourceStationName: string;
  destinationStationId: number;
  destinationStationName: string;
  sourceDistance: number;
  destinationDistance: number;
  totalDistance: number;
  matchScore: number;
  estimatedMinutes: number;
  reason: string;
};

export type RouteConnectionGroupMember = {
  memberId: number;
  nickname: string;
  matchScore: number;
  totalDistance: number;
};

export type RouteConnectionGroup = {
  groupId: string;
  sourceStationId: number;
  sourceStationName: string;
  destinationStationId: number;
  destinationStationName: string;
  memberCount: number;
  members: RouteConnectionGroupMember[];
};

export type RouteConnectionGraphNode = {
  memberId: number;
  nickname: string;
  me: boolean;
};

export type RouteConnectionGraphEdge = {
  fromMemberId: number;
  toMemberId: number;
  score: number;
  label: string;
};

export type RouteConnectionGraph = {
  nodes: RouteConnectionGraphNode[];
  edges: RouteConnectionGraphEdge[];
};

export type RouteConnectionRecommendations = {
  generatedAt: string;
  matchingPolicy: RouteConnectionPolicy;
  anchorRoute: RouteConnectionAnchorRoute | null;
  recommendations: RouteConnectionRecommendation[];
  groups: RouteConnectionGroup[];
  graph: RouteConnectionGraph;
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

export async function getMyFavoriteRouteRecommendations(limit = 3) {
  return fetchClient<ApiResponse<FavoriteRouteList>>(API_PATHS.user.favoriteRouteRecommendations, {
    params: { limit },
  });
}

export async function getMyTodayCommuteCoach(params?: {
  targetArrivalAt?: string;
  timezone?: string;
}) {
  const normalizedParams = {
    ...(params?.targetArrivalAt ? { targetArrivalAt: params.targetArrivalAt } : {}),
    ...(params?.timezone ? { timezone: params.timezone } : {}),
  };

  return fetchClient<ApiResponse<CommuteCoach>>(API_PATHS.user.commuteCoachToday, {
    params: normalizedParams,
  });
}

export async function getMyFavoriteRoutes() {
  return fetchClient<ApiResponse<FavoriteRouteList>>(API_PATHS.user.favoriteRoutes);
}

export async function getMyRouteConnectionRecommendations(params?: {
  limit?: number;
  groupLimit?: number;
}) {
  const normalizedParams = {
    ...(params?.limit ? { limit: params.limit } : {}),
    ...(params?.groupLimit ? { groupLimit: params.groupLimit } : {}),
  };

  return fetchClient<ApiResponse<RouteConnectionRecommendations>>(
    API_PATHS.user.routeConnectionRecommendations,
    {
      params: normalizedParams,
    },
  );
}

export async function createMyFavoriteRoute(payload: CreateFavoriteRoutePayload) {
  return fetchClient<ApiResponse<FavoriteRoute>>(API_PATHS.user.favoriteRoutes, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function deleteMyFavoriteRoute(routeId: number) {
  return fetchClient<ApiResponse<{ routeId: number }>>(API_PATHS.user.favoriteRoute(routeId), {
    method: 'DELETE',
  });
}
