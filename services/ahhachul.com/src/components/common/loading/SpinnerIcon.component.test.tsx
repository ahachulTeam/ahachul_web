import type { SVGProps } from 'react';

import { describe, expect, it, vi } from 'vitest';

import { render, screen } from '@/lib/test-utils';

import SpinnerIcon from './SpinnerIcon.component';

vi.mock('@/assets/icons/system', () => ({
  SpinnerIcon: (props: SVGProps<SVGSVGElement>) => <svg data-testid="spinner-svg" {...props} />,
}));

describe('SpinnerIcon', () => {
  it('size를 width/height로 전달한다', () => {
    render(<SpinnerIcon size={24} className="spin" />);

    const icon = screen.getByTestId('spinner-svg');
    expect(icon).toHaveAttribute('width', '24');
    expect(icon).toHaveAttribute('height', '24');
    expect(icon).toHaveAttribute('class', expect.stringContaining('spin'));
  });

  it('size 미지정 시 기본값 14를 사용한다', () => {
    render(<SpinnerIcon />);

    const icon = screen.getByTestId('spinner-svg');
    expect(icon).toHaveAttribute('width', '14');
    expect(icon).toHaveAttribute('height', '14');
  });
});
