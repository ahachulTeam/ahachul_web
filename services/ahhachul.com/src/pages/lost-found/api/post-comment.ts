import { base, routes, getQueryKeys, useAuthMutation } from 'shared/api';
import { useLoadingStore } from 'entities/app-loaders/slice';
import { IResponse } from 'entities/with-server';
import { Comment } from 'features/comments/model';
import { queryClient } from 'app/lib/react-query';
import { LOST_FOUND_QUERY_KEY } from './query-key';
import { sleep } from 'shared/lib/utils/delay/sleep';

export const postComment = async (data: {
  postId: number;
  content: string;
  upperCommentId: number;
  isPrivate: boolean;
}) => {
  const { postId, content, upperCommentId, isPrivate } = data;
  const response = await base.post<
    IResponse<Pick<Comment, 'id' | 'upperCommentId' | 'content'>>
  >(`${routes['lost-found']}/${postId}/comments`, {
    content,
    upperCommentId,
    isPrivate,
  });
  return response.data;
};

export const usePostComment = (articleId: number) => {
  const { setEnableGlobalLoading, setDisableGlobalLoading } = useLoadingStore();

  const afterSubmitSuccess = (
    res: IResponse<Pick<Comment, 'id' | 'upperCommentId' | 'content'>>,
  ) => {
    console.log('res:', res);
    setDisableGlobalLoading();

    queryClient.invalidateQueries({
      queryKey: getQueryKeys(LOST_FOUND_QUERY_KEY).comments(articleId),
    });

    // setTimeout(() => {}, 500);
  };
  const afterSubmitFailed = (error: Error) => {
    setDisableGlobalLoading();
    // 토스트 띄어주고 뒤로 가기
    console.log('error with toast:', error, '토스트 띄어주고 뒤로 가기');
    window.alert('댓글 작성하다가 에러 발생');
  };

  return useAuthMutation({
    mutationFn: postComment,
    options: {
      onError: afterSubmitFailed,
      onMutate: setEnableGlobalLoading,
      onSuccess: afterSubmitSuccess,
    },
  });
};

export const deleteComment = async (commentId: number) => {
  const [response] = await Promise.allSettled([
    base.delete<IResponse<Pick<Comment, 'id'>>>(`comments/${commentId}`),
    sleep(1500),
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
