'use client';

import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useCurrentPath } from '@/common/hooks/useCurrentPath';

export const PathTracker = () => {
  const currentPath = useCurrentPath();

  useEffect(() => {
    const previousPath = Cookies.get('currentPath') || 'null';

    Cookies.set('currentPath', currentPath, { expires: 7 });
    Cookies.set('previousPath', previousPath, { expires: 7 });
  }, [currentPath]);

  return null;
};
