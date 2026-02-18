import { useMutation } from '@tanstack/react-query';

import * as api from '@/apis/request';
import type { ApiResponse, Comment } from '@/types';

const logMutationError = (context: string, error: Error) => {
  console.error(`[comment-service] ${context}`, error);
};

export const usePostComment = () => {
  const afterSubmitFailed = (error: Error) => {
    logMutationError('failed to create comment', error);
  };

  return useMutation({
    mutationFn: api.postComment,
    onError: afterSubmitFailed,
  });
};

export const useDeleteComment = (articleId: number) => {
  const afterSubmitSuccess = (res: ApiResponse<Pick<Comment, 'id'>>) => {
    console.log('res:', res);
    console.log('articleId:', articleId);
  };
  const afterSubmitFailed = (error: Error) => {
    logMutationError('failed to delete comment', error);
  };

  return useMutation({
    mutationFn: api.deleteComment,
    onError: afterSubmitFailed,
    onSuccess: afterSubmitSuccess,
  });
};

export const useUpdateComment = () => {
  const afterSubmitFailed = (error: Error) => {
    logMutationError('failed to update comment', error);
  };

  return useMutation({
    mutationFn: api.updateComment,
    onError: afterSubmitFailed,
  });
};
