import type { ReactNode } from 'react';

import { beforeEach, describe, expect, it, vi } from 'vitest';

import { render, screen } from '@/lib/test-utils';

import CommunityHotPosts from './CommunityHotPosts.component';

const mockUseAuth = vi.fn();
const mockUseFetchUserProfile = vi.fn();
const mockUseUserStationStore = vi.fn();

vi.mock('@/contexts', () => ({
  useAuth: () => mockUseAuth(),
}));

vi.mock('@/services/user', () => ({
  useFetchUserProfile: () => mockUseFetchUserProfile(),
}));

vi.mock('@/stores/subway', () => ({
  useUserStationStore: (selector: (state: { userStations: unknown[] }) => unknown) =>
    selector(mockUseUserStationStore()),
}));

vi.mock('@/apis/request', () => ({
  fetchCommunityList: vi.fn(),
}));

vi.mock('@/components', () => ({
  UiComponent: {
    ListItem: () => <div>post-item</div>,
  },
}));

vi.mock('@/stackflow', () => ({
  StackFlow: {
    Link: ({ children }: { children: ReactNode }) => <a>{children}</a>,
  },
}));

describe('CommunityHotPosts', () => {
  beforeEach(() => {
    mockUseAuth.mockReturnValue({
      isCheckingAuthState: false,
      authService: { isAuthenticated: true },
    });
    mockUseFetchUserProfile.mockReturnValue({
      isLoading: false,
    });
    mockUseUserStationStore.mockReturnValue({
      userStations: [],
    });
  });

  it('비로그인 상태에서 로그인 CTA를 렌더링한다', () => {
    mockUseAuth.mockReturnValue({
      isCheckingAuthState: false,
      authService: { isAuthenticated: false },
    });

    render(<CommunityHotPosts />);

    expect(screen.getByText('로그인 후 인기글을 빠르게 확인하세요')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '로그인하기' })).toBeInTheDocument();
  });

  it('즐겨찾는 역이 없으면 명시적 fallback 문구를 렌더링한다', () => {
    render(<CommunityHotPosts />);

    expect(
      screen.getByText('즐겨찾는 역을 설정하면 역/호선 인기글을 맞춤으로 보여드려요.'),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '즐겨찾는 역 설정' })).toBeInTheDocument();
  });
});
