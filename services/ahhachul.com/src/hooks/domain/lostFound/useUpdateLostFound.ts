import { useMutation } from '@tanstack/react-query';

import { updateLostFoundStatus } from '@/apis/request';
import { LostStatus } from '@/types';

const useUpdateLostFound = () => {
  return useMutation({
    mutationFn: ({ articleId, status }: { articleId: number; status: LostStatus }) =>
      updateLostFoundStatus(articleId, status),
  });
};

export default useUpdateLostFound;
