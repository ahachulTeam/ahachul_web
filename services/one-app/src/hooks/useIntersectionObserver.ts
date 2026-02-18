'use client';

import { useEffect } from 'react';
import { useInView, type IntersectionOptions } from 'react-intersection-observer';

interface Props {
  action: () => void;
  intersectionOptions?: IntersectionOptions;
}

export function useIntersectionObserver({
  action,
  intersectionOptions = { threshold: 0.3 },
}: Props) {
  const { ref, inView } = useInView(intersectionOptions);

  useEffect(() => {
    if (inView) {
      action();
    }
  }, [action, inView]);

  return { ref, inView };
}
