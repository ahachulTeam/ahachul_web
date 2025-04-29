import { useMutation, useQuery } from '@tanstack/react-query';

import * as api from '@/apis/request';
import { useAuth } from '@/contexts';
import { useUserStationStore } from '@/stores/subway';
import { ApiResponse, UserFavoriteStations } from '@/types';

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
    gcTime: 1000 * 60 * 60,
    staleTime: 1000 * 60 * 30,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
};

export const useFetchUserFavoriteStations = () => {
  const { authService } = useAuth();

  return useQuery({
    queryKey: userKeys.stations(),
    enabled: authService.isAuthenticated,
    queryFn: api.fetchUserFavoriteStations,
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export const useUserFavoriteStations = () => {
  const setUserStations = useUserStationStore(state => state.setUserStations);

  const afterSubmitSuccess = (res: ApiResponse<UserFavoriteStations>) => {
    setUserStations(res.result.stationInfoList);
  };

  const afterSubmitFailed = (error: Error) => {
    // 토스트 띄어주고 뒤로 가기
    console.log('error with toast:', error, '토스트 띄어주고 뒤로 가기');
    // window.alert('즐겨찾는 지하철역 설정을 서버에 보내는데 에러 발생');
  };

  return useMutation({
    mutationFn: api.createUserFavoriteStations,
    onError: afterSubmitFailed,
    onSuccess: afterSubmitSuccess,
  });
};
