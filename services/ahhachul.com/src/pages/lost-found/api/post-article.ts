import { base, getQueryKeys, routes, useAuthMutation } from 'shared/api';
import type { LostForm } from '../model/form';
import { useLoadingStore } from 'entities/app-loaders/slice';
import { useFlow } from 'app/stackflow';
import { IResponse } from 'entities/with-server';
import { LostFoundDetail } from '../model';
import { queryClient } from 'app/lib/react-query';
import { LOST_FOUND_QUERY_KEY } from './query-key';

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
    form.imageFiles.forEach((file) => {
      formData.append('files', file, file.name);
    });
  }

  const response = await base.post<
    IResponse<Pick<LostFoundDetail, 'id' | 'images'>>
  >(routes['lost-found'], formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const usePostLostAndFoundArticle = () => {
  const { pop, push } = useFlow();
  const { setEnableGlobalLoading, setDisableGlobalLoading } = useLoadingStore();

  const afterSubmitSuccess = (
    res: IResponse<Pick<LostFoundDetail, 'id' | 'images'>>,
  ) => {
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
    alert('글 작성하다가 에러 발생');
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
