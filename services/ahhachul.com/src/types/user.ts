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

export interface CreateFavoriteRouteRequestDto {
  sourceStationId: number;
  destinationStationId: number;
  title?: string;
}
