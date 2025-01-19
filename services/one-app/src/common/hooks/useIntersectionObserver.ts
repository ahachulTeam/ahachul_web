'use client';

import { useEffect } from 'react';
<<<<<<< HEAD
import { useInView, type IntersectionOptions } from 'react-intersection-observer';
=======
import {
  useInView,
  type IntersectionOptions,
} from 'react-intersection-observer';
>>>>>>> main

interface Props {
  callback: () => void;
  intersectionOptions?: IntersectionOptions;
}

export function useIntersectionObserver({
  callback,
  intersectionOptions = { threshold: 0.3 },
}: Props) {
  const { ref, inView } = useInView(intersectionOptions);

  useEffect(() => {
    if (inView) {
      callback();
    }
  }, [callback, inView]);

  return { ref, inView };
}
