import { CommunityApi } from '@/src/api';
import { useAuthMutation, useQueryClient } from '@/src/queries/query';
import { useEffect } from 'react';
import { getQueryKeys } from '@/src/queries/query-key';
import { COMMUNITY_LIST_KEY } from './keys';
import { useDispatch } from 'react-redux';
import { addSnackBar, loading, loaded } from '@/src/stores/ui';

export const useCommunityArticle = () => {
  const res = useAuthMutation(CommunityApi.post);

  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  useEffect(() => {
    if (res.status === 'idle') return;

    if (res.status === 'pending') {
      dispatch(loading({ opacity: 1 }));
    }

    if (res.status === 'success') {
      queryClient.invalidateQueries({ queryKey: getQueryKeys(COMMUNITY_LIST_KEY).lists() });
      dispatch(loaded());
      // pop();
      setTimeout(() => {
        // push('CommunityDetail', { articleId: res.data.data.result.id.toString() });
      }, 750);
    } else if (res.status === 'error') {
      dispatch(loaded());
      dispatch(addSnackBar({ message: '시스템 오류로 등록에 실패했어요\n잠시 후 다시 시도해주세요', posBottom: 115 }));
    }
  }, [res.status]);

  return res;
};
