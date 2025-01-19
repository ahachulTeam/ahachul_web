import { useMutation } from '@tanstack/react-query';

import { apiClient } from '@/app/api';
import type { Comment, IResponse } from '@/model';

export const deleteComment = (commentId: number) =>
  apiClient.delete<IResponse<Pick<Comment, 'id'>>>(`comments/${commentId}`);

export const useDeleteComment = () => {
  return useMutation({
    mutationFn: deleteComment,
  });
};

<<<<<<< HEAD
export const updateComment = async (data: { content: string; commentId: number }) => {
  const response = await apiClient.patch<IResponse<Pick<Comment, 'id' | 'content'>>>(
    `comments/${data.commentId}`,
    {
      content: data.content,
    },
  );
=======
export const updateComment = async (data: {
  content: string;
  commentId: number;
}) => {
  const response = await apiClient.patch<
    IResponse<Pick<Comment, 'id' | 'content'>>
  >(`comments/${data.commentId}`, {
    content: data.content,
  });
>>>>>>> develop
  return response.data;
};

export const useUpdateComment = () => {
  return useMutation({
    mutationFn: updateComment,
  });
};
