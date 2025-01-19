import { useEffect, useState } from 'react';

import { ScrollDirection } from '@/types';

const useScrollDirection = ({
  el,
  threshold = 50,
}: {
  el: React.RefObject<HTMLElement>;
  threshold?: number;
}) => {
  const [scrollDir, setScrollDir] = useState<ScrollDirection>(ScrollDirection.up);

  useEffect(() => {
    const element = el.current;
    if (!element) return;

    let previousScrollYPosition = element.scrollTop;

    const scrolledMoreThanThreshold = (currentScrollYPosition: number): boolean =>
      Math.abs(currentScrollYPosition - previousScrollYPosition) > threshold;

    const isScrollingUp = (currentScrollYPosition: number): boolean =>
      currentScrollYPosition > previousScrollYPosition &&
      !(previousScrollYPosition > 0 && currentScrollYPosition === 0) &&
      !(currentScrollYPosition > 0 && previousScrollYPosition === 0);

    const updateScrollDirection = () => {
      const currentScrollYPosition = element.scrollTop;

      if (scrolledMoreThanThreshold(currentScrollYPosition)) {
        const newScrollDirection = isScrollingUp(currentScrollYPosition)
          ? ScrollDirection.down
          : ScrollDirection.up;
        setScrollDir(newScrollDirection);
        previousScrollYPosition = currentScrollYPosition > 0 ? currentScrollYPosition : 0;
      }
    };

    const onScroll = () => window.requestAnimationFrame(updateScrollDirection);

    element.addEventListener('scroll', onScroll);

    return () => element.removeEventListener('scroll', onScroll);
  }, [el, threshold]);

  return scrollDir;
};

export default useScrollDirection;
