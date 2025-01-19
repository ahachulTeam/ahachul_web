import { useQuery } from '@tanstack/react-query';

import * as api from '@/apis/request';
import { useAuth } from '@/contexts';

export const userKeys = {
  all: ['user'] as const,
};

export const useFetchUserProfile = () => {
  const { authService } = useAuth();

  return useQuery({
    queryKey: userKeys.all,
    enabled: authService.isAuthenticated,
    queryFn: api.fetchUserProfile,
  });
};
