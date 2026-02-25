import { QueryFunction } from '@tanstack/react-query';

import { communityQueryKeys } from '@ahhachul/domain';
import { API_PATHS, API_SORT } from '@ahhachul/http';

import { API_BASE_URL } from '@/constants';
import { fetchClient } from '@/lib/fetch-client';
import type { CommentList, IResponse } from '@/types';

export type CommentSortOption = 'latest' | 'popular';

const COMMENT_SORT_VALUE: Record<CommentSortOption, string> = {
  latest: API_SORT.createdAtDesc,
  popular: API_SORT.likesDesc,
};

type CommunityCommentsQueryKey = readonly [
  ...ReturnType<typeof communityQueryKeys.comments>,
  CommentSortOption,
];

type CreateCommunityCommentRequest = {
  content: string;
  upperCommentId?: number | null;
  isPrivate?: boolean;
};

export const getCommunityComments: QueryFunction<
  IResponse<CommentList>,
  CommunityCommentsQueryKey
> = async ({ queryKey }) => {
  const [, , id, , sortOption = 'latest'] = queryKey;
  const commentTags = communityQueryKeys.comments(id).map(value => String(value));
  const endpoint = `${API_BASE_URL}${API_PATHS.community.comments(id)}?sort=${COMMENT_SORT_VALUE[sortOption]}`;
  const res = await fetch(endpoint, {
    next: {
      tags: commentTags,
    },
    credentials: 'include',
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
};

export function createCommunityComment(postId: number, request: CreateCommunityCommentRequest) {
  const payload =
    request.upperCommentId !== undefined && request.upperCommentId !== null
      ? {
          upperCommentId: request.upperCommentId,
          content: request.content,
        }
      : {
          upperCommentId: null,
          content: request.content,
          isPrivate: request.isPrivate ?? false,
        };

  return fetchClient<IResponse<{ id: number; upperCommentId: number | null; content: string }>>(
    API_PATHS.community.comments(postId),
    {
      method: 'POST',
      body: JSON.stringify(payload),
    },
  );
}

export function updateCommunityComment(postId: number, commentId: number, content: string) {
  return fetchClient<IResponse<{ id: number; content: string }>>(
    API_PATHS.community.comment(postId, commentId),
    {
      method: 'PATCH',
      body: JSON.stringify({ content }),
    },
  );
}

export function deleteCommunityComment(postId: number, commentId: number) {
  return fetchClient<IResponse<{ id: number }>>(API_PATHS.community.comment(postId, commentId), {
    method: 'DELETE',
  });
}

export function likeCommunityComment(commentId: number) {
  return fetchClient<IResponse<null>>(API_PATHS.comment.likes(commentId), {
    method: 'POST',
  });
}

export function unlikeCommunityComment(commentId: number) {
  return fetchClient<IResponse<null>>(API_PATHS.comment.likes(commentId), {
    method: 'DELETE',
  });
}
