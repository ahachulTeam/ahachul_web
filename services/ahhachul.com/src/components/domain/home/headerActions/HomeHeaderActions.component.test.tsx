import type { HTMLAttributes, SVGProps } from 'react';

import { describe, expect, it, vi, beforeEach } from 'vitest';

import { render, screen, userEvent } from '@/lib/test-utils';
import type { UserStation } from '@/types';

import HomeHeaderActions from './HomeHeaderActions.component';

const mockUseAuth = vi.fn();
const mockUseNativeBridge = vi.fn();
const mockUseFlow = vi.fn();
const mockUseUserFavoriteStations = vi.fn();
const mockUseUserStationStore = vi.fn();

vi.mock('@/contexts', () => ({
  useAuth: () => mockUseAuth(),
  useNativeBridge: () => mockUseNativeBridge(),
}));

vi.mock('@/stackflow', () => ({
  useFlow: () => mockUseFlow(),
}));

vi.mock('@/services/user', () => ({
  useUserFavoriteStations: () => mockUseUserFavoriteStations(),
}));

vi.mock('@/stores/subway', () => ({
  useUserStationStore: (selector: (state: { userStations: UserStation[] }) => unknown) =>
    mockUseUserStationStore(selector),
}));

vi.mock('@/hooks/useOnClickOutside', () => ({
  default: vi.fn(),
}));

vi.mock('@/assets/icons/system', () => ({
  ChevronIcon: (props: SVGProps<SVGSVGElement>) => <svg data-testid="chevron-icon" {...props} />,
}));

vi.mock('motion/react', () => ({
  motion: {
    span: ({ children, ...props }: HTMLAttributes<HTMLSpanElement>) => (
      <span {...props}>{children}</span>
    ),
    div: ({ children, ...props }: HTMLAttributes<HTMLDivElement>) => (
      <div {...props}>{children}</div>
    ),
    ul: ({ children, ...props }: HTMLAttributes<HTMLUListElement>) => (
      <ul {...props}>{children}</ul>
    ),
  },
}));

describe('HomeHeaderActions', () => {
  const push = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseFlow.mockReturnValue({ push });
    mockUseUserFavoriteStations.mockReturnValue({ mutate: vi.fn() });
    mockUseNativeBridge.mockReturnValue({
      bridge: { send: { haptic: vi.fn() } },
      isBridgeInitialized: false,
    });
  });

  it('인증 확인 중에는 헤더 스켈레톤 버튼을 렌더링한다', () => {
    mockUseAuth.mockReturnValue({
      isCheckingAuthState: true,
      authService: { isAuthenticated: false },
    });
    mockUseUserStationStore.mockImplementation(
      (selector: (state: { userStations: UserStation[] }) => unknown) =>
        selector({ userStations: [] }),
    );

    render(<HomeHeaderActions />);

    expect(screen.getByLabelText('역 정보 로딩 중')).toBeInTheDocument();
  });

  it('비로그인 상태에서는 역 데이터가 있어도 역 설정 CTA를 우선 노출한다', async () => {
    mockUseAuth.mockReturnValue({
      isCheckingAuthState: false,
      authService: { isAuthenticated: false },
    });
    mockUseUserStationStore.mockImplementation(
      (selector: (state: { userStations: UserStation[] }) => unknown) =>
        selector({
          userStations: [
            {
              label: '회사',
              stationId: 557,
              stationName: '강남',
              subwayLineInfoList: [{ subwayLineId: '2', subwayLineName: '2호선' }],
            },
          ],
        }),
    );

    render(<HomeHeaderActions />);

    const fallbackButton = screen.getByRole('button', { name: '역 설정' });
    expect(fallbackButton).toBeInTheDocument();
    expect(screen.queryByText('강남')).not.toBeInTheDocument();

    await userEvent.click(fallbackButton);
    expect(push).toHaveBeenCalledWith('SettingPage', []);
  });
});
