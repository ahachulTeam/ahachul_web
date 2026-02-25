'use client';

import { useEffect, useMemo, useState } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';
import Link from 'next/link';

import { API_PATHS } from '@ahhachul/http';
import { formatDisplayDate } from '@ahhachul/utils';

import { getMyFavoriteStations } from '@/app/(main-service)/me/_lib/getMyProfile';
import { localizePathname, type LocaleMessages, type SupportedLocale } from '@/i18n';
import { createDelayProofV2, getDelayCenterOverviewV2 } from '@/lib/delay-proof';
import { fetchClient } from '@/lib/fetch-client';
import { createActionLogger, resolveClientErrorMessage } from '@/lib/observability';
import type {
  ApiResponse,
  DelayCenterOverviewPayload,
  DelayCenterOverviewQuery,
  DelayProofPayload,
  RealtimeUpDownType,
} from '@/types';

type SubwayLineCatalogStation = {
  id: number;
  name: string;
};

type SubwayLineCatalogLine = {
  id: number;
  name: string;
  stations: SubwayLineCatalogStation[];
};

type SubwayLineCatalogResponse = {
  subwayLines: SubwayLineCatalogLine[];
};

type FeedbackType = 'success' | 'error' | 'info';

type Feedback = {
  type: FeedbackType;
  message: string;
};

const delayCenterLogger = createActionLogger('delay-center-page');

function toDatetimeLocalValue(date: Date): string {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  const hours = `${date.getHours()}`.padStart(2, '0');
  const minutes = `${date.getMinutes()}`.padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

function formatDateTime(value: string | null | undefined): string {
  return formatDisplayDate(value, {
    format: 'short',
    invalidText: '-',
  });
}

function resolveFeedbackClassName(type: FeedbackType) {
  if (type === 'error') {
    return 'text-danger';
  }

  if (type === 'success') {
    return 'text-key-color';
  }

  return 'text-gray-80';
}

type DelayCenterClientProps = {
  locale: SupportedLocale;
  delayProofCopy: LocaleMessages['me']['delayProof'];
};

export default function DelayCenterClient({ locale, delayProofCopy }: DelayCenterClientProps) {
  const [selectedLineId, setSelectedLineId] = useState<number>(0);
  const [selectedStationId, setSelectedStationId] = useState<number>(0);
  const [selectedUpDownType, setSelectedUpDownType] = useState<'ALL' | RealtimeUpDownType>('ALL');
  const [windowMinutes, setWindowMinutes] = useState<number>(30);
  const [incidentLimit, setIncidentLimit] = useState<number>(10);
  const [signalLimit, setSignalLimit] = useState<number>(100);
  const [expectedArrivalAtDraft, setExpectedArrivalAtDraft] = useState<string>('');
  const [customDelayMessage, setCustomDelayMessage] = useState<string>('');
  const [overview, setOverview] = useState<DelayCenterOverviewPayload | null>(null);
  const [delayProofResult, setDelayProofResult] = useState<DelayProofPayload | null>(null);
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  const subwayLineCatalogQuery = useQuery({
    queryKey: ['subway-lines-for-delay-center'],
    queryFn: () => fetchClient<ApiResponse<SubwayLineCatalogResponse>>(API_PATHS.subway.lines),
    staleTime: 60 * 1000,
    select: response => response.result.subwayLines ?? [],
  });

  const favoriteStationsQuery = useQuery({
    queryKey: ['my-favorite-stations-for-delay-center'],
    queryFn: getMyFavoriteStations,
    staleTime: 60 * 1000,
    select: response => response.result.stationInfoList ?? [],
  });

  const subwayLines = subwayLineCatalogQuery.data ?? [];
  const favoriteStation = favoriteStationsQuery.data?.[0] ?? null;

  useEffect(() => {
    if (!subwayLines.length || selectedLineId > 0) {
      return;
    }

    const favoriteLineId =
      favoriteStation?.lineId ?? favoriteStation?.subwayLineInfoList?.[0]?.subwayLineId;
    const favoriteStationId = favoriteStation?.stationId;

    const lineFromFavorite =
      (favoriteLineId ? subwayLines.find(line => line.id === favoriteLineId) : null) ??
      (favoriteStationId
        ? subwayLines.find(line => line.stations.some(station => station.id === favoriteStationId))
        : null) ??
      subwayLines[0];

    setSelectedLineId(lineFromFavorite.id);
  }, [
    favoriteStation?.lineId,
    favoriteStation?.stationId,
    favoriteStation?.subwayLineInfoList,
    selectedLineId,
    subwayLines,
  ]);

  const selectedLine = useMemo(
    () => subwayLines.find(line => line.id === selectedLineId) ?? null,
    [selectedLineId, subwayLines],
  );

  const stationOptions = selectedLine?.stations ?? [];

  useEffect(() => {
    if (!stationOptions.length) {
      setSelectedStationId(0);
      return;
    }

    if (stationOptions.some(station => station.id === selectedStationId)) {
      return;
    }

    const stationFromFavorite =
      favoriteStation?.stationId &&
      stationOptions.some(station => station.id === favoriteStation.stationId)
        ? favoriteStation.stationId
        : stationOptions[0].id;

    setSelectedStationId(stationFromFavorite);
  }, [favoriteStation?.stationId, selectedStationId, stationOptions]);

  const selectedStationName = useMemo(
    () => stationOptions.find(station => station.id === selectedStationId)?.name ?? '선택 없음',
    [selectedStationId, stationOptions],
  );

  const overviewMutation = useMutation({
    mutationFn: getDelayCenterOverviewV2,
    onSuccess: response => {
      setOverview(response.result);
      setDelayProofResult(null);
      const recommendedAt = new Date(response.result.recommendation.recommendedExpectedArrivalAt);
      setExpectedArrivalAtDraft(
        Number.isNaN(recommendedAt.getTime()) ? '' : toDatetimeLocalValue(recommendedAt),
      );
      setCustomDelayMessage(
        previous => previous.trim() || response.result.recommendation.recommendedMessage,
      );
      setFeedback({
        type: 'success',
        message: '지연/사고 통합 분석을 완료했습니다. 추천 문구를 확인해주세요.',
      });
      delayCenterLogger.success('fetch-overview', {
        stationId: response.result.stationId,
        subwayLineId: response.result.subwayLineId,
      });
    },
  });

  const delayProofMutation = useMutation({
    mutationFn: createDelayProofV2,
    onSuccess: response => {
      setDelayProofResult(response.result);
      setFeedback({
        type: 'success',
        message: '지연 증빙팩을 발급했습니다.',
      });
      delayCenterLogger.success('create-delay-proof', {
        proofId: response.result.proofId,
      });
    },
  });

  const handleAnalyze = async () => {
    if (!selectedLineId || !selectedStationId) {
      setFeedback({
        type: 'error',
        message: '호선과 역을 먼저 선택해주세요.',
      });
      return;
    }

    const payload: DelayCenterOverviewQuery = {
      stationId: selectedStationId,
      subwayLineId: selectedLineId,
      upDownType: selectedUpDownType === 'ALL' ? undefined : selectedUpDownType,
      windowMinutes,
      incidentLimit,
      signalLimit,
    };

    try {
      await overviewMutation.mutateAsync(payload);
    } catch (error) {
      const userMessage = resolveClientErrorMessage(
        error,
        '지연/사고 통합 정보를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.',
      );
      delayCenterLogger.fail(
        'fetch-overview',
        error,
        {
          stationId: payload.stationId,
          subwayLineId: payload.subwayLineId,
          upDownType: payload.upDownType ?? 'ALL',
          windowMinutes: payload.windowMinutes,
          incidentLimit: payload.incidentLimit,
          signalLimit: payload.signalLimit,
        },
        userMessage,
      );
      setFeedback({
        type: 'error',
        message: userMessage,
      });
    }
  };

  const handleCreateDelayProof = async () => {
    if (!selectedLineId || !selectedStationId) {
      setFeedback({
        type: 'error',
        message: delayProofCopy.stationRequired,
      });
      return;
    }

    try {
      const normalizedExpectedArrivalAt = expectedArrivalAtDraft
        ? new Date(expectedArrivalAtDraft).toISOString()
        : undefined;

      await delayProofMutation.mutateAsync({
        stationId: selectedStationId,
        subwayLineId: selectedLineId,
        upDownType: selectedUpDownType === 'ALL' ? undefined : selectedUpDownType,
        expectedArrivalAt: normalizedExpectedArrivalAt,
        customMessage: customDelayMessage.trim() || undefined,
      });
    } catch (error) {
      const userMessage = resolveClientErrorMessage(error, delayProofCopy.createError);
      delayCenterLogger.fail(
        'create-delay-proof',
        error,
        {
          stationId: selectedStationId,
          subwayLineId: selectedLineId,
        },
        userMessage,
      );
      setFeedback({
        type: 'error',
        message: userMessage,
      });
    }
  };

  const copyToClipboard = async (value: string, successMessage: string) => {
    try {
      if (typeof navigator === 'undefined' || !navigator.clipboard?.writeText) {
        throw new Error('clipboard-not-supported');
      }
      await navigator.clipboard.writeText(value);
      setFeedback({ type: 'success', message: successMessage });
    } catch (error) {
      delayCenterLogger.fail('copy-to-clipboard', error, undefined, delayProofCopy.copyUnsupported);
      setFeedback({ type: 'error', message: delayProofCopy.copyUnsupported });
    }
  };

  const handleShareDelayProof = async () => {
    if (!delayProofResult) {
      return;
    }

    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      try {
        await navigator.share({
          title: delayProofCopy.shareTitle,
          text: delayProofResult.text,
          url: delayProofResult.shareUrl,
        });
        setFeedback({ type: 'success', message: '증빙을 공유했습니다.' });
        return;
      } catch (error) {
        delayCenterLogger.info('share-delay-proof:fallback-copy', {
          reason: error instanceof Error ? error.message : 'unknown',
        });
      }
    }

    await copyToClipboard(
      `${delayProofResult.text}\n${delayProofResult.shareUrl}`,
      delayProofCopy.copyTextSuccess,
    );
  };

  return (
    <main className="min-h-screen bg-gray-10 px-5 pb-24 pt-4">
      <section className="rounded-2xl border border-gray-30 bg-white p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h1 className="text-title-small text-gray-100">지연/사고 통합 센터</h1>
          <Link
            href={localizePathname('/me', locale)}
            className="inline-flex h-8 items-center rounded-lg border border-gray-40 px-3 text-label-small text-gray-90"
          >
            마이페이지로
          </Link>
        </div>
        <p className="mt-1 text-body-small text-gray-70">
          공식 공지, 커뮤니티 시그널, 실시간 도착 신뢰도를 한 번에 분석하고 증빙팩을 바로 발급할 수
          있습니다.
        </p>

        <div className="mt-4 grid gap-2">
          <label className="text-label-small text-gray-80">
            호선
            <select
              value={selectedLineId}
              onChange={event => setSelectedLineId(Number(event.target.value))}
              className="mt-1 h-10 w-full rounded-lg border border-gray-40 bg-white px-2 text-body-small text-gray-100"
            >
              {subwayLines.map(line => (
                <option key={line.id} value={line.id}>
                  {line.name}
                </option>
              ))}
            </select>
          </label>

          <label className="text-label-small text-gray-80">
            역
            <select
              value={selectedStationId}
              onChange={event => setSelectedStationId(Number(event.target.value))}
              className="mt-1 h-10 w-full rounded-lg border border-gray-40 bg-white px-2 text-body-small text-gray-100"
            >
              {stationOptions.map(station => (
                <option key={station.id} value={station.id}>
                  {station.name}
                </option>
              ))}
            </select>
          </label>

          <label className="text-label-small text-gray-80">
            상하행
            <select
              value={selectedUpDownType}
              onChange={event =>
                setSelectedUpDownType(event.target.value as 'ALL' | RealtimeUpDownType)
              }
              className="mt-1 h-10 w-full rounded-lg border border-gray-40 bg-white px-2 text-body-small text-gray-100"
            >
              <option value="ALL">전체</option>
              <option value="UP">상행</option>
              <option value="DOWN">하행</option>
            </select>
          </label>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2">
          <label className="text-label-small text-gray-80">
            시그널 윈도우(분)
            <input
              type="number"
              min={5}
              max={120}
              value={windowMinutes}
              onChange={event => setWindowMinutes(Number(event.target.value))}
              className="mt-1 h-9 w-full rounded-lg border border-gray-40 px-2 text-body-small text-gray-100"
            />
          </label>
          <label className="text-label-small text-gray-80">
            공식 공지 수
            <input
              type="number"
              min={1}
              max={100}
              value={incidentLimit}
              onChange={event => setIncidentLimit(Number(event.target.value))}
              className="mt-1 h-9 w-full rounded-lg border border-gray-40 px-2 text-body-small text-gray-100"
            />
          </label>
          <label className="text-label-small text-gray-80">
            커뮤니티 샘플 수
            <input
              type="number"
              min={5}
              max={200}
              value={signalLimit}
              onChange={event => setSignalLimit(Number(event.target.value))}
              className="mt-1 h-9 w-full rounded-lg border border-gray-40 px-2 text-body-small text-gray-100"
            />
          </label>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => void handleAnalyze()}
            disabled={overviewMutation.isPending || subwayLineCatalogQuery.isPending}
            className="inline-flex h-10 items-center rounded-lg bg-key-color px-4 text-label-medium text-white disabled:cursor-not-allowed disabled:bg-gray-70"
          >
            {overviewMutation.isPending ? '분석 중...' : '통합 분석'}
          </button>
          <p className="text-label-small text-gray-70">
            선택: {selectedStationName} · {selectedLine?.name ?? '호선 없음'}
          </p>
        </div>
      </section>

      {feedback ? (
        <p className={`mt-3 px-1 text-body-small ${resolveFeedbackClassName(feedback.type)}`}>
          {feedback.message}
        </p>
      ) : null}

      {overview && (
        <section className="mt-3 space-y-3 rounded-2xl border border-gray-30 bg-white p-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-gray-30 px-2 py-0.5 text-label-small text-gray-80">
              등급 예측 {overview.recommendation.gradePreview}
            </span>
            <span className="rounded-full border border-gray-30 px-2 py-0.5 text-label-small text-gray-80">
              신뢰도 {overview.recommendation.confidenceLevel}
            </span>
            <span className="rounded-full border border-gray-30 px-2 py-0.5 text-label-small text-gray-80">
              예상 지연 {overview.recommendation.estimatedDelayMin}분
            </span>
          </div>

          <article className="rounded-xl border border-gray-30 bg-gray-10 p-3">
            <p className="text-label-medium text-gray-100">실시간</p>
            <p className="mt-1 text-body-small text-gray-80">
              {overview.realtime.destinationStationDirection ?? '-'} ·{' '}
              {overview.realtime.nextStationDirection ?? '-'}
            </p>
            <p className="mt-1 text-body-small text-gray-80">
              ETA {overview.realtime.etaMinDisplay ?? '-'}분 · freshness{' '}
              {overview.realtime.freshnessSec}초 · {overview.realtime.confidenceLevel}
            </p>
          </article>

          <article className="rounded-xl border border-gray-30 bg-gray-10 p-3">
            <p className="text-label-medium text-gray-100">공식 공지</p>
            <p className="mt-1 text-body-small text-gray-80">
              총 {overview.official.eventCount}건 · 진행중 {overview.official.activeEventCount}건
            </p>
            <p className="mt-1 text-label-small text-gray-70">
              소스: {overview.official.dataSource}
            </p>
          </article>

          <article className="rounded-xl border border-gray-30 bg-gray-10 p-3">
            <p className="text-label-medium text-gray-100">커뮤니티 시그널</p>
            <p className="mt-1 text-body-small text-gray-80">
              시그널 {overview.community.signalCount}건 · 작성자{' '}
              {overview.community.distinctAuthors}명 · 중앙값{' '}
              {overview.community.medianReportedDelayMin ?? '-'}분
            </p>
            <p className="mt-1 text-label-small text-gray-70">
              신뢰도 {overview.community.confidenceLevel} · 최근 생성{' '}
              {formatDateTime(overview.generatedAt)}
            </p>
          </article>

          <article className="rounded-xl border border-gray-30 bg-white p-3">
            <p className="text-label-medium text-gray-100">추천 증빙 문구</p>
            <p className="mt-1 whitespace-pre-line text-body-small text-gray-90">
              {overview.recommendation.recommendedMessage}
            </p>
          </article>

          <div className="grid gap-2">
            <label className="text-label-small text-gray-80">
              {delayProofCopy.expectedArrivalAtLabel}
              <input
                type="datetime-local"
                value={expectedArrivalAtDraft}
                onChange={event => setExpectedArrivalAtDraft(event.target.value)}
                className="mt-1 h-9 w-full rounded-lg border border-gray-30 px-2 text-body-small text-gray-90"
              />
            </label>
            <label className="text-label-small text-gray-80">
              {delayProofCopy.customMessageLabel}
              <textarea
                value={customDelayMessage}
                onChange={event => setCustomDelayMessage(event.target.value)}
                maxLength={120}
                rows={3}
                className="mt-1 w-full rounded-lg border border-gray-30 px-2 py-2 text-body-small text-gray-90"
              />
            </label>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => void handleCreateDelayProof()}
                disabled={delayProofMutation.isPending}
                className="inline-flex h-10 items-center rounded-lg bg-key-color px-4 text-label-medium text-white disabled:cursor-not-allowed disabled:bg-gray-70"
              >
                {delayProofMutation.isPending
                  ? delayProofCopy.pending
                  : delayProofCopy.createButton}
              </button>
              <p className="text-label-small text-danger">{delayProofCopy.legalNotice}</p>
            </div>
          </div>
        </section>
      )}

      {delayProofResult && (
        <section className="mt-3 rounded-2xl border border-gray-30 bg-white p-4">
          <div className="flex flex-wrap items-center gap-2 text-label-small text-gray-80">
            <span className="rounded-full border border-gray-30 px-2 py-0.5">
              {delayProofCopy.gradeLabel}: {delayProofResult.grade}
            </span>
            <span className="rounded-full border border-gray-30 px-2 py-0.5">
              {delayProofCopy.confidenceLabel}: {delayProofResult.confidenceLevel}
            </span>
          </div>
          <p className="mt-2 whitespace-pre-line text-body-small text-gray-90">
            {delayProofResult.text}
          </p>
          <p className="mt-1 text-label-small text-gray-70">
            {delayProofCopy.evidenceLabel}
            {` Official ${delayProofResult.evidenceSummary.official.eventCount} · Community ${delayProofResult.evidenceSummary.community.signalCount} · Realtime ${delayProofResult.evidenceSummary.realtime.confidenceLevel}`}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() =>
                void copyToClipboard(delayProofResult.text, delayProofCopy.copyTextSuccess)
              }
              className="inline-flex h-9 items-center rounded-lg border border-gray-40 px-3 text-label-medium text-gray-90"
            >
              {delayProofCopy.copyTextButton}
            </button>
            <button
              type="button"
              onClick={() =>
                void copyToClipboard(delayProofResult.shareUrl, delayProofCopy.copyLinkSuccess)
              }
              className="inline-flex h-9 items-center rounded-lg border border-gray-40 px-3 text-label-medium text-gray-90"
            >
              {delayProofCopy.copyLinkButton}
            </button>
            <button
              type="button"
              onClick={() => void handleShareDelayProof()}
              className="inline-flex h-9 items-center rounded-lg border border-gray-40 px-3 text-label-medium text-gray-90"
            >
              {delayProofCopy.shareButton}
            </button>
            <Link
              href={localizePathname(`/proofs/${delayProofResult.proofId}`, locale)}
              className="inline-flex h-9 items-center rounded-lg border border-gray-40 px-3 text-label-medium text-gray-90"
            >
              증빙 상세 보기
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}
