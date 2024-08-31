import { LostApi } from '@/src/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { getQueryKeys } from '@/src/queries/query-key';
import { LOST_LIST_KEY } from './keys';
import { useDispatch } from 'react-redux';
import { addSnackBar, loaded, loading } from '@/src/stores/ui';
import { useRouter } from 'next/router';
import { PATH } from '@/src/data';

export const useLostArticle = () => {
  const res = useMutation({
    mutationFn: LostApi.post,
  });

  const { replace } = useRouter();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  useEffect(() => {
    if (res.status === 'idle') return;

    if (res.status === 'pending') {
      dispatch(loading({ opacity: 1 }));
    }

    if (res.status === 'success') {
      queryClient.invalidateQueries({ queryKey: getQueryKeys(LOST_LIST_KEY).lists() });
      dispatch(loaded());
      // pop();
      setTimeout(() => {
        replace(`${PATH.lostDetail}/1`);
      }, 750);
    } else if (res.status === 'error') {
      dispatch(loaded());
      dispatch(addSnackBar({ message: `시스템 오류로 등록에 실패했어요\n잠시 후 다시 시도해주세요`, posBottom: 115 }));
    }
  }, [res.status]);

  return res;
};
