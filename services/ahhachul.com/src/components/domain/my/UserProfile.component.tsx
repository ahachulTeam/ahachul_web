import styled from '@emotion/styled';

import { maskEmail } from '@ahhachul/utils';

import { ChevronIcon } from '@/assets/icons/system';
import { Avatar } from '@/components/common/avatar/Avatar.component';
import { useAuth } from '@/contexts';
import {
  useFetchUserArticleHistories,
  useFetchUserFavoriteStations,
  useFetchUserProfile,
} from '@/services/user';
import { useFlow } from '@/stackflow';

import { MY_DARK_COLORS } from './myDesignTokens';

const UserProfile = () => {
  const { push } = useFlow();
  const { isCheckingAuthState } = useAuth();
  const { data: profileResponse, isLoading: isProfileLoading } = useFetchUserProfile();
  const { data: stationResponse, isLoading: isStationLoading } = useFetchUserFavoriteStations();
  const { data: historyResponse, isLoading: isHistoryLoading } = useFetchUserArticleHistories(30);

  if (isCheckingAuthState || isProfileLoading || isStationLoading || isHistoryLoading) {
    return (
      <SkeletonCard>
        <SkeletonRow />
        <SkeletonGrid>
          <SkeletonCell />
          <SkeletonCell />
          <SkeletonCell />
        </SkeletonGrid>
      </SkeletonCard>
    );
  }

  const profile = profileResponse?.result;
  const stations = stationResponse?.result.stationInfoList ?? [];
  const likedArticles = historyResponse?.result.likedArticles ?? [];
  const bookmarkedArticles = historyResponse?.result.bookmarkedArticles ?? [];
  const favoriteCount = stations.length;
  const reactionCount = likedArticles.length + bookmarkedArticles.length;

  const visibilityScoreRaw = [
    profile?.profilePublic ?? true,
    profile?.emailPublic ?? false,
    profile?.genderAgePublic ?? false,
    profile?.postsPublic ?? true,
    profile?.commentsPublic ?? true,
  ].filter(Boolean).length;
  const visibilityScore = visibilityScoreRaw * 20;

  const primaryStation = stations[0]?.stationName ?? '즐겨찾기 역 미설정';

  return (
    <Card onClick={() => push('MyAccountPage', {})}>
      <TopRow>
        <UserInfo>
          <Avatar src={profile?.imageUrl} size={54} />
          <div data-clarity-mask="True">
            <p className="name">{profile?.nickname || '아하철'}</p>
            <p className="description">
              {primaryStation} · 출근 코치 ON · 프로필 공개 {visibilityScore}%
            </p>
            <p className="email">{maskEmail(profile?.maskedEmail ?? profile?.email)}</p>
          </div>
        </UserInfo>
        <ChevronIcon />
      </TopRow>

      <Metrics>
        <MetricCell>
          <span>좋아요/북마크</span>
          <b>{reactionCount}</b>
        </MetricCell>
        <MetricCell>
          <span>즐겨찾기 역</span>
          <b>{favoriteCount}</b>
        </MetricCell>
        <MetricCell>
          <span>공개 점수</span>
          <b>{visibilityScore}</b>
        </MetricCell>
      </Metrics>
    </Card>
  );
};

const Card = styled.button`
  width: 100%;
  border: 1px solid ${MY_DARK_COLORS.whiteLine};
  border-radius: 20px;
  background: ${MY_DARK_COLORS.profileGradient};
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: ${MY_DARK_COLORS.panelShadow};
  text-align: left;
  margin-top: 16px;

  & > svg {
    transform: rotate(270deg);
    color: ${MY_DARK_COLORS.body};
    opacity: 0.8;
  }
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;

  p.name {
    font-size: 22px;
    line-height: 1.2;
    font-weight: 800;
    color: ${MY_DARK_COLORS.title};
  }

  p.description {
    margin-top: 3px;
    font-size: 12px;
    color: ${MY_DARK_COLORS.body};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 220px;
  }

  p.email {
    margin-top: 2px;
    font-size: 11px;
    color: ${MY_DARK_COLORS.subtle};
    opacity: 0.9;
  }
`;

const Metrics = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
`;

const MetricCell = styled.div`
  border-radius: 10px;
  border: 1px solid ${MY_DARK_COLORS.whiteLine};
  background: ${MY_DARK_COLORS.actionBg};
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 3px;

  span {
    font-size: 11px;
    color: ${MY_DARK_COLORS.subtle};
  }

  b {
    font-size: 15px;
    color: ${MY_DARK_COLORS.title};
    font-weight: 700;
    line-height: 1;
  }
`;

const SkeletonCard = styled.div`
  width: 100%;
  border-radius: 20px;
  border: 1px solid ${MY_DARK_COLORS.sectionCardBorder};
  background: ${MY_DARK_COLORS.sectionCardBg};
  padding: 15px;
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SkeletonRow = styled.div`
  height: 54px;
  border-radius: 12px;
  background: ${MY_DARK_COLORS.actionBg};
`;

const SkeletonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
`;

const SkeletonCell = styled.div`
  height: 52px;
  border-radius: 10px;
  background: ${MY_DARK_COLORS.actionBg};
`;

export default UserProfile;
