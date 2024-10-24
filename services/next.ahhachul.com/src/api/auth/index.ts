import queryString from 'query-string';
import {
  IRefreshTokenParams,
  IResponse,
  ISocialSignInParams,
  ISocialSignInResponse,
  IToken,
} from '@/src/types';
import { API_BASE_URL } from '@/src/data/api';
import { base } from '..';

export const getAuthURL = `${API_BASE_URL}/auth`;

const getRedirectUrls = async (type: 'KAKAO' | 'GOOGLE') => {
  const queryParams = queryString.stringify({ providerType: type });
  const url = `${getAuthURL}/redirect-url?${queryParams}`;

  return await base.get<IResponse<{ redirectUrl: string }>>(url);
};

const login = async (body: ISocialSignInParams) => {
  const url = `${getAuthURL}/login`;

  return await base.post<IResponse<ISocialSignInResponse>>(url, body);
};

const refreshToken = async (body: IRefreshTokenParams) =>
  await base.post<IResponse<IToken>>(`${getAuthURL}/tokens`, body);

export { getRedirectUrls, login, refreshToken };
