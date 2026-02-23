import { QueryFunction } from '@tanstack/react-query';

import { lostFoundQueryKeys } from '@ahhachul/domain';
import { API_PATHS, API_SORT } from '@ahhachul/http';

import { API_BASE_URL } from '@/constants';
import { fetchClient } from '@/lib/fetch-client';
import type { CommentList, IResponse } from '@/types';

type LostFoundCommentsQueryKey = ReturnType<typeof lostFoundQueryKeys.comments>;

type CreateLostFoundCommentRequest = {
  content: string;
  upperCommentId?: number | null;
  isPrivate?: boolean;
};

export const getLostFoundComments: QueryFunction<
  IResponse<CommentList>,
  LostFoundCommentsQueryKey
> = async ({ queryKey }) => {
  const [, , id] = queryKey;
  const commentTags = lostFoundQueryKeys.comments(id).map(value => String(value));
  const endpoint = `${API_BASE_URL}${API_PATHS.lostFound.comments(id)}?sort=${API_SORT.createdAtAsc}`;
  const res = await fetch(endpoint, {
    next: {
      tags: commentTags,
    },
    credentials: 'include',
    cache: 'no-store',
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
};

export function createLostFoundComment(postId: number, request: CreateLostFoundCommentRequest) {
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
    API_PATHS.lostFound.comments(postId),
    {
      method: 'POST',
      body: JSON.stringify(payload),
    },
  );
}

export function updateLostFoundComment(postId: number, commentId: number, content: string) {
  return fetchClient<IResponse<{ id: number; content: string }>>(
    API_PATHS.lostFound.comment(postId, commentId),
    {
      method: 'PATCH',
      body: JSON.stringify({ content }),
    },
  );
}

export function deleteLostFoundComment(postId: number, commentId: number) {
  return fetchClient<IResponse<{ id: number }>>(API_PATHS.lostFound.comment(postId, commentId), {
    method: 'DELETE',
  });
}
