import '@ahhachul/design-system/tokens.css';
import { QUERY_GC_TIME, QUERY_STALE_TIME } from '@ahhachul/domain';

import { prefetchUserProfile, prefetchUserFavoriteStations } from './apis/request';
import { prefetchSubwayLines } from './apis/request/subway';
import { queryClient } from './contexts/tanstack-query';
import { subwayKeys } from './services/subway';
import { userKeys } from './services/user';
import { useUserStationStore } from './stores/subway';
import { getAccessTokenInLocalStorage } from './utils/localStorage';
import { appLogger, reportClientError } from './utils/observability';

async function init() {
  if (import.meta.env.MODE === 'mock') {
    const { startBrowserMocking } = await import('@/mocks');
    await startBrowserMocking();
  }

  // 지하철 역 & 호선 정보 prefetch
  await queryClient.prefetchQuery({
    queryKey: subwayKeys.subwayLine(),
    queryFn: prefetchSubwayLines,
    staleTime: QUERY_STALE_TIME.static,
    gcTime: QUERY_GC_TIME.static,
  });

  const accessToken = getAccessTokenInLocalStorage();

  if (accessToken) {
    // 유저 정보 prefetch
    try {
      await queryClient.prefetchQuery({
        queryKey: userKeys.info(),
        queryFn: prefetchUserProfile,
        retry: false,
        staleTime: QUERY_STALE_TIME.user,
        gcTime: QUERY_GC_TIME.user,
      });
    } catch (error) {
      reportClientError(
        'app-bootstrap:prefetch-user-profile',
        error,
        undefined,
        '사용자 정보를 불러오지 못했습니다.',
      );
    }

    // 유저 즐겨찾는 역 정보 prefetch
    try {
      const userStations = await queryClient.fetchQuery({
        queryKey: userKeys.stations(),
        queryFn: prefetchUserFavoriteStations,
        retry: false,
        staleTime: QUERY_STALE_TIME.user,
        gcTime: QUERY_GC_TIME.user,
      });

      if (userStations.result.stationInfoList.length > 0) {
        useUserStationStore.setState({
          userStations: userStations.result.stationInfoList,
        });
      }
    } catch (error) {
      reportClientError(
        'app-bootstrap:prefetch-user-stations',
        error,
        undefined,
        '즐겨찾는 역 정보를 불러오지 못했습니다.',
      );
    }
  }

  const { render } = await import('./render');

  render();
}

void init().catch(async error => {
  reportClientError('app-bootstrap:init', error, undefined, '앱 초기화 중 오류가 발생했습니다.');
  appLogger.warn('[app-bootstrap] fallback render without prefetch');

  const { render } = await import('./render');
  render();
});
