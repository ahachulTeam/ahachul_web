import { useMutation, useQueryClient } from '@/src/queries/query';
import { MemberApi } from '@/src/api';
import { PERSONAL_INFO_KEY } from './keys';
import { useAppDispatch } from '@/src/stores';
import { loaded, loading } from '@/src/stores/ui';

function usePutPersonalInfo() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: MemberApi.putPersonalInfo,
    onSettled() {
      dispatch(loaded());
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: PERSONAL_INFO_KEY });
    },
    onMutate() {
      dispatch(loading({ opacity: 1 }));
    },
  });
}

export default usePutPersonalInfo;
