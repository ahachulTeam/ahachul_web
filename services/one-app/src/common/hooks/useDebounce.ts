import { useRef, useEffect, useCallback } from 'react';

export function useDebounce<T extends any[]>(
  callback: (...params: T) => void,
  delay: number,
) {
  const callbackRef = useRef(callback);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 콜백 함수가 변경될 때마다 ref를 업데이트
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    // 컴포넌트 언마운트 시 타이머 정리
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  // delay가 변경되지 않는 함 동일한 함수 인스턴스 반환
  return useCallback(
    (...params: T) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        callbackRef.current(...params);
        timerRef.current = null;
      }, delay);
    },
    [delay],
  );
}
