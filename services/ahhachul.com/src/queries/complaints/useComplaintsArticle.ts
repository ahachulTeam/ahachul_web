import { ComplaintsApi } from 'api';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useFlow } from 'stackflow';
import { useDispatch } from 'react-redux';
import { addSnackBar, loaded, loading } from 'stores/ui';
import { setView } from 'stores/complaints';

export const useComplaintsArticle = () => {
  const res = useMutation({
    mutationFn: ComplaintsApi.post,
  });

  const { push, pop } = useFlow();
  const dispatch = useDispatch();

  useEffect(() => {
    if (res.status === 'idle') return;

    if (res.status === 'pending') {
      dispatch(loading());
    }

    if (res.status === 'success') {
      dispatch(loaded());
      dispatch(setView('LIST'));
      pop(2);
      push('ComplaintDetail', { articleId: '1' });
      setTimeout(() => {
        dispatch(addSnackBar({ message: `민원을 등록했어요`, posBottom: 115 }));
      }, 750);
    } else if (res.status === 'error') {
      dispatch(loaded());
      dispatch(addSnackBar({ message: `시스템 오류로 등록에 실패했어요\n잠시 후 다시 시도해주세요`, posBottom: 115 }));
    }
  }, [res.status]);

  return res;
};
