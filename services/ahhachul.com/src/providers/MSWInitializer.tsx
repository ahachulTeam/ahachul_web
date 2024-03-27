import { useEffect } from 'react';
import { initMocking } from '../mocks';
import { isMocking } from '../mocks/constants';

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
