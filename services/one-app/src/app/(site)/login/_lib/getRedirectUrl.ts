import { API_BASE } from '@/common/configure-axios';
import { IResponse } from '@/common/constants/api';
import { type APIRedirectUrlResponse, SocialSignInType } from '@/model/Auth';

export async function getRedirectUrl(params: SocialSignInType) {
  try {
    const response = await API_BASE.get<IResponse<APIRedirectUrlResponse>>(
      `/auth/redirect-url?providerType=${params}`,
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
}
