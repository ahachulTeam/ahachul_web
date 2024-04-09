import { LostApi } from '@/src/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { getQueryKeys } from '@/src/queries/query-key';
import { LOST_LIST_KEY } from './keys';
import { useDispatch } from 'react-redux';
import { addSnackBar, loaded } from '@/src/stores/ui';

export const useLostArticle = () => {
  const res = useMutation({
    mutationFn: LostApi.post,
  });

  // const { pop, push } = useFlow();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  useEffect(() => {
    if (res.status === 'idle') return;

    if (res.status === 'pending') {
      // dispatch(loading());
    }

    if (res.status === 'success') {
      queryClient.invalidateQueries({ queryKey: getQueryKeys(LOST_LIST_KEY).lists() });
      dispatch(loaded());
      // pop();
      // setTimeout(() => {
      //   push('LostDetail', { articleId: res.data.data.result.id.toString() });
      // }, 750);
    } else if (res.status === 'error') {
      dispatch(loaded());
      dispatch(addSnackBar({ message: `시스템 오류로 등록에 실패했어요\n잠시 후 다시 시도해주세요`, posBottom: 115 }));
    }
  }, [res.status]);

  return res;
};
