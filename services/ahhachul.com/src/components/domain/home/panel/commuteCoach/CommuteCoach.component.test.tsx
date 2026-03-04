import type { ReactNode } from 'react';

import { describe, expect, it, vi, beforeEach } from 'vitest';

import { render, screen } from '@/lib/test-utils';

import CommuteCoach from './CommuteCoach.component';

const mockUseAuth = vi.fn();
const mockUseFetchUserCommuteCoachToday = vi.fn();
const mockUseUserStationStore = vi.fn();

vi.mock('@/contexts', () => ({
  useAuth: () => mockUseAuth(),
}));

vi.mock('@/services/user', () => ({
  useFetchUserCommuteCoachToday: () => mockUseFetchUserCommuteCoachToday(),
}));

vi.mock('@/stores/subway', () => ({
  useUserStationStore: (selector: (state: { userStations: unknown[] }) => unknown) =>
    selector(mockUseUserStationStore()),
}));

vi.mock('@/stackflow', () => ({
  StackFlow: {
    Link: ({ children }: { children: ReactNode }) => <a>{children}</a>,
  },
}));

describe('CommuteCoach', () => {
  beforeEach(() => {
    mockUseAuth.mockReturnValue({
      isCheckingAuthState: false,
      authService: { isAuthenticated: true },
    });
    mockUseUserStationStore.mockReturnValue({
      userStations: [],
    });
    mockUseFetchUserCommuteCoachToday.mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
      error: null,
      errorUpdatedAt: 0,
      refetch: vi.fn(),
    });
  });

  it('auth-checking 상태에서 섹션을 유지한다', () => {
    mockUseAuth.mockReturnValue({
      isCheckingAuthState: true,
      authService: { isAuthenticated: false },
    });

    const { container } = render(<CommuteCoach />);

    expect(screen.getByText('출근 코치')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: '로그인하고 코치 보기' })).not.toBeInTheDocument();
    expect(container.querySelectorAll('span').length).toBeGreaterThanOrEqual(2);
  });

  it('비로그인 상태에서 로그인 CTA를 렌더링한다', () => {
    mockUseAuth.mockReturnValue({
      isCheckingAuthState: false,
      authService: { isAuthenticated: false },
    });

    render(<CommuteCoach />);

    expect(
      screen.getByText('로그인 후 맞춤 출근 코치 안내를 확인할 수 있어요.'),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '로그인하고 코치 보기' })).toBeInTheDocument();
  });

  it('즐겨찾는 역이 없으면 명시적 fallback 문구를 렌더링한다', () => {
    render(<CommuteCoach />);

    expect(
      screen.getByText('추천 경로 없음. 즐겨찾는 역을 추가하면 맞춤 안내를 제공해요.'),
    ).toBeInTheDocument();
  });
});
