import { base, routes, useAuthMutation } from 'shared/api';
import type { ComplaintForm } from '../model/form';

const postComplaintArticle = (form: ComplaintForm) => {
  const formData = new FormData();
  for (const [key, value] of Object.entries(form)) {
    if (key !== 'imageFiles') {
      formData.append(key, value);
    }
  }

  if (form?.imageFiles) formData.append('imageFiles', form.imageFiles);

  return base.post(routes.complaints, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

const afterSubmitFailed = (error: Error) => {
  // 토스트 띄어주고 뒤로 가기
  console.log('error with toast:', error, '토스트 띄어주고 뒤로 가기');
};

const afterSubmitSuccess = () => {
  // do something with stackflow
};

export const usePostComplaintArticle = () =>
  useAuthMutation({
    mutationFn: postComplaintArticle,
    options: {
      onError: afterSubmitFailed,
      onSuccess: afterSubmitSuccess,
    },
  });
