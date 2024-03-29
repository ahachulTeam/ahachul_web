import { useMutation } from 'queries/query';
import { AuthApi } from 'api';
import { AxiosError } from 'axios';
import { useAppDispatch } from 'stores';
import { setToken } from 'stores/auth';

function useRefreshToken() {
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: AuthApi.refreshToken,
    onSuccess(data) {
      dispatch(setToken(data.data.payload));
    },
    onError(err) {
      if (err instanceof AxiosError) {
        dispatch(setToken(null));
      }
    },
  });
}

export default useRefreshToken;
