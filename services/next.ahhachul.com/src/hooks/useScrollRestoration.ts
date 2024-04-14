import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

function saveScrollPos(url: string, scrollY: number) {
  sessionStorage.setItem(url, scrollY.toString());
}

function restoreScrollPos(url: string) {
  return sessionStorage.getItem(url);
}

export default function useScrollRestoration() {
  const router = useRouter();
  const isBack = useRef(false);

  useEffect(() => {
    router.beforePopState(() => {
      isBack.current = true;
      return true;
    });

    const onRouteChangeStart = () => {
      const url = router.asPath;
      saveScrollPos(url, window?.pageYOffset || 0);
    };

    const onRouteChangeComplete = (url: string) => {
      const scrollY = restoreScrollPos(url);
      if (isBack.current && scrollY) {
        window.scroll({
          top: +scrollY,
          behavior: 'auto',
        });
      }

      isBack.current = false;
    };

    router.events.on('routeChangeStart', onRouteChangeStart);
    router.events.on('routeChangeComplete', onRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', onRouteChangeStart);
      router.events.off('routeChangeComplete', onRouteChangeComplete);
    };
  }, [router]);
}
