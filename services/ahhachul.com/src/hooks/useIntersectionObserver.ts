import { useEffect } from 'react';
import { useInView, type IntersectionOptions } from 'react-intersection-observer';

interface Props {
  callback: () => void;
  intersectionOptions?: IntersectionOptions;
}

function useIntersectionObserver({ callback, intersectionOptions = { threshold: 0.3 } }: Props) {
  const { ref, inView } = useInView(intersectionOptions);

  useEffect(() => {
    if (inView) {
      callback();
    }
  }, [callback, inView]);

  return { ref, inView };
}

export default useIntersectionObserver;
