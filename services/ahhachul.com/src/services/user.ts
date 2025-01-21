import { useQuery } from '@tanstack/react-query';

import * as api from '@/apis/request';
import { useAuth } from '@/contexts';

export const userKeys = {
  all: ['user'] as const,
  infos: () => [...userKeys.all, 'infos'] as const,
  stations: () => [...userKeys.all, 'stations'] as const,
};

export const useFetchUserProfile = () => {
  const { authService } = useAuth();

  return useQuery({
    queryKey: userKeys.infos(),
    enabled: authService.isAuthenticated,
    queryFn: api.fetchUserProfile,
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
