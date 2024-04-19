import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { UseIntersectionObserverProps } from 'types';

export const useIntersectionObserver = ({
  callback,
  intersectionOptions = { threshold: 0.3 },
}: UseIntersectionObserverProps) => {
  const { ref, inView } = useInView(intersectionOptions);

  useEffect(() => {
    if (inView) {
      callback();
    }
  }, [callback, inView]);

  return { ref, inView };
};
