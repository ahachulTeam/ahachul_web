import {
  type MutableRefObject,
  useEffect,
  useCallback,
  useRef,
  useState,
} from 'react';

type ScrollDirection = 'up' | 'down' | 'none';
export type ScrollCondition = 'upState' | 'downState';

interface ScrollState {
  scrollPos: number;
  scrollDirection: ScrollDirection;
}

interface ScrollTrackerResult {
  condition: ScrollCondition;
  metrics: ScrollState;
}

export const useScrollTracker = (
  elementRef: MutableRefObject<HTMLElement | null>,
  threshold: number = 200,
  debounceMs: number = 0,
): ScrollTrackerResult => {
  const prevScrollPos = useRef(0);
  const [scrollPos, setScrollPos] = useState(0);
  const [scrollDirection, setScrollDirection] =
    useState<ScrollDirection>('none');
  const [condition, setCondition] = useState<ScrollCondition>('upState');

  const handleScroll = useCallback(() => {
    const currentPosition = elementRef.current?.scrollTop ?? 0;
    setScrollPos(currentPosition);

    if (currentPosition > prevScrollPos.current) {
      setScrollDirection('down');
    } else if (currentPosition < prevScrollPos.current) {
      setScrollDirection('up');
    } else {
      setScrollDirection('none');
    }

    if (
      currentPosition > threshold &&
      currentPosition > prevScrollPos.current
    ) {
      setCondition('downState');
    } else if (currentPosition < prevScrollPos.current) {
      setCondition('upState');
    }

    prevScrollPos.current = currentPosition;
  }, [elementRef, threshold]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    let timeoutId: NodeJS.Timeout | null = null;
    const debouncedHandleScroll = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, debounceMs);
    };

    const scrollHandler = debounceMs > 0 ? debouncedHandleScroll : handleScroll;
    element.addEventListener('scroll', scrollHandler, { passive: true });

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      element.removeEventListener('scroll', scrollHandler);
    };
  }, [elementRef, handleScroll, debounceMs]);

  return {
    condition,
    metrics: {
      scrollPos,
      scrollDirection,
    },
  };
};
