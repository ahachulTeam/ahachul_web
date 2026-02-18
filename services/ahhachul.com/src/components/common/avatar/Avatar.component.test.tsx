import type { SVGProps } from 'react';

import { describe, expect, it, vi } from 'vitest';

import { render, screen } from '@/lib/test-utils';

import { Avatar } from './Avatar.component';

vi.mock('@/assets/images/default_thumbnail.svg', () => ({
  ReactComponent: (props: SVGProps<SVGSVGElement>) => (
    <svg data-testid="default-thumbnail" {...props} />
  ),
}));

describe('Avatar', () => {
  it('src가 없으면 기본 썸네일 아이콘을 렌더링한다', () => {
    render(<Avatar />);

    expect(screen.getByTestId('default-thumbnail')).toBeInTheDocument();
  });

  it('src가 있으면 이미지 태그를 렌더링한다', () => {
    const { container } = render(<Avatar src="/images/avatar.png" />);
    const image = container.querySelector('img');

    expect(image).toBeInTheDocument();
    expect(image?.getAttribute('src')).toContain('/images/avatar.png');
  });
});
