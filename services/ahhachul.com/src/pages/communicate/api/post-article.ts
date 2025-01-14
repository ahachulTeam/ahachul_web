import { base, routes, useAuthMutation } from 'shared/api';

import type { CommunityForm } from '../model/form';

const afterSubmitFailed = (error: Error) => {
  // 토스트 띄어주고 뒤로 가기
  console.log('error with toast:', error, '토스트 띄어주고 뒤로 가기');
};

const afterSubmitSuccess = () => {
  // do something with stackflow
};

const postCommunityArticle = (form: CommunityForm) => {
  const formData = new FormData();
  for (const [key, value] of Object.entries(form)) {
    if (key !== 'imageFiles') {
      formData.append(key, value);
    }
  }

  if (form?.imageFiles) formData.append('imageFiles', form.imageFiles);

  return base.post(routes.community, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const usePostCommunityArticle = () =>
  useAuthMutation({
    mutationFn: postCommunityArticle,
    options: {
      onError: afterSubmitFailed,
      onSuccess: afterSubmitSuccess,
    },
  });
