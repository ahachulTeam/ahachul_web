import queryString from 'query-string';
import { IRefreshTokenParams, IResponse, ISocialSignInParams, ISocialSignInResponse, IToken } from '@/src/types';
import { API_BASE_URL } from '@/src/data/api';
import { base } from '..';

export const getAuthURL = `${API_BASE_URL}/auth`;

const login = async (params: ISocialSignInParams) => {
  const queryParams = queryString.stringify(params);

  const url = `${getAuthURL}/logins?${queryParams}`;

  return await base.get<IResponse<ISocialSignInResponse>>(url);
};

const refreshToken = (body: IRefreshTokenParams) => base.post<IResponse<IToken>>(`${getAuthURL}/tokens`, body);

export { login, refreshToken };
