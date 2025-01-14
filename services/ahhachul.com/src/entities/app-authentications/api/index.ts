import { AxiosError } from 'axios';
import type { ISocialSignInType, IToken } from 'entities/app-authentications/model';
import { useAuthStore } from 'entities/app-authentications/slice';
import type { IResponse } from 'entities/with-server';
import queryString from 'query-string';
import { base, routes, useMutation, useQueries } from 'shared/api';

interface APIRedirectUrlParams {
  providerType: ISocialSignInType;
}

interface APIRedirectUrlResponse {
  redirectUrl: string;
}

export const getRedirectUrl = (params: APIRedirectUrlParams) =>
  base.get<IResponse<APIRedirectUrlResponse>>(
    `${routes.auth}/redirect-url?${queryString.stringify(params)}`,
  );

export const useGetSignInRedirectUrl = () =>
  useQueries({
    queries: [
      {
        staleTime: Infinity,
        queryKey: ['getRedirectUrl', 'KAKAO'],
        queryFn: () => getRedirectUrl({ providerType: 'KAKAO' }),
      },
      {
        staleTime: Infinity,
        queryKey: ['getRedirectUrl', 'GOOGLE'],
        queryFn: () => getRedirectUrl({ providerType: 'GOOGLE' }),
      },
    ],
  });

interface APISocialSignInParams {
  providerCode: string;
  providerType: ISocialSignInType;
}

interface APISocialSignInResponse extends IToken {
  memberId: number;
  isNeedAdditionalUserInfo: boolean;
}

export const requestLogin = (body: APISocialSignInParams) =>
  base.post<IResponse<APISocialSignInResponse>>(`${routes.auth}/login`, body);

export const useLogin = () => {
  const setToken = useAuthStore(state => state.setToken);

  return useMutation({
    mutationFn: requestLogin,
    onSuccess({
      data: {
        result: { accessToken, refreshToken, isNeedAdditionalUserInfo },
      },
    }) {
      if (isNeedAdditionalUserInfo) {
        console.log('Additional info is needed');
        return;
      }

      setToken({
        accessToken,
        refreshToken,
      });
    },
    onError(err) {
      if (err instanceof AxiosError) {
        console.log(err);
      }
    },
  });
};

interface APIRefreshTokenParams {
  refreshToken: IToken['refreshToken'];
}

const refreshToken = (body: APIRefreshTokenParams) => base.post(`${routes.auth}/tokens`, body);

export const useRefreshToken = () => {
  const setToken = useAuthStore(state => state.setToken);

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
