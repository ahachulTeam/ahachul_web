import { API_PATHS } from '@ahhachul/http';

import { fetchClient } from '@/lib/fetch-client';
import type { ApiResponse, ArticleHistoryItem } from '@/types';

export type ArticleReactionHistoryResponse = ApiResponse<{
  likedArticles: ArticleHistoryItem[];
  bookmarkedArticles: ArticleHistoryItem[];
}>;

export async function likeCommunityPost(id: number) {
  return fetchClient<ApiResponse<null>>(API_PATHS.community.like(id), { method: 'POST' });
}

export async function unlikeCommunityPost(id: number) {
  return fetchClient<ApiResponse<null>>(API_PATHS.community.like(id), { method: 'DELETE' });
}

export async function likeComplaintPost(id: number) {
  return fetchClient<ApiResponse<null>>(API_PATHS.complaint.like(id), { method: 'POST' });
}

export async function unlikeComplaintPost(id: number) {
  return fetchClient<ApiResponse<null>>(API_PATHS.complaint.like(id), { method: 'DELETE' });
}

export async function likeLostPost(id: number) {
  return fetchClient<ApiResponse<null>>(API_PATHS.lostFound.like(id), { method: 'POST' });
}

export async function unlikeLostPost(id: number) {
  return fetchClient<ApiResponse<null>>(API_PATHS.lostFound.like(id), { method: 'DELETE' });
}

export async function bookmarkCommunityPost(id: number) {
  return fetchClient<ApiResponse<null>>(API_PATHS.community.bookmark(id), { method: 'POST' });
}

export async function unbookmarkCommunityPost(id: number) {
  return fetchClient<ApiResponse<null>>(API_PATHS.community.bookmark(id), { method: 'DELETE' });
}

export async function bookmarkComplaintPost(id: number) {
  return fetchClient<ApiResponse<null>>(API_PATHS.complaint.bookmark(id), { method: 'POST' });
}

export async function unbookmarkComplaintPost(id: number) {
  return fetchClient<ApiResponse<null>>(API_PATHS.complaint.bookmark(id), { method: 'DELETE' });
}

export async function bookmarkLostPost(id: number) {
  return fetchClient<ApiResponse<null>>(API_PATHS.lostFound.bookmark(id), { method: 'POST' });
}

export async function unbookmarkLostPost(id: number) {
  return fetchClient<ApiResponse<null>>(API_PATHS.lostFound.bookmark(id), { method: 'DELETE' });
}

export async function getMyArticleReactionHistories(limit = 30) {
  return fetchClient<ArticleReactionHistoryResponse>(
    `${API_PATHS.user.articleHistories}?limit=${limit}`,
  );
}
