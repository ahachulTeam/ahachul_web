import { useEffect } from 'react';

import { useAuth } from '@/contexts';
import { useFetchUserCommuteCoachToday } from '@/services/user';
import { StackFlow } from '@/stackflow';
import { useUserStationStore } from '@/stores/subway';
import type { CommuteCoachRiskLevel } from '@/types';
import { createActionLogger } from '@/utils/observability';

import * as S from './CommuteCoach.styled';

const commuteCoachLogger = createActionLogger('home-commute-coach');

const RISK_LABELS: Record<CommuteCoachRiskLevel, string> = {
  LOW: '안정',
  MEDIUM: '주의',
  HIGH: '긴급',
};

const WALKING_SOURCE_LABELS = {
  USER_PROFILE: '프로필',
  DEFAULT: '기본값',
} as const;

const CommuteCoach = () => {
  const { isCheckingAuthState, authService } = useAuth();
  const { userStations } = useUserStationStore(state => state);
  const hasFavoriteStation = userStations.length > 0;
  const coachQuery = useFetchUserCommuteCoachToday({
    targetArrivalAt: '09:00',
    timezone: 'Asia/Seoul',
  });

  useEffect(() => {
    if (!coachQuery.error) {
      return;
    }

    commuteCoachLogger.fail(
      'load-commute-coach',
      coachQuery.error,
      undefined,
      '홈 출근 코치 정보를 불러오지 못했습니다.',
    );
  }, [coachQuery.error, coachQuery.errorUpdatedAt]);

  if (isCheckingAuthState) {
    return (
      <S.Container>
        <S.Header>
          <b>출근 코치</b>
        </S.Header>
        <S.SkeletonCard>
          <S.SkeletonBar />
          <S.SkeletonBar short />
        </S.SkeletonCard>
      </S.Container>
    );
  }

  if (!authService.isAuthenticated) {
    return (
      <S.Container>
        <S.Header>
          <b>출근 코치</b>
        </S.Header>
        <S.HelperText>로그인 후 맞춤 출근 코치 안내를 확인할 수 있어요.</S.HelperText>
        <StackFlow.Link activityName="SignInPage" activityParams={{}}>
          <S.RefreshButton type="button">로그인하고 코치 보기</S.RefreshButton>
        </StackFlow.Link>
      </S.Container>
    );
  }

  const coach = coachQuery.data?.result;
  const primaryRoute = coach?.primaryRoute ?? null;
  const walkingMeta = coach?.walkingMeta ?? null;
  let departureLabel = '-';
  if (coach?.departureInMinutes != null) {
    departureLabel =
      coach.departureInMinutes <= 0 ? '지금 바로 출발 권장' : `${coach.departureInMinutes}분 후`;
  }

  return (
    <S.Container>
      <S.Header>
        <b>출근 코치</b>
        <S.RefreshButton type="button" onClick={() => void coachQuery.refetch()}>
          새로고침
        </S.RefreshButton>
      </S.Header>

      {coachQuery.isLoading ? <S.StateText>출근 코치 정보를 계산하는 중입니다.</S.StateText> : null}
      {coachQuery.isError ? <S.ErrorText>출근 코치 정보를 불러오지 못했습니다.</S.ErrorText> : null}

      {!coachQuery.isLoading && !coachQuery.isError && !hasFavoriteStation ? (
        <S.HelperText>추천 경로 없음. 즐겨찾는 역을 추가하면 맞춤 안내를 제공해요.</S.HelperText>
      ) : null}

      {!coachQuery.isLoading && !coachQuery.isError && hasFavoriteStation && coach ? (
        <S.Card>
          <S.CardHeader>
            <p>오늘 출근 안내</p>
            {coach.riskLevel ? (
              <S.RiskBadge riskLevel={coach.riskLevel}>{RISK_LABELS[coach.riskLevel]}</S.RiskBadge>
            ) : null}
          </S.CardHeader>

          {primaryRoute ? (
            <>
              <S.MetaList>
                <li>목표 도착 시각 {coach.targetArrivalAt}</li>
                <li>권장 출발 시각 {coach.safeDepartureAt ?? '-'}</li>
                <li>출발 권장 {departureLabel}</li>
                {walkingMeta ? <li>도보 합계 {walkingMeta.totalWalkingMinutes}분 반영</li> : null}
              </S.MetaList>
              <S.RouteSummary>
                <p>
                  기본 경로 {primaryRoute.sourceStationName} → {primaryRoute.destinationStationName}
                </p>
                <span>
                  정거장 {primaryRoute.summary.totalStops}, 환승{' '}
                  {primaryRoute.summary.transferCount}, 예상 {primaryRoute.summary.estimatedMinutes}
                  분
                </span>
              </S.RouteSummary>
              {walkingMeta ? (
                <S.HelperText>
                  출발 {walkingMeta.source.stationName} {walkingMeta.source.walkingMinutes}분(
                  {WALKING_SOURCE_LABELS[walkingMeta.source.walkingMinutesSource]}) · 도착{' '}
                  {walkingMeta.destination.stationName} {walkingMeta.destination.walkingMinutes}분(
                  {WALKING_SOURCE_LABELS[walkingMeta.destination.walkingMinutesSource]})
                </S.HelperText>
              ) : null}
              {coach.alternativeRoutes.length > 0 ? (
                <S.HelperText>
                  대체 경로 {coach.alternativeRoutes.length}개를 함께 제안합니다.
                </S.HelperText>
              ) : null}
            </>
          ) : (
            <S.HelperText>{coach.guidanceMessage}</S.HelperText>
          )}

          {coach.riskReasons.length > 0 ? (
            <S.RiskReasonList>
              {coach.riskReasons.slice(0, 2).map(reason => (
                <li key={reason}>{reason}</li>
              ))}
            </S.RiskReasonList>
          ) : null}
        </S.Card>
      ) : null}

      {!coachQuery.isLoading && !coachQuery.isError && hasFavoriteStation && !coach ? (
        <S.HelperText>추천 경로 없음. 잠시 후 다시 확인해주세요.</S.HelperText>
      ) : null}
    </S.Container>
  );
};

export default CommuteCoach;
