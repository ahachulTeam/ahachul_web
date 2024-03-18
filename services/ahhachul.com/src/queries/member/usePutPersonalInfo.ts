import { useMutation, useQueryClient } from 'queries/query';
import { MemberApi } from 'api';
import { PERSONAL_INFO_KEY } from './keys';
import { useAppDispatch } from 'stores';
import { loaded, loading } from 'stores/ui';

function usePutPersonalInfo() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useMutation(MemberApi.putPersonalInfo, {
    onSettled() {
      dispatch(loaded());
    },
    onSuccess() {
      queryClient.invalidateQueries(PERSONAL_INFO_KEY);
    },
    onMutate() {
      dispatch(loading());
    },
  });
}

export default usePutPersonalInfo;
