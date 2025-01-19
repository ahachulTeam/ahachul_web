import axios from 'axios';

import type { ApiResponse, AuthTokens } from '@/types';

import { BASE_URL } from '../baseUrl';

export const renewAccessToken = async (refreshToken: string) => {
  const { data } = await axios.get<ApiResponse<AuthTokens>>(`${BASE_URL.SERVER}/auth/tokens`, {
    params: {
      refreshToken,
    },
  });

  return data;
};
