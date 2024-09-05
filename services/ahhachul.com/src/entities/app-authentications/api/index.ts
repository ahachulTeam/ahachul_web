import { AxiosError } from 'axios';

import { base, routes, useMutation } from 'shared/api';
import { useAuthStore } from 'entities/app-authentications/slice';
import { type IToken } from 'entities/app-authentications/model';

interface APIRefreshTokenParams {
  refreshToken: IToken['refreshToken'];
}

const refreshToken = (body: APIRefreshTokenParams) =>
  base.post(`${routes.auth}/tokens`, body);

export const useRefreshToken = () => {
  const setToken = useAuthStore((state) => state.setToken);

  return useMutation({
    mutationFn: refreshToken,
    onSuccess(data) {
      setToken(data.data.payload);
    },
    onError(err) {
      if (err instanceof AxiosError) {
        setToken(null);
      }
    },
  });
};
