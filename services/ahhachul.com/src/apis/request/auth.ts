import { API_PATHS } from '@ahhachul/http';

import axiosInstance from '@/apis/fetcher';
import type {
  ApiResponse,
  SocialSignInType,
  RedirectUrl,
  SignInRequestDto,
  SignInResponseDto,
} from '@/types';

export const fetchRedirectUrl = async (providerType: SocialSignInType) => {
  const { data } = await axiosInstance.get<ApiResponse<RedirectUrl>>(API_PATHS.auth.redirectUrl, {
    params: {
      providerType,
    },
  });

  return data;
};

export const login = async (req: SignInRequestDto) => {
  const { data } = await axiosInstance.post<ApiResponse<SignInResponseDto>>(
    API_PATHS.auth.login,
    req,
  );

  return data;
};

export const logout = () => axiosInstance.post(API_PATHS.auth.signOut);
