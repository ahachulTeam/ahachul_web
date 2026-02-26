import type { AuthTokens, SocialSignInType } from './auth';
import type { ArticleHistoryItem, ArticleType } from './common';

export interface SignInRequestDto {
  providerCode: string;
  providerType: SocialSignInType;
}

export interface SignInResponseDto extends AuthTokens {
  memberId: number;
  isNeedAdditionalUserInfo: boolean;
}

type Gender = 'MALE' | 'FEMALE';
type AgeRange = '1' | '10' | '20' | '30' | '40' | '50' | '60' | '70' | '80' | '90';

export interface UserProfileResponseDto {
  memberId: number;
  nickname: string;
  email?: string;
  maskedEmail?: string;
  gender?: Gender;
  ageRange?: AgeRange;
  imageUrl?: string;
  profilePublic?: boolean;
  emailPublic?: boolean;
  genderAgePublic?: boolean;
  postsPublic?: boolean;
  commentsPublic?: boolean;
}

export interface APIUpdateUserResponse {
  nickname: string | null;
  gender: string | null;
  ageRange: string | null;
  imageUrl?: string | null;
  profilePublic?: boolean;
  emailPublic?: boolean;
  genderAgePublic?: boolean;
  postsPublic?: boolean;
  commentsPublic?: boolean;
}

export interface ArticleHistoryResponseDto {
  likedArticles: ArticleHistoryItem[];
  bookmarkedArticles: ArticleHistoryItem[];
}

export interface ProfileVisibilitySettings {
  profilePublic: boolean;
  emailPublic: boolean;
  genderAgePublic: boolean;
  postsPublic: boolean;
  commentsPublic: boolean;
}

export interface ProfileVisibility extends ProfileVisibilitySettings {
  profileVisible: boolean;
  postsVisible: boolean;
  commentsVisible: boolean;
}

export interface ProfilePostActivity {
  articleType: ArticleType;
  articleId: number;
  title: string;
  contentPreview: string;
  writer?: string | null;
  subwayLineId?: number | null;
  stationId?: number | null;
  createdAt: string;
}

export interface ProfileCommentActivity {
  commentId: number;
  articleType: ArticleType;
  articleId: number;
  contentPreview: string;
  writer?: string | null;
  createdAt: string;
}

export interface UserProfileDetailResponseDto {
  memberId: number;
  nickname: string | null;
  imageUrl?: string | null;
  email: string | null;
  maskedEmail: string | null;
  gender: string | null;
  ageRange: string | null;
  isMine: boolean;
  visibility: ProfileVisibility;
  activities: {
    posts: ProfilePostActivity[];
    comments: ProfileCommentActivity[];
  };
}

export interface StoryItemDto {
  storyId: number;
  imageUrl: string;
  caption: string | null;
  stationId: number | null;
  stationName: string | null;
  subwayLineId: number | null;
  subwayLineName: string | null;
  createdAt: string;
}

export interface UserStoriesResponseDto {
  generatedAt: string;
  memberId: number;
  nickname: string | null;
  isMine: boolean;
  storiesVisible: boolean;
  stories: StoryItemDto[];
}

export interface FavoriteRouteNode {
  stationId: number;
  stationName: string;
  order: number;
  favorite: boolean;
}

export interface FavoriteRouteEdge {
  fromStationId: number;
  toStationId: number;
  subwayLineId: number;
  subwayLineName: string;
}

export interface FavoriteRouteSummary {
  totalStops: number;
  transferCount: number;
  estimatedMinutes: number;
}

export type FavoriteRouteType = 'RECOMMENDED' | 'CUSTOM';

export interface FavoriteRouteDto {
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
}

export interface FavoriteRouteListDto {
  routes: FavoriteRouteDto[];
}

export type CommuteCoachRiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export interface CommuteCoachDto {
  generatedAt: string;
  targetArrivalAt: string;
  safeDepartureAt: string | null;
  departureInMinutes: number | null;
  riskLevel: CommuteCoachRiskLevel;
  riskReasons: string[];
  primaryRoute: FavoriteRouteDto | null;
  alternativeRoutes: FavoriteRouteDto[];
  guidanceMessage: string;
}

export interface CreateFavoriteRouteRequestDto {
  sourceStationId: number;
  destinationStationId: number;
  title?: string;
}

export interface RouteConnectionPolicyDto {
  sourceMaxDistance: number;
  destinationMaxDistance: number;
  totalMaxDistance: number;
}

export interface RouteConnectionAnchorRouteDto {
  sourceStationId: number;
  sourceStationName: string;
  destinationStationId: number;
  destinationStationName: string;
}

export interface RouteConnectionRecommendationDto {
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
}

export interface RouteConnectionGroupMemberDto {
  memberId: number;
  nickname: string;
  matchScore: number;
  totalDistance: number;
}

export interface RouteConnectionGroupDto {
  groupId: string;
  sourceStationId: number;
  sourceStationName: string;
  destinationStationId: number;
  destinationStationName: string;
  memberCount: number;
  members: RouteConnectionGroupMemberDto[];
}

export interface RouteConnectionGraphNodeDto {
  memberId: number;
  nickname: string;
  me: boolean;
}

export interface RouteConnectionGraphEdgeDto {
  fromMemberId: number;
  toMemberId: number;
  score: number;
  label: string;
}

export interface RouteConnectionGraphDto {
  nodes: RouteConnectionGraphNodeDto[];
  edges: RouteConnectionGraphEdgeDto[];
}

export interface RouteConnectionRecommendationsDto {
  generatedAt: string;
  matchingPolicy: RouteConnectionPolicyDto;
  anchorRoute: RouteConnectionAnchorRouteDto | null;
  recommendations: RouteConnectionRecommendationDto[];
  groups: RouteConnectionGroupDto[];
  graph: RouteConnectionGraphDto;
}
