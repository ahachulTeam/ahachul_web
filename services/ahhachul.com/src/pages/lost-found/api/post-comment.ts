import { queryClient } from 'app/lib/react-query';
import { useLoadingStore } from 'entities/app-loaders/slice';
import { IResponse } from 'entities/with-server';
import { Comment } from 'features/comments/model';
import { base, routes, getQueryKeys, useAuthMutation } from 'shared/api';
import { sleep } from 'shared/lib/utils/delay/sleep';

import { LOST_FOUND_QUERY_KEY } from './query-key';

export const postComment = async (data: {
  postId: number;
  content: string;
  upperCommentId: number;
  isPrivate: boolean;
}) => {
  const { postId, content, upperCommentId, isPrivate } = data;
  const response = await base.post<IResponse<Pick<Comment, 'id' | 'upperCommentId' | 'content'>>>(
    `${routes['lost-found']}/${postId}/comments`,
    {
      content,
      upperCommentId,
      isPrivate,
    },
  );
  return response.data;
};

export const usePostComment = (articleId: number, showLoading = false) => {
  const { setEnableGlobalLoading, setDisableGlobalLoading } = useLoadingStore();

  const afterSubmitSuccess = () => {
    showLoading && setDisableGlobalLoading();

    queryClient.invalidateQueries({
      queryKey: getQueryKeys(LOST_FOUND_QUERY_KEY).comments(articleId),
    });
  };
  const afterSubmitFailed = (error: Error) => {
    showLoading && setDisableGlobalLoading();
    // 토스트 띄어주고 뒤로 가기
    console.log('error with toast:', error, '토스트 띄어주고 뒤로 가기');
    window.alert('댓글 작성하다가 에러 발생');
  };

  return useAuthMutation({
    mutationFn: postComment,
    options: {
      onError: afterSubmitFailed,
      onMutate: showLoading ? setEnableGlobalLoading : () => {},
      onSuccess: afterSubmitSuccess,
    },
  });
};

export const deleteComment = async (commentId: number) => {
  const [response] = await Promise.allSettled([
    base.delete<IResponse<Pick<Comment, 'id'>>>(`comments/${commentId}`),
    sleep(750),
  ]);

  if (response.status === 'rejected') {
    throw response.reason;
  }

  if (response.status === 'fulfilled') {
    return response.value.data;
  }

  // TODO: sentry에 로그 남김
  throw new Error('Unexpected state in Promise.allSettled');
};

export const useDeleteComment = (articleId: number) => {
  const afterSubmitSuccess = (res: IResponse<Pick<Comment, 'id'>>) => {
    console.log('res:', res);
    console.log('articleId:', articleId);
  };
  const afterSubmitFailed = (error: Error) => {
    // 토스트 띄어주고 뒤로 가기
    console.log('error with toast:', error, '토스트 띄어주고 뒤로 가기');
    window.alert('댓글 식제하다가 에러 발생');
  };

  return useAuthMutation({
    mutationFn: deleteComment,
    options: {
      onError: afterSubmitFailed,
      onSuccess: afterSubmitSuccess,
    },
  });
};

export const updateComment = async (data: { content: string; commentId: number }) => {
  const { content, commentId } = data;
  const response = await base.patch<IResponse<Pick<Comment, 'id' | 'content'>>>(
    `comments/${commentId}`,
    {
      content,
    },
  );
  return response.data;
};

export const useUpdateComment = (articleId: number, showLoading = false) => {
  const { setEnableGlobalLoading, setDisableGlobalLoading } = useLoadingStore();

  const afterSubmitSuccess = () => {
    showLoading && setDisableGlobalLoading();

    queryClient.invalidateQueries({
      queryKey: getQueryKeys(LOST_FOUND_QUERY_KEY).comments(articleId),
    });
  };
  const afterSubmitFailed = (error: Error) => {
    showLoading && setDisableGlobalLoading();
    // 토스트 띄어주고 뒤로 가기
    console.log('error with toast:', error, '토스트 띄어주고 뒤로 가기');
    window.alert('댓글 수정하다가 에러 발생');
  };

  return useAuthMutation({
    mutationFn: updateComment,
    options: {
      onError: afterSubmitFailed,
      onMutate: showLoading ? setEnableGlobalLoading : () => {},
      onSuccess: afterSubmitSuccess,
    },
  });
};
