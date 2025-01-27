import { useMutation } from '@tanstack/react-query';

import { axiosInstance } from '@/api/axios';
import type { Comment, IResponse } from '@/model';

export const deleteComment = (commentId: number) =>
  axiosInstance.delete<IResponse<Pick<Comment, 'id'>>>(`comments/${commentId}`);

export const useDeleteComment = () => {
  return useMutation({
    mutationFn: deleteComment,
  });
};

export const updateComment = async (data: { content: string; commentId: number }) => {
  const response = await axiosInstance.patch<IResponse<Pick<Comment, 'id' | 'content'>>>(
    `comments/${data.commentId}`,
    {
      content: data.content,
    },
  );
  return response.data;
};

export const useUpdateComment = () => {
  return useMutation({
    mutationFn: updateComment,
  });
};
