import { useMutation } from '@tanstack/react-query';

import * as api from '@/apis/request';
import type { ApiResponse, Comment } from '@/types';

export const usePostComment = () => {
  const afterSubmitFailed = (error: Error) => {
    // 토스트 띄어주고 뒤로 가기
    console.log('error with toast:', error, '토스트 띄어주고 뒤로 가기');
    window.alert('댓글 작성하다가 에러 발생');
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
    // 토스트 띄어주고 뒤로 가기
    console.log('error with toast:', error, '토스트 띄어주고 뒤로 가기');
    window.alert('댓글 식제하다가 에러 발생');
  };

  return useMutation({
    mutationFn: api.deleteComment,
    onError: afterSubmitFailed,
    onSuccess: afterSubmitSuccess,
  });
};

export const useUpdateComment = () => {
  const afterSubmitFailed = (error: Error) => {
    console.log('error with toast:', error, '토스트 띄어주고 뒤로 가기');
    window.alert('댓글 수정하다가 에러 발생');
  };

  return useMutation({
    mutationFn: api.updateComment,
    onError: afterSubmitFailed,
  });
};
