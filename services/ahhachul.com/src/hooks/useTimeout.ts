import { useEffect, useRef } from 'react';
import { useIsomorphicLayoutEffect } from 'hooks';

const useTimeout = (fn: () => void, ms: number) => {
  const fnRef = useRef(fn);

  useIsomorphicLayoutEffect(() => {
    fnRef.current = fn;
  }, [fn]);

  useEffect(() => {
    const id = setTimeout(fnRef.current, ms);
    return () => clearTimeout(id);
  }, [ms]);
};

export default useTimeout;
