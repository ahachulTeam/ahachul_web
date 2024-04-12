import { IRefreshTokenParams, IResponse, ISocialSignInParams, ISocialSignInResponse, IToken } from '@/src/types';
import { API_BASE_URL } from '@/src/data/api';
import { base } from '..';

export const getAuthURL = `${API_BASE_URL}/auth`;

const login = async (body: ISocialSignInParams) => {
  const url = `${getAuthURL}/login`;

  return await base.post<IResponse<ISocialSignInResponse>>(url, body);
};

const refreshToken = (body: IRefreshTokenParams) => base.post<IResponse<IToken>>(`${getAuthURL}/tokens`, body);

export { login, refreshToken };
