import { prefetchUserProfile } from './apis/request';
import { prefetchSubwayLines } from './apis/request/subway';
import { queryClient } from './contexts/tanstack-query';
import { subwayKeys } from './services/subway';
import { userKeys } from './services/user';
import { getAccessTokenInLocalStorage } from './utils/localStorage';

async function init() {
  await queryClient.prefetchQuery({
    queryKey: subwayKeys.subwayLine(),
    queryFn: prefetchSubwayLines,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const accessToken = getAccessTokenInLocalStorage();

  if (accessToken) {
    try {
      await queryClient.prefetchQuery({
        queryKey: userKeys.info(),
        queryFn: prefetchUserProfile,
        retry: false,
      });
    } catch (error) {
      console.log('Failed to prefetch user profile, continuing...');
    }
  }

  const { render } = await import('./render');

  render();
}

init();
