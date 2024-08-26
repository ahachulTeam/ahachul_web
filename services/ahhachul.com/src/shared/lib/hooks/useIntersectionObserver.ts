import { useEffect } from 'react';
import { useInView, type IntersectionOptions } from 'react-intersection-observer';

interface UseIntersectionObserverProps {
  callback: VoidFunction;
  intersectionOptions?: IntersectionOptions;
}

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
