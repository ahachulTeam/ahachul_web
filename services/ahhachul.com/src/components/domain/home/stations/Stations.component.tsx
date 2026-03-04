import { useAuth } from '@/contexts';
import { StackFlow } from '@/stackflow';
import { useUserStationStore } from '@/stores/subway';

import * as S from './Stations.styled';
import SubwayLineFilter from './subwayLineFilter/SubwayLineFilter.component';
import TrainRealTimes from './trainRealTimes/TrainRealTimes.component';

const Stations = () => {
  const { authService, isCheckingAuthState } = useAuth();
  const { userStations, setUserStations } = useUserStationStore(state => state);

  const currentStation = userStations[0];
  const currentSubwayLineInfo = currentStation?.subwayLineInfoList?.[0];

  if (isCheckingAuthState) {
    return (
      <section css={S.section}>
        <S.SkeletonCard>
          <S.SkeletonTitle />
          <S.SkeletonBody />
        </S.SkeletonCard>
      </section>
    );
  }

  if (!authService.isAuthenticated) {
    return (
      <section css={S.section}>
        <S.FallbackCard>
          <S.FallbackTitle>로그인하면 내 역 실시간 정보를 바로 확인할 수 있어요.</S.FallbackTitle>
          <S.FallbackDescription>
            비회원 모드에서는 전체 노선도 탐색을 먼저 이용해보세요.
          </S.FallbackDescription>
          <StackFlow.Link activityName="SubwayMapPage" activityParams={{}}>
            <S.ActionButton type="button">전체 노선도 보기</S.ActionButton>
          </StackFlow.Link>
        </S.FallbackCard>
      </section>
    );
  }

  if (!currentStation) {
    return (
      <section css={S.section}>
        <S.FallbackCard>
          <S.FallbackTitle>즐겨찾는 역 설정이 필요해요.</S.FallbackTitle>
          <S.FallbackDescription>
            역을 설정하면 홈에서 실시간 도착 정보와 맞춤 요약을 보여드려요.
          </S.FallbackDescription>
          <StackFlow.Link activityName="SettingPage" activityParams={{}}>
            <S.ActionButton type="button">즐겨찾는 역 설정</S.ActionButton>
          </StackFlow.Link>
        </S.FallbackCard>
      </section>
    );
  }

  if (!currentSubwayLineInfo) {
    return (
      <section css={S.section}>
        <S.FallbackCard>
          <S.FallbackTitle>실시간 정보가 아직 준비되지 않았어요.</S.FallbackTitle>
          <S.FallbackDescription>전체 노선도에서 다른 노선을 확인해보세요.</S.FallbackDescription>
          <StackFlow.Link activityName="SubwayMapPage" activityParams={{}}>
            <S.ActionButton type="button">전체 노선도 보기</S.ActionButton>
          </StackFlow.Link>
        </S.FallbackCard>
      </section>
    );
  }

  const realTimesProps = {
    ...currentSubwayLineInfo,
    stationId: currentStation.stationId,
    stationName: currentStation.stationName,
  };

  return (
    <section css={S.section}>
      <SubwayLineFilter
        userStations={userStations}
        currentStation={currentStation}
        setUserStations={setUserStations}
      />
      <TrainRealTimes {...realTimesProps} />
    </section>
  );
};

export default Stations;
