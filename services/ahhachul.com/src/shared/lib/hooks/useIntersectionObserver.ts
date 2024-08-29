import { useEffect } from 'react';
import {
  useInView,
  type IntersectionOptions,
} from 'react-intersection-observer';

interface Props {
  callback: VoidFunction;
  intersectionOptions?: IntersectionOptions;
}

export const useIntersectionObserver = ({
  callback,
  intersectionOptions = { threshold: 0.3 },
}: Props) => {
  const { ref, inView } = useInView(intersectionOptions);

  useEffect(() => {
    if (inView) {
      callback();
    }
  }, [callback, inView]);

  return { ref, inView };
};
