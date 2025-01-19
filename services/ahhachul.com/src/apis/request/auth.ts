import axiosInstance from '@/apis/fetcher';
import type {
  ApiResponse,
  SocialSignInType,
  RedirectUrl,
  SignInRequestDto,
  SignInResponseDto,
} from '@/types';

export const fetchRedirectUrl = async (providerType: SocialSignInType) => {
  const { data } = await axiosInstance.get<ApiResponse<RedirectUrl>>('/auth/redirect-url', {
    params: {
      providerType,
    },
  });

  return data;
};

export const login = async (req: SignInRequestDto) => {
  const { data } = await axiosInstance.post<ApiResponse<SignInResponseDto>>('/auth/login', req);

  return data;
};

export const logout = () => axiosInstance.post('/signout');
