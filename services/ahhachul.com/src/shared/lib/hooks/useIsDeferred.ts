import { useState } from 'react';
import { useTimeout } from './useTimeout';

export const useIsDeferred = (ms?: number) => {
  const [isDeferred, setIsDeferred] = useState(false);

  useTimeout(() => setIsDeferred(true), ms ?? 500);

  return { isDeferred };
};
