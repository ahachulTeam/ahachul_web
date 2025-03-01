import { useMutation, useQueryClient } from '@tanstack/react-query';

import * as api from '@/apis/request';
import useLoadingStore from '@/stores/ui';
import type { ApiResponse, Comment } from '@/types';

export const usePostComment = (queryKey: unknown[], showLoading = false) => {
  const queryClient = useQueryClient();
  const { setEnableGlobalLoading, setDisableGlobalLoading } = useLoadingStore();

  const afterSubmitSuccess = () => {
    showLoading && setDisableGlobalLoading();

    queryClient.invalidateQueries({
      queryKey,
    });
  };

  const afterSubmitFailed = (error: Error) => {
    showLoading && setDisableGlobalLoading();
    // 토스트 띄어주고 뒤로 가기
    console.log('error with toast:', error, '토스트 띄어주고 뒤로 가기');
    window.alert('댓글 작성하다가 에러 발생');
  };

  return useMutation({
    mutationFn: api.postComment,
    onError: afterSubmitFailed,
    onMutate: showLoading ? setEnableGlobalLoading : () => {},
    onSuccess: afterSubmitSuccess,
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

export const useUpdateComment = (queryKey: unknown[], showLoading = false) => {
  const queryClient = useQueryClient();
  const { setEnableGlobalLoading, setDisableGlobalLoading } = useLoadingStore();

  const afterSubmitSuccess = () => {
    showLoading && setDisableGlobalLoading();

    queryClient.invalidateQueries({
      queryKey,
    });
  };

  const afterSubmitFailed = (error: Error) => {
    showLoading && setDisableGlobalLoading();
    console.log('error with toast:', error, '토스트 띄어주고 뒤로 가기');
    window.alert('댓글 수정하다가 에러 발생');
  };

  return useMutation({
    mutationFn: api.updateComment,
    onError: afterSubmitFailed,
    onMutate: showLoading ? setEnableGlobalLoading : () => {},
    onSuccess: afterSubmitSuccess,
  });
};
