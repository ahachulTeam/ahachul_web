import { useAuth } from '@/contexts';
import { StackFlow } from '@/stackflow';
import { useUserStationStore } from '@/stores/subway';

import * as S from './ServiceHub.styled';

const ServiceHub = () => {
  const { authService, isCheckingAuthState } = useAuth();
  const { userStations } = useUserStationStore(state => state);
  const isAuthenticated = authService.isAuthenticated;
  const selectedStation = userStations[0];
  const selectedLine = selectedStation?.subwayLineInfoList?.[0];
  const selectedLineId = Number(selectedLine?.subwayLineId ?? 0);
  const hasFavoriteStation = selectedStation != null && selectedLineId > 0;

  let dailyVoteHubActivityName: 'DailyVoteHubPage' | 'SignInPage' | 'SettingPage';
  if (!isAuthenticated) {
    dailyVoteHubActivityName = 'SignInPage';
  } else if (hasFavoriteStation) {
    dailyVoteHubActivityName = 'DailyVoteHubPage';
  } else {
    dailyVoteHubActivityName = 'SettingPage';
  }

  let dailyVoteHubActivityParams: Record<string, string | number | undefined> = {};
  if (dailyVoteHubActivityName === 'DailyVoteHubPage') {
    dailyVoteHubActivityParams = {
      stationId: selectedStation.stationId,
      stationName: selectedStation.stationName,
      subwayLineId: selectedLineId,
      subwayLineName: selectedLine?.subwayLineName,
    };
  }

  if (isCheckingAuthState) {
    return (
      <S.Container>
        <b>핵심 기능 바로가기</b>
        <S.Description>기능 허브를 준비하는 중입니다.</S.Description>
        <S.Grid>
          {Array.from({ length: 4 }).map((_, index) => (
            <li key={`service-hub-skeleton-${index}`}>
              <S.SkeletonCard aria-hidden />
            </li>
          ))}
        </S.Grid>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <b>핵심 기능 바로가기</b>
      <S.Description>홈에서 요약 확인 후, 2~3단계 화면에서 상세 작업을 진행하세요.</S.Description>
      {!isAuthenticated ? (
        <S.HelperText>로그인하면 허브 진입 시 맞춤 화면으로 바로 이동할 수 있어요.</S.HelperText>
      ) : null}
      {isAuthenticated && !hasFavoriteStation ? (
        <S.HelperText>즐겨찾는 역 설정 후 개인화 허브를 이용해보세요.</S.HelperText>
      ) : null}
      <S.Grid>
        <li>
          <StackFlow.Link
            activityName={dailyVoteHubActivityName}
            activityParams={dailyVoteHubActivityParams}
          >
            <S.CardButton type="button">
              <S.CardTitle>투표 라운지</S.CardTitle>
              <S.CardMeta>투표/댓글 참여</S.CardMeta>
            </S.CardButton>
          </StackFlow.Link>
        </li>
        <li>
          <StackFlow.Link
            activityName={isAuthenticated ? 'CommunityPage' : 'SignInPage'}
            activityParams={{}}
          >
            <S.CardButton type="button">
              <S.CardTitle>커뮤니티 허브</S.CardTitle>
              <S.CardMeta>인기글/필터</S.CardMeta>
            </S.CardButton>
          </StackFlow.Link>
        </li>
        <li>
          <StackFlow.Link
            activityName={isAuthenticated ? 'LostFoundPage' : 'SignInPage'}
            activityParams={{}}
          >
            <S.CardButton type="button">
              <S.CardTitle>유실물 허브</S.CardTitle>
              <S.CardMeta>제보/댓글</S.CardMeta>
            </S.CardButton>
          </StackFlow.Link>
        </li>
        <li>
          <StackFlow.Link
            activityName={isAuthenticated ? 'ComplaintPage' : 'SignInPage'}
            activityParams={{}}
          >
            <S.CardButton type="button">
              <S.CardTitle>민원 허브</S.CardTitle>
              <S.CardMeta>접수/답글</S.CardMeta>
            </S.CardButton>
          </StackFlow.Link>
        </li>
      </S.Grid>

      <S.ForeignerActions>
        <StackFlow.Link
          activityName={isAuthenticated ? 'ForeignerHotspotsPage' : 'SignInPage'}
          activityParams={isAuthenticated ? { locale: 'en' } : {}}
        >
          <S.ForeignerButton type="button">외국인 역 소셜 허브</S.ForeignerButton>
        </StackFlow.Link>
        <StackFlow.Link
          activityName={isAuthenticated ? 'ForeignerLanguageExchangePage' : 'SignInPage'}
          activityParams={isAuthenticated ? { locale: 'en' } : {}}
        >
          <S.ForeignerButton type="button">외국인 언어교환 허브</S.ForeignerButton>
        </StackFlow.Link>
      </S.ForeignerActions>
    </S.Container>
  );
};

export default ServiceHub;
