import type { AnchorHTMLAttributes } from 'react';

import { beforeEach, describe, expect, it, vi } from 'vitest';

import { render, screen } from '@/lib/test-utils';
import type { UserStation } from '@/types';

import ServiceHub from './ServiceHub.component';

const mockUseAuth = vi.fn();
const mockUseUserStationStore = vi.fn();

vi.mock('@/contexts', () => ({
  useAuth: () => mockUseAuth(),
}));

vi.mock('@/stores/subway', () => ({
  useUserStationStore: (selector: (state: { userStations: UserStation[] }) => unknown) =>
    mockUseUserStationStore(selector),
}));

vi.mock('@/stackflow', () => ({
  StackFlow: {
    Link: ({
      children,
      activityName,
      activityParams,
      ...props
    }: AnchorHTMLAttributes<HTMLAnchorElement> & {
      activityName: string;
      activityParams: Record<string, unknown>;
    }) => (
      <a
        data-testid="stackflow-link"
        data-activity-name={activityName}
        data-activity-params={JSON.stringify(activityParams)}
        {...props}
      >
        {children}
      </a>
    ),
  },
}));

describe('ServiceHub', () => {
  const selectedStation: UserStation = {
    label: '회사',
    stationId: 557,
    stationName: '강남',
    subwayLineInfoList: [{ subwayLineId: '2', subwayLineName: '2호선' }],
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('인증 확인 중에는 스켈레톤 허브를 렌더링한다', () => {
    mockUseAuth.mockReturnValue({
      isCheckingAuthState: true,
      authService: { isAuthenticated: false },
    });
    mockUseUserStationStore.mockImplementation(
      (selector: (state: { userStations: UserStation[] }) => unknown) =>
        selector({ userStations: [] }),
    );

    render(<ServiceHub />);

    expect(screen.getByText('기능 허브를 준비하는 중입니다.')).toBeInTheDocument();
    expect(screen.queryAllByTestId('stackflow-link')).toHaveLength(0);
  });

  it('비로그인 상태에서는 모든 보호 액션을 SignInPage로 연결한다', () => {
    mockUseAuth.mockReturnValue({
      isCheckingAuthState: false,
      authService: { isAuthenticated: false },
    });
    mockUseUserStationStore.mockImplementation(
      (selector: (state: { userStations: UserStation[] }) => unknown) =>
        selector({ userStations: [selectedStation] }),
    );

    render(<ServiceHub />);

    const links = screen.getAllByTestId('stackflow-link');
    expect(links).toHaveLength(6);
    links.forEach(link => {
      expect(link).toHaveAttribute('data-activity-name', 'SignInPage');
    });
  });

  it('로그인 + 즐겨찾기 역 상태에서 허브/포리너 CTA를 정상 라우팅한다', () => {
    mockUseAuth.mockReturnValue({
      isCheckingAuthState: false,
      authService: { isAuthenticated: true },
    });
    mockUseUserStationStore.mockImplementation(
      (selector: (state: { userStations: UserStation[] }) => unknown) =>
        selector({ userStations: [selectedStation] }),
    );

    render(<ServiceHub />);

    expect(screen.getByRole('button', { name: '외국인 역 소셜 허브' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '외국인 언어교환 허브' })).toBeInTheDocument();

    const links = screen.getAllByTestId('stackflow-link');
    expect(links.map(link => link.getAttribute('data-activity-name'))).toEqual([
      'DailyVoteHubPage',
      'CommunityPage',
      'LostFoundPage',
      'ComplaintPage',
      'ForeignerHotspotsPage',
      'ForeignerLanguageExchangePage',
    ]);
  });
});
