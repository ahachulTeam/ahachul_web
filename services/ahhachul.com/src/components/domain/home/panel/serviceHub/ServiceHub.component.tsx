import { StackFlow } from '@/stackflow';
import { useUserStationStore } from '@/stores/subway';

import * as S from './ServiceHub.styled';

const ServiceHub = () => {
  const { userStations } = useUserStationStore(state => state);
  const selectedStation = userStations[0];
  const selectedLine = selectedStation?.subwayLineInfoList?.[0];
  const selectedLineId = Number(selectedLine?.subwayLineId ?? 0);

  return (
    <S.Container>
      <b>핵심 기능 바로가기</b>
      <S.Description>홈에서 요약 확인 후, 2~3단계 화면에서 상세 작업을 진행하세요.</S.Description>
      <S.Grid>
        <li>
          <StackFlow.Link
            activityName="DailyVoteHubPage"
            activityParams={{
              stationId: selectedStation?.stationId,
              stationName: selectedStation?.stationName,
              subwayLineId: selectedLineId > 0 ? selectedLineId : undefined,
              subwayLineName: selectedLine?.subwayLineName,
            }}
          >
            <S.CardButton type="button">
              <S.CardTitle>투표 라운지</S.CardTitle>
              <S.CardMeta>투표/댓글 참여</S.CardMeta>
            </S.CardButton>
          </StackFlow.Link>
        </li>
        <li>
          <StackFlow.Link activityName="CommunityPage" activityParams={{}}>
            <S.CardButton type="button">
              <S.CardTitle>커뮤니티 허브</S.CardTitle>
              <S.CardMeta>인기글/필터</S.CardMeta>
            </S.CardButton>
          </StackFlow.Link>
        </li>
        <li>
          <StackFlow.Link activityName="LostFoundPage" activityParams={{}}>
            <S.CardButton type="button">
              <S.CardTitle>유실물 허브</S.CardTitle>
              <S.CardMeta>제보/댓글</S.CardMeta>
            </S.CardButton>
          </StackFlow.Link>
        </li>
        <li>
          <StackFlow.Link activityName="ComplaintPage" activityParams={{}}>
            <S.CardButton type="button">
              <S.CardTitle>민원 허브</S.CardTitle>
              <S.CardMeta>접수/답글</S.CardMeta>
            </S.CardButton>
          </StackFlow.Link>
        </li>
      </S.Grid>
    </S.Container>
  );
};

export default ServiceHub;
