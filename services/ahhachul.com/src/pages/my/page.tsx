import { useMemo, useState } from 'react';

import styled from '@emotion/styled';
import type { ActivityComponentType } from '@stackflow/react';

import { HeaderComponent, LayoutComponent } from '@/components';
import ArticleHistoryCard from '@/components/domain/my/ArticleHistoryCard.component';
import FavoriteRouteCard from '@/components/domain/my/FavoriteRouteCard.component';
import MenuSections from '@/components/domain/my/MenuSections.component';
import RequestCard from '@/components/domain/my/RequestCard.component';
import UserProfile from '@/components/domain/my/UserProfile.component';
import { MY_DARK_COLORS, MY_LAYOUT } from '@/components/domain/my/myDesignTokens';
import StoryStripCard from '@/components/domain/story/StoryStripCard.component';
import { useFetchSubwayLines } from '@/services/subway';
import {
  useFetchUserCommuteCoachToday,
  useFetchUserFavoriteStations,
  useFetchUserProfile,
} from '@/services/user';

type DashboardTab = 'overview' | 'mobility' | 'activity' | 'settings';

const tabLabels: Array<{ key: DashboardTab; label: string }> = [
  { key: 'overview', label: '요약' },
  { key: 'mobility', label: '동선' },
  { key: 'activity', label: '히스토리' },
  { key: 'settings', label: '설정' },
];

const MyPage: ActivityComponentType = () => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');

  useFetchSubwayLines();
  useFetchUserProfile();
  const { data: stationResponse } = useFetchUserFavoriteStations();
  const { data: commuteCoachResponse } = useFetchUserCommuteCoachToday({
    targetArrivalAt: '09:00',
    timezone: 'Asia/Seoul',
  });

  const primaryStationName = stationResponse?.result.stationInfoList?.[0]?.stationName ?? '강남역';
  const commuteCoach = commuteCoachResponse?.result;

  const statusMessage = useMemo(() => {
    if (!commuteCoach) {
      return '출근 코치 정보를 불러오는 중입니다.';
    }
    return commuteCoach.guidanceMessage;
  }, [commuteCoach]);

  const riskBadge = useMemo(() => {
    if (!commuteCoach) {
      return { label: '확인 중', variant: 'warn' as const };
    }
    if (commuteCoach.riskLevel === 'LOW') {
      return { label: '안전', variant: 'safe' as const };
    }
    if (commuteCoach.riskLevel === 'MEDIUM') {
      return { label: '혼잡 주의', variant: 'warn' as const };
    }
    return { label: '리스크 높음', variant: 'danger' as const };
  }, [commuteCoach]);

  return (
    <LayoutComponent.Base
      navigationSlot
      backgroundColor={MY_DARK_COLORS.appBackground}
      appBar={{
        renderLeft: HeaderComponent.HeaderBrand,
        renderRight: HeaderComponent.HeaderActions,
      }}
    >
      <S.Container>
        <S.Panel>
          <UserProfile />

          <TabContainer role="tablist" aria-label="마이페이지 섹션">
            {tabLabels.map(tab => (
              <TabButton
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.key}
                onClick={() => setActiveTab(tab.key)}
                $isActive={activeTab === tab.key}
              >
                {tab.label}
              </TabButton>
            ))}
          </TabContainer>

          {activeTab === 'overview' ? (
            <>
              <RequestCard
                onMoveMobility={() => setActiveTab('mobility')}
                onMoveActivity={() => setActiveTab('activity')}
                onMoveSettings={() => setActiveTab('settings')}
              />
              <StatusSection>
                <SectionHeader>
                  <h3>오늘의 상태</h3>
                </SectionHeader>
                <StatusCard>
                  <h4>{primaryStationName} 막차 리스크</h4>
                  <p>{statusMessage}</p>
                  <StatusBadge $variant={riskBadge.variant}>{riskBadge.label}</StatusBadge>
                </StatusCard>
                <StatusCard>
                  <h4>2호선 출근 체감 투표</h4>
                  <p>오늘 투표와 댓글에 참여해 다른 사용자와 체감 경험을 공유해보세요.</p>
                  <StatusBadge $variant="warn">참여 가능</StatusBadge>
                </StatusCard>
              </StatusSection>
            </>
          ) : null}

          {activeTab === 'mobility' ? <FavoriteRouteCard /> : null}

          {activeTab === 'activity' ? (
            <>
              <StoryStripCard
                editable
                title="내 스토리"
                description="사진 스토리를 올리고 내 프로필 활동으로 기록합니다."
              />
              <ArticleHistoryCard />
            </>
          ) : null}

          {activeTab === 'settings' ? <MenuSections /> : null}
        </S.Panel>
      </S.Container>
    </LayoutComponent.Base>
  );
};

const S = {
  Container: styled.div`
    width: 100%;
    min-height: 100%;
    display: flex;
    justify-content: center;
    padding: 0 12px 20px;
    background: radial-gradient(
      150% 120% at 50% 0%,
      rgba(64, 122, 214, 0.22) 0%,
      rgba(18, 18, 18, 0) 42%
    );
  `,
  Panel: styled.div`
    width: 100%;
    max-width: ${MY_LAYOUT.pageMaxWidth}px;
    border: 1px solid ${MY_DARK_COLORS.panelBorder};
    border-radius: ${MY_LAYOUT.panelRadius}px;
    background: ${MY_DARK_COLORS.panelGradient};
    box-shadow: ${MY_DARK_COLORS.panelShadow};
    padding: 16px;
    margin-top: 10px;
  `,
};

const TabContainer = styled.div`
  margin-top: 14px;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  border: 1px solid ${MY_DARK_COLORS.sectionCardBorder};
  border-radius: 999px;
  background: ${MY_DARK_COLORS.sectionCardBgSoft};
  overflow: hidden;
`;

const TabButton = styled.button<{ $isActive: boolean }>`
  height: 34px;
  font-size: 12px;
  font-weight: ${props => (props.$isActive ? 700 : 500)};
  color: ${props => (props.$isActive ? MY_DARK_COLORS.accent : MY_DARK_COLORS.muted)};
  background: transparent;
`;

const StatusSection = styled.section`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: ${MY_LAYOUT.sectionGap}px;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    font-size: 14px;
    font-weight: 800;
    color: ${MY_DARK_COLORS.title};
  }
`;

const StatusCard = styled.article`
  border: 1px solid ${MY_DARK_COLORS.sectionCardBorder};
  border-radius: 14px;
  background: ${MY_DARK_COLORS.sectionCardBg};
  padding: 12px;

  h4 {
    font-size: 13px;
    color: ${MY_DARK_COLORS.title};
    font-weight: 700;
  }

  p {
    margin-top: 4px;
    font-size: 12px;
    color: ${MY_DARK_COLORS.muted};
    line-height: 1.4;
  }
`;

const StatusBadge = styled.span<{ $variant: 'safe' | 'warn' | 'danger' }>`
  display: inline-flex;
  align-items: center;
  height: 23px;
  border-radius: 999px;
  padding: 0 9px;
  margin-top: 8px;
  font-size: 11px;
  border: 1px solid;
  color: ${props => {
    if (props.$variant === 'safe') {
      return MY_DARK_COLORS.chipAccent;
    }
    if (props.$variant === 'danger') {
      return MY_DARK_COLORS.danger;
    }
    return MY_DARK_COLORS.chipWarn;
  }};
  border-color: ${props => {
    if (props.$variant === 'safe') {
      return MY_DARK_COLORS.chipAccentBorder;
    }
    if (props.$variant === 'danger') {
      return MY_DARK_COLORS.dangerBorder;
    }
    return MY_DARK_COLORS.chipWarnBorder;
  }};
  background: ${props => {
    if (props.$variant === 'safe') {
      return MY_DARK_COLORS.chipAccentBg;
    }
    if (props.$variant === 'danger') {
      return MY_DARK_COLORS.dangerBg;
    }
    return MY_DARK_COLORS.chipWarnBg;
  }};
`;

export default MyPage;
