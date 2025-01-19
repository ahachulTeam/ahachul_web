import { useCallback, useEffect, useRef } from 'react';

const useThrottle = (callback: () => void, delay: number) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastRunRef = useRef<number>(0);
  const callbackRef = useRef(callback);

  // 콜백이 변경될 때마다 업데이트
  useEffect(() => {
    callbackRef.current = callback;
    lastRunRef.current = 0; // 콜백이 변경될 때 lastRun 초기화
  }, [callback]);

  // cleanup 함수
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      lastRunRef.current = 0;
    };
  }, []);

  return useCallback(() => {
    const now = Date.now();

    if (lastRunRef.current && now - lastRunRef.current < delay) {
      // 이전 타임아웃이 있다면 클리어
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // 새로운 타임아웃 설정
      timeoutRef.current = setTimeout(
        () => {
          lastRunRef.current = Date.now();
          callbackRef.current();
        },
        delay - (now - lastRunRef.current),
      );

      return;
    }

    lastRunRef.current = now;
    callbackRef.current();
  }, [delay]);
};

export default useThrottle;
