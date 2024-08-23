import { useEffect } from 'react';
import { initMocking, isMocking } from 'shared/lib/server';

const MSWInitializer = () => {
  useEffect(() => {
    if (isMocking()) {
      (async () => {
        await initMocking();
      })();
    }
  }, []);

  return null;
};

export default MSWInitializer;
