import { useState } from 'react';
import { useTimeout } from './useTimemout';

export const useIsDeferred = (ms?: number) => {
  const [isDeferred, setIsDeferred] = useState(false);

  useTimeout(() => setIsDeferred(true), ms ?? 1000);

  return { isDeferred };
};
