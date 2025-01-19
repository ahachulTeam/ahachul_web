<<<<<<< HEAD
import { useMutation } from '@tanstack/react-query';

import { apiClient } from '@/app/api';
=======
import { apiClient } from '@/app/api';
import { useMutation } from '@tanstack/react-query';

>>>>>>> main
import type { ErrorCode } from '@/model/Error';

type PostLostFoundParams = {
  lostId: string | null;
  postData: FormData;
};

const postLostFound = ({ lostId, postData }: PostLostFoundParams) =>
  apiClient.post(`/lost-posts/${lostId || ''}`, postData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export const usePostLostFound = (successCallback: (id: string) => void) => {
  return useMutation({
    mutationFn: (params: PostLostFoundParams) => postLostFound(params),
    onError: () => {
      alert('유실물 등록 에러 발생');
    },
    onSuccess: (res: { data: { code: ErrorCode; result: { id: string } } }) => {
      const {
        data: {
          code,
          result: { id },
        },
      } = res;

      if (code === '100') {
        successCallback(id);
      }
    },
  });
};
