import { act } from 'react-dom/test-utils';

import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import useThrottle from './useThrottle';

describe('useThrottle', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  it('콜백 함수가 즉시 실행된다', () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useThrottle(callback, 500));

    act(() => {
      result.current();
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('딜레이 시간 내에 여러 번 호출해도 한 번만 실행된다', () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useThrottle(callback, 500));

    act(() => {
      result.current();
      result.current();
      result.current();
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('딜레이 시간이 지난 후에는 다시 실행된다', () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useThrottle(callback, 500));

    act(() => {
      result.current();
    });

    act(() => {
      vi.advanceTimersByTime(600);
      result.current();
    });

    expect(callback).toHaveBeenCalledTimes(2);
  });

  it('마지막 호출이 딜레이 후에 실행된다', () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useThrottle(callback, 500));

    act(() => {
      result.current();
      result.current(); // 이 호출은 타임아웃을 설정
    });

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(callback).toHaveBeenCalledTimes(2);
  });

  it('컴포넌트가 언마운트되면 타임아웃이 클리어된다', () => {
    const callback = vi.fn();
    const { result, unmount } = renderHook(() => useThrottle(callback, 500));

    act(() => {
      result.current();
      result.current(); // 타임아웃 설정
    });

    act(() => {
      unmount();
    });

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('콜백이 변경되면 새로운 콜백으로 쓰로틀링이 적용된다', () => {
    const callback1 = vi.fn();
    const callback2 = vi.fn();

    const { result, rerender } = renderHook(({ cb }) => useThrottle(cb, 500), {
      initialProps: { cb: callback1 },
    });

    act(() => {
      result.current();
    });

    act(() => {
      rerender({ cb: callback2 });
      vi.advanceTimersByTime(500); // 이전 타임아웃이 있다면 완료되도록
    });

    act(() => {
      result.current(); // 새로운 콜백 호출
    });

    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback2).toHaveBeenCalledTimes(1);
  });
});
