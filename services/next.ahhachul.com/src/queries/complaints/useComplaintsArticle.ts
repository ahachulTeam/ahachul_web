import { ComplaintsApi } from '@/src/api';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { addSnackBar, loaded, loading } from '@/src/stores/ui';
import { PATH } from '@/src/data';

export const useComplaintsArticle = () => {
  const res = useMutation({
    mutationFn: ComplaintsApi.post,
  });

  const {  replace } = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (res.status === 'idle') return;

    if (res.status === 'pending') {
      dispatch(loading({ opacity: 1 }));
    }

    if (res.status === 'success') {
      dispatch(loaded());
      replace(`${PATH.complaintDetail}/1`);
      setTimeout(() => {
        dispatch(addSnackBar({ message: `민원을 등록했어요` }));
      }, 750);
    } else if (res.status === 'error') {
      dispatch(loaded());
      dispatch(addSnackBar({ message: `시스템 오류로 등록에 실패했어요\n잠시 후 다시 시도해주세요` }));
    }
  }, [res.status]);

  return res;
};
