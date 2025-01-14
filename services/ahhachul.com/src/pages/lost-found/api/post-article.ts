import { queryClient } from 'app/lib/react-query';
import { useFlow } from 'app/stackflow';
import { useLoadingStore } from 'entities/app-loaders/slice';
import { IResponse } from 'entities/with-server';
import { Article } from 'features/articles';
import { base, getQueryKeys, routes, useAuthMutation } from 'shared/api';
import { sleep } from 'shared/lib/utils/delay/sleep';

import { LOST_FOUND_QUERY_KEY } from './query-key';

import type { LostFoundDetail, LostStatusType } from '../model';
import type { LostForm } from '../model/form';

export const postLostAndFoundArticle = async (form: LostForm) => {
  const formDataWithoutImages = Object.entries(form).reduce(
    (acc, [key, value]) => {
      if (key !== 'imageFiles') {
        acc[key] = value;
      }
      return acc;
    },
    {} as Omit<LostForm, 'imageFiles'>,
  );

  const formData = new FormData();
  const jsonBlob = new Blob([JSON.stringify(formDataWithoutImages)], {
    type: 'application/json',
  });
  formData.append('content', jsonBlob);

  if (form.imageFiles && Array.isArray(form.imageFiles)) {
    form.imageFiles.forEach(file => {
      formData.append('files', file, file.name);
    });
  }

  const response = await base.post<IResponse<Pick<LostFoundDetail, 'id' | 'images'>>>(
    routes['lost-found'],
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return response.data;
};

export const usePostLostAndFoundArticle = () => {
  const { pop, push } = useFlow();
  const { setEnableGlobalLoading, setDisableGlobalLoading } = useLoadingStore();

  const afterSubmitSuccess = (res: IResponse<Pick<LostFoundDetail, 'id' | 'images'>>) => {
    setDisableGlobalLoading();

    queryClient.invalidateQueries({
      queryKey: getQueryKeys(LOST_FOUND_QUERY_KEY).lists(), // TODO: 필터에 맞는 키로 교체해주기
    });
    pop();
    setTimeout(() => {
      push('LostFoundDetail', {
        articleId: res.result.id,
      });
    }, 500);
  };
  const afterSubmitFailed = (error: Error) => {
    setDisableGlobalLoading();
    // 토스트 띄어주고 뒤로 가기
    console.log('error with toast:', error, '토스트 띄어주고 뒤로 가기');
    window.alert('글 작성하다가 에러 발생');
  };

  return useAuthMutation({
    mutationFn: postLostAndFoundArticle,
    options: {
      onMutate: setEnableGlobalLoading,
      onError: afterSubmitFailed,
      onSuccess: afterSubmitSuccess,
    },
  });
};

export const deleteLostFoundArticle = async (articleId: number) => {
  const [response] = await Promise.allSettled([
    base.delete<IResponse<Pick<Article, 'id'>>>(`${routes['lost-found']}/${articleId}`),
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

export const useDeleteLostFoundArticle = () => {
  const afterSubmitSuccess = (res: IResponse<Pick<Article, 'id'>>) => {
    console.log('res:', res);
  };
  const afterSubmitFailed = (error: Error) => {
    // 토스트 띄어주고 뒤로 가기
    console.log('error with toast:', error, '토스트 띄어주고 뒤로 가기');
    window.alert('글 삭제 에러 발생, 아마 Me.id !== Post.id 인데 삭제하려해서 그런걸거임.');
  };

  return useAuthMutation({
    mutationFn: deleteLostFoundArticle,
    options: {
      onError: afterSubmitFailed,
      onSuccess: afterSubmitSuccess,
    },
  });
};

export const updateLostAndFoundArticle = async (form: LostForm) => {
  const formDataWithoutImages = Object.entries(form).reduce(
    (acc, [key, value]) => {
      if (key !== 'imageFiles') {
        acc[key] = value;
      }
      return acc;
    },
    {} as Omit<LostForm, 'imageFiles'>,
  );

  const formData = new FormData();
  const jsonBlob = new Blob([JSON.stringify(formDataWithoutImages)], {
    type: 'application/json',
  });
  formData.append('content', jsonBlob);

  if (form.imageFiles && Array.isArray(form.imageFiles)) {
    form.imageFiles.forEach(file => {
      formData.append('files', file, file.name);
    });
  }

  const response = await base.post<IResponse<Pick<LostFoundDetail, 'id' | 'images'>>>(
    routes['lost-found'],
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return response.data;
};

export const useUpdateLostAndFoundArticle = () => {
  const { pop, push } = useFlow();
  const { setEnableGlobalLoading, setDisableGlobalLoading } = useLoadingStore();

  const afterSubmitSuccess = (res: IResponse<Pick<LostFoundDetail, 'id' | 'images'>>) => {
    setDisableGlobalLoading();

    queryClient.invalidateQueries({
      queryKey: getQueryKeys(LOST_FOUND_QUERY_KEY).lists(), // TODO: 필터에 맞는 키로 교체해주기
    });
    pop();
    setTimeout(() => {
      push('LostFoundDetail', {
        articleId: res.result.id,
      });
    }, 500);
  };
  const afterSubmitFailed = (error: Error) => {
    setDisableGlobalLoading();
    // 토스트 띄어주고 뒤로 가기
    console.log('error with toast:', error, '토스트 띄어주고 뒤로 가기');
    window.alert('글 작성하다가 에러 발생');
  };

  return useAuthMutation({
    mutationFn: updateLostAndFoundArticle,
    options: {
      onMutate: setEnableGlobalLoading,
      onError: afterSubmitFailed,
      onSuccess: afterSubmitSuccess,
    },
  });
};

export const updateLostFoundStatus = async ({
  postId,
  status,
}: {
  postId: number;
  status: LostStatusType;
}) => {
  const [response] = await Promise.allSettled([
    base.patch<{ status: LostStatusType }>(`${routes['lost-found']}/${postId}/status`, {
      status: status === 'COMPLETE' ? 'PROGRESS' : 'COMPLETE',
    }),
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

export const useUpdateLostGoundStatus = () => {
  const afterSubmitSuccess = (res: { status: LostStatusType }) => {
    console.log('res:', res);
  };
  const afterSubmitFailed = (error: Error) => {
    // 토스트 띄어주고 뒤로 가기
    console.log('error with toast:', error, '토스트 띄어주고 뒤로 가기');
    window.alert('글 작성하다가 에러 발생');
  };

  return useAuthMutation({
    mutationFn: updateLostFoundStatus,
    options: {
      onError: afterSubmitFailed,
      onSuccess: afterSubmitSuccess,
    },
  });
};
