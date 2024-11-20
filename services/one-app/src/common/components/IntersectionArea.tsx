'use client';

import type { PropsWithChildren } from 'react';
import type { IntersectionOptions } from 'react-intersection-observer';

import { useIntersectionObserver } from '@/common/hooks/useIntersectionObserver';

interface FetchNextPageOptions {
  callback: () => void;
  intersectionOptions?: IntersectionOptions;
}

function IntersectionArea({
  children,
  callback,
  intersectionOptions,
}: PropsWithChildren<FetchNextPageOptions>) {
  const { ref } = useIntersectionObserver({
    callback,
    intersectionOptions,
  });

  return (
    <div ref={ref} className="flex justify-center w-full">
      {children}
    </div>
  );
}

export default IntersectionArea;
