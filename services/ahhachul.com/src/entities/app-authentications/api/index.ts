import { AxiosError } from 'axios';

import { useAppDispatch } from 'shared/stores';
import { base, routes, useMutation } from 'shared/api';

import { setToken } from '../slice';
import { type IToken } from '../model';

type refreshTokenBodyType = {
  refreshToken: IToken['refreshToken'];
};

const refreshToken = (body: refreshTokenBodyType) => base.post(`${routes}/tokens`, body);

const useRefreshToken = () => {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: refreshToken,
    onSuccess(data) {
      dispatch(setToken(data.data.payload));
    },
    onError(err) {
      if (err instanceof AxiosError) {
        dispatch(setToken(null));
      }
    },
  });
};

export { useRefreshToken };
