import { useQueryClient } from '@tanstack/react-query';

import { userKeys } from '@/services/user';
import { ApiResponse, UserProfileResponseDto } from '@/types';

const useUser = () => {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<ApiResponse<UserProfileResponseDto>>(userKeys.all);

  return { user: data?.result ?? null };
};

export default useUser;
