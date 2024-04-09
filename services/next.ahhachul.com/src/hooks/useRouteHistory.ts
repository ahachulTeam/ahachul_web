import { useRouter } from 'next/router';
import { useEffect } from 'react';

// 페이지 이동이 완료된 후에 이전 경로를 저장하고 현재 경로를 sessionStorage에 업데이트합니다.
const useRouteHistory = () => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteStart = () => {};
    const handleRouteDone = () => {
      const prevPath = window.sessionStorage.getItem('currentPath');
      if (prevPath) {
        window.sessionStorage.setItem('prevPath', prevPath);
      }

      const currentPath = window.location.href;
      window.sessionStorage.setItem('currentPath', currentPath);
    };

    router.events.on('routeChangeStart', handleRouteStart);
    router.events.on('routeChangeComplete', handleRouteDone);
    router.events.on('routeChangeError', handleRouteDone);

    return () => {
      router.events.off('routeChangeStart', handleRouteStart);
      router.events.off('routeChangeComplete', handleRouteDone);
      router.events.off('routeChangeError', handleRouteDone);
    };
  }, [router.events]);
};

export default useRouteHistory;
