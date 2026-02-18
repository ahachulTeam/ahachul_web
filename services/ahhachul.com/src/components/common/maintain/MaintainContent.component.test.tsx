import type { SVGProps } from 'react';

import { beforeEach, describe, expect, it, vi } from 'vitest';

import { render, screen, userEvent } from '@/lib/test-utils';

import MaintainContent from './MaintainContent.component';

const flowMocks = vi.hoisted(() => ({
  pop: vi.fn(),
}));

vi.mock('@/stackflow', () => ({
  useFlow: () => ({ pop: flowMocks.pop }),
}));

vi.mock('@/assets/icons/system', () => ({
  MaintainStatusIcon: (props: SVGProps<SVGSVGElement>) => (
    <svg data-testid="maintain-status-icon" {...props} />
  ),
}));

describe('MaintainContent', () => {
  beforeEach(() => {
    flowMocks.pop.mockReset();
  });

  it('기본 안내 문구를 렌더링한다', () => {
    render(<MaintainContent />);

    expect(screen.getByTestId('maintain-status-icon')).toBeInTheDocument();
    expect(screen.getByText('기능 준비 중입니다')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '홈으로' })).toBeInTheDocument();
  });

  it('버튼 클릭 시 flow.pop을 호출한다', async () => {
    render(<MaintainContent actionLabel="뒤로가기" />);

    await userEvent.click(screen.getByRole('button', { name: '뒤로가기' }));

    expect(flowMocks.pop).toHaveBeenCalledTimes(1);
  });
});
