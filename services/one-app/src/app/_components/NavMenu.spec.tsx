import type { ReactNode } from 'react';
import type { SVGProps } from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

const mockUsePathname = jest.fn();
const mockPush = jest.fn();

jest.mock('next/navigation', () => ({
  usePathname: () => mockUsePathname(),
  useRouter: () => ({
    push: mockPush,
  }),
}));

jest.mock('@ahhachul/ui', () => ({
  BottomNav: ({ children }: { children: ReactNode }) => (
    <nav data-testid="bottom-nav">{children}</nav>
  ),
  BottomNavItem: ({
    onClick,
    isActive,
    label,
  }: {
    onClick: () => void;
    isActive: boolean;
    label: string;
  }) => (
    <button
      data-testid="bottom-nav-item"
      data-active={isActive ? 'true' : 'false'}
      onClick={onClick}
    >
      {label}
    </button>
  ),
}));

jest.mock(
  '@/assets/icon',
  () => {
    const Icon = (props: SVGProps<SVGSVGElement>) => <svg data-testid="nav-icon" {...props} />;

    return {
      HomeNavIcon: Icon,
      HomeNavActiveIcon: Icon,
      CommunityNavIcon: Icon,
      CommunityNavActiveIcon: Icon,
      LostFoundNavIcon: Icon,
      LostFoundNavActiveIcon: Icon,
      ComplaintNavIcon: Icon,
      ComplaintNavActiveIcon: Icon,
      ProfileNavIcon: Icon,
      ProfileNavActiveIcon: Icon,
    };
  },
  { virtual: true },
);

describe('NavMenu', () => {
  beforeEach(() => {
    mockUsePathname.mockReset();
    mockPush.mockReset();
  });

  it('루트 네비 경로에서는 하단 메뉴를 렌더링한다', async () => {
    const { default: NavMenu } = await import('./NavMenu');

    mockUsePathname.mockReturnValue('/community');

    render(<NavMenu />);

    const items = screen.getAllByTestId('bottom-nav-item');
    const activeItem = items.find(item => item.getAttribute('data-active') === 'true');

    expect(screen.getByTestId('bottom-nav')).toBeInTheDocument();
    expect(items).toHaveLength(5);

    expect(activeItem).toBeDefined();
    if (activeItem) {
      fireEvent.click(activeItem);
    }
    expect(mockPush).toHaveBeenCalledWith('/community');
  });

  it('locale prefix 경로에서도 현재 메뉴 활성화를 유지한다', async () => {
    const { default: NavMenu } = await import('./NavMenu');

    mockUsePathname.mockReturnValue('/en/me');

    render(<NavMenu />);

    const items = screen.getAllByTestId('bottom-nav-item');
    const activeItem = items.find(item => item.getAttribute('data-active') === 'true');

    expect(activeItem).toBeDefined();
    if (activeItem) {
      fireEvent.click(activeItem);
    }
    expect(mockPush).toHaveBeenCalledWith('/en/me');
  });

  it('루트 네비 대상이 아닌 경로에서는 메뉴를 렌더링하지 않는다', async () => {
    const { default: NavMenu } = await import('./NavMenu');

    mockUsePathname.mockReturnValue('/community/123');

    render(<NavMenu />);

    expect(screen.queryByTestId('bottom-nav')).not.toBeInTheDocument();
  });
});
