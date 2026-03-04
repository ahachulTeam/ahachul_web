import type { AnchorHTMLAttributes } from 'react';

import { beforeEach, describe, expect, it, vi } from 'vitest';

import { render, screen } from '@/lib/test-utils';
import type { UserStation } from '@/types';

import DailyVote from './DailyVote.component';

const mockUseAuth = vi.fn();
const mockUseUserStationStore = vi.fn();
const mockUseFetchDailyVoteToday = vi.fn();

vi.mock('@/contexts', () => ({
  useAuth: () => mockUseAuth(),
}));

vi.mock('@/stores/subway', () => ({
  useUserStationStore: (selector: (state: { userStations: UserStation[] }) => unknown) =>
    mockUseUserStationStore(selector),
}));

vi.mock('@/services/subway', () => ({
  useFetchDailyVoteToday: (params: { enabled?: boolean }) => mockUseFetchDailyVoteToday(params),
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

describe('DailyVote', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseFetchDailyVoteToday.mockReturnValue({
      data: {
        primaryPoll: null,
        secondaryPoll: null,
        stationDiary: null,
      },
      error: null,
      errorUpdatedAt: 0,
      isLoading: false,
      isError: false,
      refetch: vi.fn(),
    });
  });

  it('비로그인 상태에서는 로그인 CTA를 렌더링한다', () => {
    mockUseAuth.mockReturnValue({
      isCheckingAuthState: false,
      authService: { isAuthenticated: false },
    });
    mockUseUserStationStore.mockImplementation(
      (selector: (state: { userStations: UserStation[] }) => unknown) =>
        selector({ userStations: [] }),
    );

    render(<DailyVote />);

    expect(screen.getByRole('button', { name: '로그인하기' })).toBeInTheDocument();
  });

  it('로그인 상태에서 즐겨찾는 역이 없으면 설정 CTA를 렌더링한다', () => {
    mockUseAuth.mockReturnValue({
      isCheckingAuthState: false,
      authService: { isAuthenticated: true },
    });
    mockUseUserStationStore.mockImplementation(
      (selector: (state: { userStations: UserStation[] }) => unknown) =>
        selector({ userStations: [] }),
    );

    render(<DailyVote />);

    expect(screen.getByRole('button', { name: '즐겨찾는 역 설정' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: '투표하러 가기' })).not.toBeInTheDocument();
  });

  it('로그인 + 즐겨찾는 역 상태에서는 투표 허브 CTA를 유지한다', () => {
    mockUseAuth.mockReturnValue({
      isCheckingAuthState: false,
      authService: { isAuthenticated: true },
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

    render(<DailyVote />);

    expect(screen.getByRole('button', { name: '투표하러 가기' })).toBeInTheDocument();
    expect(screen.getByText('오늘 투표가 없습니다.')).toBeInTheDocument();

    const hubLink = screen
      .getAllByTestId('stackflow-link')
      .find(link => link.getAttribute('data-activity-name') === 'DailyVoteHubPage');

    expect(hubLink).toBeDefined();
    expect(hubLink).toHaveAttribute(
      'data-activity-params',
      JSON.stringify({
        stationId: 557,
        stationName: '강남',
        subwayLineId: 2,
        subwayLineName: '2호선',
      }),
    );
  });
});
