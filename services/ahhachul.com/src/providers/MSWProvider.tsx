import { PropsWithChildren, useEffect, useState } from 'react';
import { initMocking } from '../mocks';
import { isMocking } from '../mocks/constants';

const MSWProvider = ({ children }: PropsWithChildren) => {
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

export default MSWProvider;
