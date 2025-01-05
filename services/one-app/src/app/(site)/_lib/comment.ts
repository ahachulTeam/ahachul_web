import { useMutation } from '@tanstack/react-query';

import { apiClient } from '@/app/api';
import type { IResponse } from '@/model/Utils';
import type { Comment } from '@/model/Comment';

export const deleteComment = (commentId: number) =>
  apiClient.delete<IResponse<Pick<Comment, 'id'>>>(`comments/${commentId}`);

export const useDeleteComment = () => {
  return useMutation({
    mutationFn: deleteComment,
  });
};

export const updateComment = async (data: {
  content: string;
  commentId: number;
}) => {
  const response = await apiClient.patch<
    IResponse<Pick<Comment, 'id' | 'content'>>
  >(`comments/${data.commentId}`, {
    content: data.content,
  });
  return response.data;
};

export const useUpdateComment = () => {
  return useMutation({
    mutationFn: updateComment,
  });
};
