import axios from 'axios';

import type { ApiResponse, AuthTokens } from '@/types';

import { BASE_URL } from '../baseUrl';
import { API_PREFIX } from '../endpointPrefix';

export const renewAccessToken = async (refreshToken: string) => {
<<<<<<< HEAD
  const { data } = await axios.post<ApiResponse<AuthTokens>>(
    `${BASE_URL.SERVER}${API_PREFIX}/auth/token/refresh`,
    {
      refreshToken,
=======
  const { data } = await axios.get<ApiResponse<AuthTokens>>(
    `${BASE_URL.SERVER}${API_PREFIX}/auth/token/refresh`,
    {
      params: {
        refreshToken,
      },
>>>>>>> main
    },
  );

  return data;
};
