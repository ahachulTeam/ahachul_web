import { AxiosError } from 'axios';

import { base, routes, useMutation } from 'shared/api';
import { useAuthStore } from 'entities/app-authentications/slice';
import type {
  ISocialSignInParams,
  IToken,
} from 'entities/app-authentications/model';
import { IResponse } from 'entities/with-server';

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
      setToken(data.data);
    },
    onError(err) {
      if (err instanceof AxiosError) {
        setToken(null);
      }
    },
  });
};

export interface ISocialSignInResponse extends IToken {
  memberId: number;
  isNeedAdditionalUserInfo: boolean;
}

const login = async (body: ISocialSignInParams) => {
  return await base.post<IResponse<ISocialSignInResponse>>(
    `${routes.auth}/login`,
    body,
  );
};

export const useLogin = () => {
  const setToken = useAuthStore((state) => state.setToken);

  return useMutation({
    mutationFn: login,
    onSuccess({
      data: {
        result: {
          accessToken,
          refreshToken,
          accessTokenExpiresIn,
          refreshTokenExpiresIn,
          isNeedAdditionalUserInfo,
        },
      },
    }) {
      if (isNeedAdditionalUserInfo) {
        console.log('Additional info is needed');
        return;
      }

      setToken({
        accessToken,
        refreshToken,
        accessTokenExpiresIn,
        refreshTokenExpiresIn,
      });
    },
    onError(err) {
      if (err instanceof AxiosError) {
        console.log(err);
      }
    },
  });
};
