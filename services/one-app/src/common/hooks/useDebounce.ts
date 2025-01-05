<<<<<<< HEAD
'use client';

=======
>>>>>>> main
import { useRef, useEffect, useCallback } from 'react';

/**
 * useDebounce 훅은 주어진 콜백 함수를 지정된 지연 시간 동안 지연시킵니다.
 * 주로 입력 필드와 같은 사용자 인터페이스에서 사용되어,
 * 사용자가 입력을 멈춘 후에만 콜백이 실행되도록 합니다.
 *
 * @param callback - 지연시킬 콜백 함수
 * @param delay - 콜백 함수가 실행되기 전의 지연 시간 (밀리초)
 * @returns 지연된 콜백 함수
 */

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
