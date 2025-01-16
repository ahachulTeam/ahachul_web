import ax from '@/apis/fetcher';
import type * as type from '@/types';

export const fetchRedirectUrl = async (providerType: type.SocialSignInType) => {
  const { data } = await ax.get<type.IResponse<type.APIRedirectUrlResponse>>('/auth/redirect-url', {
    params: {
      providerType,
    },
  });

  return data;
};
