import type { ApiServicePath } from '@ahhachul/http';
import { sleep } from '@ahhachul/utils';

import axiosInstance from '@/apis/fetcher';
import type { ApiResponse, Comment } from '@/types';

export const postComment = async (data: {
  servicePath: ApiServicePath;
  postId: number;
  content: string;
  upperCommentId: number | null;
  isPrivate?: boolean;
}) => {
  const { servicePath, postId, content, upperCommentId, isPrivate } = data;

  const response = await axiosInstance.post<
    ApiResponse<Pick<Comment, 'id' | 'upperCommentId' | 'content'>>
  >(`/${servicePath}/${postId}/comments`, {
    content,
    upperCommentId,
    isPrivate,
  });

  return response.data;
};

export const deleteComment = async (commentId: number) => {
  const [response] = await Promise.allSettled([
    axiosInstance.delete<ApiResponse<Pick<Comment, 'id'>>>(`/comments/${commentId}`),
    sleep(750),
  ]);

  if (response.status === 'rejected') {
    throw response.reason;
  }

  if (response.status === 'fulfilled') {
    return response.value.data;
  }

  // TODO: sentry에 로그 남기기
  throw new Error('Unexpected state in Promise.allSettled');
};

export const updateComment = async (data: { content: string; commentId: number }) => {
  const { content, commentId } = data;
  const response = await axiosInstance.patch<ApiResponse<Pick<Comment, 'id' | 'content'>>>(
    `/comments/${commentId}`,
    {
      content,
    },
  );
  return response.data;
};
