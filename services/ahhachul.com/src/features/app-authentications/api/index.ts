import { AxiosError } from 'axios';

import { useAppDispatch } from 'shared/stores';
import { axiosInstance, axiosRoutes, useMutation } from 'shared/api';

import { setToken } from '../slice';
import { type IToken } from '../model';

type refreshTokenBodyType = {
  refreshToken: IToken['refreshToken'];
};

const refreshToken = (body: refreshTokenBodyType) => axiosInstance.post(`${axiosRoutes}/tokens`, body);

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
