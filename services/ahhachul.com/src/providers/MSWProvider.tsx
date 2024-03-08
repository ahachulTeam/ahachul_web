import { useEffect, useState } from 'react';
import { initMocking } from '../mocks';
import { isMocking } from '../mocks/constants';

export const MSWProvider = ({ children }: { children: React.ReactNode }) => {
  const [isReady, setIsReady] = useState(!isMocking());

  useEffect(() => {
    if (!isReady) {
      (async () => {
        await initMocking();

        setIsReady(true);
      })();
    }
  }, [isReady]);

  if (!isReady) return null;

  return children;
};
