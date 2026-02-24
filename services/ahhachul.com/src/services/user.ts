import { useMutation, useQuery } from '@tanstack/react-query';

import { QUERY_GC_TIME, QUERY_STALE_TIME, userQueryKeys } from '@ahhachul/domain';

import * as api from '@/apis/request';
import { useAuth } from '@/contexts';
import { useUserStationStore } from '@/stores/subway';
import { ApiResponse, UserFavoriteStations } from '@/types';

export const userKeys = userQueryKeys;

export const useFetchUserProfile = () => {
  const { authService } = useAuth();

  return useQuery({
    queryKey: userKeys.info(),
    enabled: authService.isAuthenticated,
    queryFn: api.fetchUserProfile,
    gcTime: QUERY_GC_TIME.user,
    staleTime: QUERY_STALE_TIME.user,
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
    staleTime: QUERY_STALE_TIME.user,
    gcTime: QUERY_GC_TIME.user,
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

export const useFetchUserArticleHistories = (limit = 30) => {
  const { authService } = useAuth();

  return useQuery({
    queryKey: [...userKeys.all, 'article-histories', limit],
    enabled: authService.isAuthenticated,
    queryFn: () => api.fetchUserArticleHistories(limit),
    staleTime: QUERY_STALE_TIME.user,
    gcTime: QUERY_GC_TIME.user,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
