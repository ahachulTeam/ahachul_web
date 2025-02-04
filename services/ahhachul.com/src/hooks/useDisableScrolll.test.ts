import { renderHook } from '@testing-library/react';
import { describe, expect, test, beforeEach } from 'vitest';

import useDisableScroll from './useDisableScroll';

describe('useDisableScroll', () => {
  beforeEach(() => {
    document.body.style.overflowY = '';
  });

  test('hook이 정의되어 있어야 한다', () => {
    expect(useDisableScroll).toBeDefined();
  });

  test('초기 overflow-y 값이 비어있어야 한다', () => {
    expect(document.body.style.overflowY).toBe('');
  });

  test('마운트되면 overflow-y가 hidden으로 설정되어야 한다', () => {
    renderHook(() => useDisableScroll());
    expect(document.body.style.overflowY).toBe('hidden');
  });

  test('언마운트되면 overflow-y가 scroll로 초기화되어야 한다', () => {
    const { unmount } = renderHook(() => useDisableScroll());
    expect(document.body.style.overflowY).toBe('hidden');

    unmount();
    expect(document.body.style.overflowY).toBe('scroll');
  });
});
