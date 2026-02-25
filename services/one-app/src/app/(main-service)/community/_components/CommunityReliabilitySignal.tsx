'use client';

import { CSSProperties, useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import {
  buildQuerySignature,
  QUERY_GC_TIME,
  QUERY_STALE_TIME,
  subwayQueryKeys,
} from '@ahhachul/domain';

import { getCommunityDelaySignalsV2 } from '@/lib/community-delay-signals';
import type { CommunityReliabilityBadgeLevel } from '@/types';

const DEFAULT_FILTER_VALUE = '0';
const SIGNAL_WINDOW_MINUTES = 30;
const SIGNAL_LIMIT = 40;

type BadgeTone = {
  label: string;
  style: CSSProperties;
  summary: string;
};

const BADGE_TONE_MAP: Record<CommunityReliabilityBadgeLevel, BadgeTone> = {
  SPIKE: {
    label: '급증',
    style: {
      backgroundColor: '#EB4D3D',
      color: '#FFFFFF',
    },
    summary: '동일 시간대 다중 제보가 급증했습니다.',
  },
  ELEVATED: {
    label: '증가',
    style: {
      backgroundColor: '#B8E5FF',
      color: '#121212',
    },
    summary: '동일 시간대 제보가 증가했습니다.',
  },
  NONE: {
    label: '일반',
    style: {
      backgroundColor: '#EAECF1',
      color: '#33333E',
    },
    summary: '동일 시간대 제보 급증은 감지되지 않았습니다.',
  },
};

function toPositiveInt(value: string | null): number {
  if (!value || value === DEFAULT_FILTER_VALUE) {
    return 0;
  }

  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    return 0;
  }

  return parsed;
}

function resolveScopeLabel(stationId: number) {
  if (stationId > 0) {
    return '역 범위 지연 신뢰 신호';
  }

  return '호선 범위 지연 신뢰 신호';
}

export default function CommunityReliabilitySignal() {
  const searchParams = useSearchParams();
  const subwayLineId = toPositiveInt(searchParams.get('subwayLineId'));
  const stationId = toPositiveInt(searchParams.get('stationId'));

  const signature = useMemo(
    () =>
      buildQuerySignature({
        subwayLineId,
        stationId,
        windowMinutes: SIGNAL_WINDOW_MINUTES,
        limit: SIGNAL_LIMIT,
      }),
    [stationId, subwayLineId],
  );

  const signalQuery = useQuery({
    queryKey: [...subwayQueryKeys.trains(), 'community-delay-signals-v2', signature],
    queryFn: () =>
      getCommunityDelaySignalsV2({
        subwayLineId,
        ...(stationId > 0 ? { stationId } : {}),
        windowMinutes: SIGNAL_WINDOW_MINUTES,
        limit: SIGNAL_LIMIT,
      }),
    enabled: subwayLineId > 0,
    staleTime: QUERY_STALE_TIME.feed,
    gcTime: QUERY_GC_TIME.feed,
    retry: 1,
  });

  if (subwayLineId <= 0) {
    return (
      <section className="mx-5 mt-3 rounded-2xl border border-gray-30 bg-gray-10 px-4 py-3">
        <p className="text-label-medium text-gray-90">지연 신뢰 신호</p>
        <p className="mt-1 text-body-small text-gray-70">
          호선을 선택하면 동일 시간대 다중 제보 기반 신뢰 배지를 볼 수 있습니다.
        </p>
      </section>
    );
  }

  if (signalQuery.isPending) {
    return (
      <section className="mx-5 mt-3 animate-pulse rounded-2xl border border-gray-30 bg-gray-10 px-4 py-3">
        <div className="h-4 w-28 rounded bg-gray-30" />
        <div className="mt-2 h-3 w-52 rounded bg-gray-30" />
      </section>
    );
  }

  if (signalQuery.isError || !signalQuery.data?.result) {
    return (
      <section className="mx-5 mt-3 rounded-2xl border border-red bg-red/10 px-4 py-3">
        <p className="text-label-medium text-red">지연 신뢰 신호를 불러오지 못했습니다.</p>
        <button
          type="button"
          className="mt-2 rounded-full border border-red px-3 py-1 text-label-small text-red"
          onClick={() => void signalQuery.refetch()}
        >
          다시 시도
        </button>
      </section>
    );
  }

  const payload = signalQuery.data.result;
  const badgeTone = BADGE_TONE_MAP[payload.reliabilityBadgeLevel] ?? BADGE_TONE_MAP.NONE;
  const scopeLabel = resolveScopeLabel(stationId);

  return (
    <section className="mx-5 mt-3 rounded-2xl border border-gray-30 bg-white px-4 py-3 shadow-[0_6px_18px_rgba(15,23,42,0.06)]">
      <div className="flex items-center justify-between gap-2">
        <p className="text-label-medium text-gray-100">{scopeLabel}</p>
        <span className="rounded-full px-2 py-1 text-label-small" style={badgeTone.style}>
          {badgeTone.label}
        </span>
      </div>
      <p className="mt-2 text-body-small text-gray-90">{badgeTone.summary}</p>
      <p className="mt-1 text-body-small text-gray-70">
        최근 {payload.windowMinutes}분 제보 {payload.signalCount}건 · 작성자{' '}
        {payload.distinctAuthors}명
      </p>
      <p className="mt-1 text-body-small text-gray-70">
        동일 {payload.timeSlotMinutes}분 슬롯 최대 제보 {payload.sameTimeSlotSignalCount}건 / 작성자{' '}
        {payload.sameTimeSlotDistinctAuthors}명
      </p>
      <p className="mt-1 text-label-small text-key-color">
        커뮤니티 신뢰도: {payload.confidenceLevel}
      </p>
    </section>
  );
}
