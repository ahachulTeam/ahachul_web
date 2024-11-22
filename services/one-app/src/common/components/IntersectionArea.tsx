'use client';

import type { PropsWithChildren } from 'react';
import type { IntersectionOptions } from 'react-intersection-observer';

import { useIntersectionObserver } from '@/common/hooks/useIntersectionObserver';

interface Props {
  callback: () => void;
  when: boolean;
  intersectionOptions?: IntersectionOptions;
}

function IntersectionArea({
  children,
  callback,
  when,
  intersectionOptions,
}: PropsWithChildren<Props>) {
  const { ref } = useIntersectionObserver({
    callback,
    intersectionOptions,
  });

  return when ? (
    <div ref={ref} className="flex justify-center w-full">
      {children}
    </div>
  ) : null;
}

export default IntersectionArea;
