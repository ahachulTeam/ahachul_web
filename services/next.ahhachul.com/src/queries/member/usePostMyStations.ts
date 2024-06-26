import { useAuthMutation, useQueryClient } from '@/src/queries/query';
import { MemberApi } from '@/src/api';
import { STATIONS_KEY } from './keys';
import { useAppDispatch } from '@/src/stores';
import { loaded, loading } from '@/src/stores/ui';

function usePostMyStations() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useAuthMutation(MemberApi.postMyStations, {
    onSettled() {
      dispatch(loaded());
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: STATIONS_KEY });
    },
    onMutate() {
      dispatch(loading({ opacity: 0.45 }));
    },
  });
}

export default usePostMyStations;
