import { useMutation, useQueryClient } from '@tanstack/react-query';

import { API_SORT } from '@ahhachul/http';

import * as api from '@/apis/request';
import type { ApiResponse, Comment } from '@/types';
import { createActionLogger } from '@/utils/observability';

const commentLogger = createActionLogger('comment-service');

const logMutationError = (context: string, error: Error, fallbackMessage: string) => {
  commentLogger.fail(context, error, undefined, fallbackMessage);
};

export type CommentSortOption = 'latest' | 'popular';

export const COMMENT_SORT_VALUE: Record<CommentSortOption, string> = {
  latest: API_SORT.createdAtDesc,
  popular: API_SORT.likesDesc,
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

export const useToggleCommentLike = (
  commentId: number,
  likedByMe: boolean,
  queryKey?: readonly unknown[],
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => (likedByMe ? api.unlikeComment(commentId) : api.likeComment(commentId)),
    onSuccess: async () => {
      if (queryKey && queryKey.length > 0) {
        await queryClient.invalidateQueries({ queryKey });
      }
    },
    onError: error => {
      logMutationError('toggle-comment-like', error, '댓글 좋아요 처리에 실패했습니다.');
    },
  });
};
