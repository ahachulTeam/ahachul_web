import { API_PATHS } from '@ahhachul/http';

import { fetchClient } from '@/lib/fetch-client';
import type { ApiResponse, ArticleType } from '@/types';

import { normalizeUsernameParam } from './normalizeUsername';

export type ProfileVisibilitySettings = {
  profilePublic: boolean;
  emailPublic: boolean;
  genderAgePublic: boolean;
  postsPublic: boolean;
  commentsPublic: boolean;
};

type ProfileVisibility = ProfileVisibilitySettings & {
  profileVisible: boolean;
  postsVisible: boolean;
  commentsVisible: boolean;
};

export type ProfilePostActivity = {
  articleType: ArticleType;
  articleId: number;
  title: string;
  contentPreview: string;
  writer?: string | null;
  subwayLineId?: number | null;
  stationId?: number | null;
  createdAt: string;
};

export type ProfileCommentActivity = {
  commentId: number;
  articleType: ArticleType;
  articleId: number;
  contentPreview: string;
  writer?: string | null;
  createdAt: string;
};

export type UserProfileDetail = {
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
};

type GetUserProfileOptions = {
  asPublic?: boolean;
  limit?: number;
};

export async function getUserProfile(username: string, options: GetUserProfileOptions = {}) {
  const { asPublic = false, limit = 20 } = options;
  const normalizedUsername = normalizeUsernameParam(username);

  return fetchClient<ApiResponse<UserProfileDetail>>(
    API_PATHS.user.profileDetail(normalizedUsername),
    {
      params: {
        asPublic,
        limit,
      },
    },
  );
}

export function resolveProfileArticlePath(articleType: ArticleType, articleId: number): string {
  if (articleType === 'COMMUNITY') {
    return `/community/${articleId}`;
  }

  if (articleType === 'COMPLAINT') {
    return `/complaint/${articleId}`;
  }

  return `/lost-found/${articleId}`;
}
