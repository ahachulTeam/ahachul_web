import { useMemo } from 'react';

import { getFirstParentLineId } from '@ahhachul/utils';

import { useFetchCommunityDelaySignals } from '@/services/subway';
import { useUserStationStore } from '@/stores/subway';
import type { CommunityReliabilityBadgeLevel } from '@/types';
import { SubwayLineFilterOptions } from '@/types';

import * as S from './CommunityReliabilitySignal.styled';

interface CommunityReliabilitySignalProps {
  subwayLineFilterValue?: string;
  fallbackSubwayLineId?: number;
  stationId?: number;
  scopeLabel: string;
}

type BadgeTone = {
  label: string;
  title: string;
};

const SIGNAL_WINDOW_MINUTES = 30;
const SIGNAL_LIMIT = 40;

const BADGE_TONE_MAP: Record<CommunityReliabilityBadgeLevel, BadgeTone> = {
  SPIKE: {
    label: '급증',
    title: '동일 시간대 다중 제보가 급증했습니다.',
  },
  ELEVATED: {
    label: '증가',
    title: '동일 시간대 제보가 증가했습니다.',
  },
  NONE: {
    label: '일반',
    title: '동일 시간대 제보 급증은 감지되지 않았습니다.',
  },
};

function toPositiveInt(value: string): number {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : 0;
}

const CommunityReliabilitySignal = ({
  subwayLineFilterValue,
  fallbackSubwayLineId,
  stationId,
  scopeLabel,
}: CommunityReliabilitySignalProps) => {
  const userStations = useUserStationStore(state => getFirstParentLineId(state.userStations));
  const subwayLineId = useMemo(() => {
    if (typeof fallbackSubwayLineId === 'number' && fallbackSubwayLineId > 0) {
      return fallbackSubwayLineId;
    }

    if (!subwayLineFilterValue || subwayLineFilterValue === SubwayLineFilterOptions.ALL_LINES) {
      return 0;
    }

    if (subwayLineFilterValue === SubwayLineFilterOptions.ONLY_MY_LINE) {
      const firstLine = userStations.split(',').find(lineId => toPositiveInt(lineId) > 0);
      return firstLine ? toPositiveInt(firstLine) : 0;
    }

    return toPositiveInt(subwayLineFilterValue);
  }, [fallbackSubwayLineId, subwayLineFilterValue, userStations]);

  const enabled = subwayLineId > 0;

  const signalQuery = useFetchCommunityDelaySignals(
    {
      subwayLineId,
      ...(stationId && stationId > 0 ? { stationId } : {}),
      windowMinutes: SIGNAL_WINDOW_MINUTES,
      limit: SIGNAL_LIMIT,
    },
    { enabled },
  );

  const badgeTone = useMemo(() => {
    if (!signalQuery.data) {
      return BADGE_TONE_MAP.NONE;
    }

    return BADGE_TONE_MAP[signalQuery.data.reliabilityBadgeLevel] ?? BADGE_TONE_MAP.NONE;
  }, [signalQuery.data]);

  if (!enabled) {
    return (
      <S.Container>
        <S.Title>지연 신뢰 신호</S.Title>
        <S.Description>
          호선을 선택하면 동일 시간대 다중 제보 기반 신뢰 배지를 확인할 수 있습니다.
        </S.Description>
      </S.Container>
    );
  }

  if (signalQuery.isLoading) {
    return (
      <S.Container>
        <S.SkeletonLine width="40%" />
        <S.SkeletonLine width="72%" />
      </S.Container>
    );
  }

  if (signalQuery.isError || !signalQuery.data) {
    return (
      <S.Container>
        <S.Title>지연 신뢰 신호를 불러오지 못했습니다.</S.Title>
        <S.ActionButton type="button" onClick={() => void signalQuery.refetch()}>
          다시 시도
        </S.ActionButton>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.Row>
        <S.Title>{scopeLabel}</S.Title>
        <S.Badge level={signalQuery.data.reliabilityBadgeLevel}>{badgeTone.label}</S.Badge>
      </S.Row>

      <S.Description>{badgeTone.title}</S.Description>
      <S.MutedText>
        최근 {signalQuery.data.windowMinutes}분 제보 {signalQuery.data.signalCount}건 · 작성자{' '}
        {signalQuery.data.distinctAuthors}명
      </S.MutedText>
      <S.MutedText>
        동일 {signalQuery.data.timeSlotMinutes}분 슬롯 최대 제보{' '}
        {signalQuery.data.sameTimeSlotSignalCount}건 / 작성자{' '}
        {signalQuery.data.sameTimeSlotDistinctAuthors}명
      </S.MutedText>
      <S.Confidence>커뮤니티 신뢰도: {signalQuery.data.confidenceLevel}</S.Confidence>
    </S.Container>
  );
};

export default CommunityReliabilitySignal;
