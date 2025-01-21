import axios from 'axios';

import type { ApiResponse, AuthTokens } from '@/types';

import { BASE_URL } from '../baseUrl';
import { API_PREFIX } from '../endpointPrefix';

export const renewAccessToken = async (refreshToken: string) => {
  const { data } = await axios.post<ApiResponse<AuthTokens>>(
    `${BASE_URL.SERVER}${API_PREFIX}/auth/token/refresh`,
    {
      refreshToken,
    },
  );

  return data;
};
