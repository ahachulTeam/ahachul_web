import { useMutation } from '@tanstack/react-query';

import * as api from '@/apis/request';
import type { ApiResponse, Comment } from '@/types';
import { createActionLogger } from '@/utils/observability';

const commentLogger = createActionLogger('comment-service');

const logMutationError = (context: string, error: Error, fallbackMessage: string) => {
  commentLogger.fail(context, error, undefined, fallbackMessage);
};

export const usePostComment = () => {
  const afterSubmitFailed = (error: Error) => {
    logMutationError('create-comment', error, '댓글 작성에 실패했습니다.');
  };

  return useMutation({
    mutationFn: api.postComment,
    onError: afterSubmitFailed,
  });
};

export const useDeleteComment = (articleId: number) => {
  const afterSubmitSuccess = (res: ApiResponse<Pick<Comment, 'id'>>) => {
    commentLogger.success('delete-comment', {
      articleId,
      commentId: res.result.id,
    });
  };
  const afterSubmitFailed = (error: Error) => {
    logMutationError('delete-comment', error, '댓글 삭제에 실패했습니다.');
  };

  return useMutation({
    mutationFn: api.deleteComment,
    onError: afterSubmitFailed,
    onSuccess: afterSubmitSuccess,
  });
};

export const useUpdateComment = () => {
  const afterSubmitFailed = (error: Error) => {
    logMutationError('update-comment', error, '댓글 수정에 실패했습니다.');
  };

  return useMutation({
    mutationFn: api.updateComment,
    onError: afterSubmitFailed,
  });
};
