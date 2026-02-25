import { useEffect } from 'react';

import { useAuth } from '@/contexts';
import { useFetchUserCommuteCoachToday } from '@/services/user';
import type { CommuteCoachRiskLevel } from '@/types';
import { createActionLogger } from '@/utils/observability';

import * as S from './CommuteCoach.styled';

const commuteCoachLogger = createActionLogger('home-commute-coach');

const RISK_LABELS: Record<CommuteCoachRiskLevel, string> = {
  LOW: '안정',
  MEDIUM: '주의',
  HIGH: '긴급',
};

const CommuteCoach = () => {
  const { isCheckingAuthState, authService } = useAuth();
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

  if (isCheckingAuthState || !authService.isAuthenticated) {
    return null;
  }

  const coach = coachQuery.data?.result;
  const primaryRoute = coach?.primaryRoute ?? null;
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

      {!coachQuery.isLoading && !coachQuery.isError && coach ? (
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
    </S.Container>
  );
};

export default CommuteCoach;
