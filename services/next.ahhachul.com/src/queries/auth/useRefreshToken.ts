import { AxiosError } from 'axios';

import { useMutation } from '@/src/queries/query';
import { AuthApi } from '@/src/api';
import { useAppDispatch } from '@/src/stores';
import { setToken } from '@/src/stores/auth';

function useRefreshToken() {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: AuthApi.refreshToken,
    onSuccess(data) {
      dispatch(setToken(data.data.result));
    },
    onError(err) {
      if (err instanceof AxiosError) {
        dispatch(setToken(null));
      }
    },
  });
}

export default useRefreshToken;
