import type { ReactNode } from 'react';

import { describe, expect, it, vi } from 'vitest';

import { render, screen } from '@/lib/test-utils';

import HomePage from './page';

vi.mock('@/components', () => ({
  LayoutComponent: {
    Base: ({ children }: { children: ReactNode }) => (
      <div data-testid="layout-base">{children}</div>
    ),
  },
  HomeComponent: {
    HomeHeaderActions: () => <div data-testid="header-left" />,
    HomeHeaderRightActions: () => <div data-testid="header-right" />,
    WelcomeMessage: () => <section data-testid="panel-welcome">WelcomeMessage</section>,
    Stations: () => <section data-testid="panel-stations">Stations</section>,
    CommuteCoach: () => <section data-testid="panel-commute-coach">CommuteCoach</section>,
    ServiceHub: () => <section data-testid="panel-service-hub">ServiceHub</section>,
    DailyVote: () => <section data-testid="panel-daily-vote">DailyVote</section>,
    StoryFeed: () => <section data-testid="panel-story-feed">StoryFeed</section>,
    CommunityHotPosts: () => (
      <section data-testid="panel-community-hot-posts">CommunityHotPosts</section>
    ),
    ForeignerGuide: () => <section data-testid="panel-foreigner-guide">ForeignerGuide</section>,
    SubwayNews: () => <section data-testid="panel-subway-news">SubwayNews</section>,
    RankHashtag: () => <section data-testid="panel-rank-hashtag">RankHashtag</section>,
  },
}));

describe('HomePage', () => {
  it('Phase 1B 기준 7개 섹션을 목표 순서대로 렌더링한다', () => {
    render(<HomePage params={{}} />);

    const renderedPanels = screen
      .getAllByTestId(/^panel-/)
      .map(panel => panel.getAttribute('data-testid'));

    expect(renderedPanels).toEqual([
      'panel-welcome',
      'panel-stations',
      'panel-commute-coach',
      'panel-service-hub',
      'panel-daily-vote',
      'panel-story-feed',
      'panel-community-hot-posts',
    ]);
  });

  it('Phase 1B에서 제거된 홈 섹션은 렌더링하지 않는다', () => {
    render(<HomePage params={{}} />);

    expect(screen.queryByTestId('panel-foreigner-guide')).not.toBeInTheDocument();
    expect(screen.queryByTestId('panel-subway-news')).not.toBeInTheDocument();
    expect(screen.queryByTestId('panel-rank-hashtag')).not.toBeInTheDocument();
  });
});
