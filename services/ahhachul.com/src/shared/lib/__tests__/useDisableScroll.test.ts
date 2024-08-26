import { renderHook } from '@testing-library/react-hooks';
import { describe, expect, test } from 'vitest';

import useDisableScroll from '../hooks/useDisableScroll';

describe('hooks/common/useScrollLock', () => {
  test('정의되어 있는가', () => {
    expect(useDisableScroll).toBeDefined();
  });

  test('useDisableScroll이 호출되면 스크롤이 잠긴다', () => {
    const { unmount } = renderHook(useDisableScroll);

    expect(document.body.style.overflowY).toBe('hidden');

    unmount();

    expect(document.body.style.overflowY).not.toBe('hidden');
  });
});
