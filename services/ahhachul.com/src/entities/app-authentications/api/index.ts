import { AxiosError } from 'axios';

import { useAppDispatch } from 'shared/stores';
import { base, routes, useMutation } from 'shared/api';

import { setToken } from '../slice';
import { type IToken } from '../model';

interface APIRefreshTokenBody {
  refreshToken: IToken['refreshToken'];
}

const refreshToken = (body: APIRefreshTokenBody) =>
  base.post(`${routes.auth}/tokens`, body);

export const useRefreshToken = () => {
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
