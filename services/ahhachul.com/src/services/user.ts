import { useQuery } from '@tanstack/react-query';

import * as api from '@/apis/request';
import { useAuth } from '@/contexts';

export const userKeys = {
  all: ['user'] as const,
  info: () => [...userKeys.all, 'info'] as const,
  stations: () => [...userKeys.all, 'stations'] as const,
};

export const useFetchUserProfile = () => {
  const { authService } = useAuth();

  return useQuery({
    queryKey: userKeys.info(),
    enabled: authService.isAuthenticated,
    queryFn: api.fetchUserProfile,
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export const useFetchUserFavoriteStations = () => {
  const { authService } = useAuth();

  return useQuery({
    queryKey: userKeys.stations(),
    enabled: authService.isAuthenticated,
    queryFn: api.fetchUserFavoriteStations,
  });
};
