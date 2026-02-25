import { type CSSProperties, useEffect, useMemo, useState } from 'react';

import { type ActivityComponentType } from '@stackflow/react';

import { formatDisplayDate } from '@ahhachul/utils';

import { LayoutComponent } from '@/components';
import {
  useCreateDelayProof,
  useFetchDelayCenterOverview,
  useFetchSubwayLinesRaw,
} from '@/services/subway';
import { useFetchUserFavoriteStations } from '@/services/user';
import { useFlow } from '@/stackflow';
import { DelayCenterOverviewQuery, UpDownType } from '@/types';
import { createActionLogger, resolveClientErrorMessage } from '@/utils/observability';

type DelayCenterParams = {
  stationId?: number;
  subwayLineId?: number;
  upDownType?: UpDownType;
};

type FeedbackType = 'success' | 'error' | 'info';

type Feedback = {
  type: FeedbackType;
  message: string;
};

const delayCenterLogger = createActionLogger('my-delay-center-page');

const sectionStyle: CSSProperties = {
  border: '1px solid #E4E6EB',
  borderRadius: '12px',
  padding: '14px',
  background: '#FFFFFF',
};

const feedbackColorByType: Record<FeedbackType, string> = {
  success: '#047857',
  error: '#B91C1C',
  info: '#374151',
};

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

const DelayCenterPage: ActivityComponentType<DelayCenterParams> = ({
  params,
}: {
  params: DelayCenterParams;
}) => {
  const { push } = useFlow();
  const { data: linePayload, isLoading: isLineLoading } = useFetchSubwayLinesRaw();
  const subwayLines = linePayload?.subwayLines ?? [];
  const favoriteStationQuery = useFetchUserFavoriteStations();
  const createDelayProofMutation = useCreateDelayProof();

  const [selectedLineId, setSelectedLineId] = useState<number>(0);
  const [selectedStationId, setSelectedStationId] = useState<number>(0);
  const [selectedUpDownType, setSelectedUpDownType] = useState<'ALL' | UpDownType>('ALL');
  const [windowMinutes, setWindowMinutes] = useState<number>(30);
  const [incidentLimit, setIncidentLimit] = useState<number>(10);
  const [signalLimit, setSignalLimit] = useState<number>(100);
  const [expectedArrivalAtDraft, setExpectedArrivalAtDraft] = useState<string>('');
  const [customDelayMessage, setCustomDelayMessage] = useState<string>('');
  const [currentQuery, setCurrentQuery] = useState<DelayCenterOverviewQuery | null>(null);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [issuedProofId, setIssuedProofId] = useState<string | null>(null);

  const overviewQuery = useFetchDelayCenterOverview(
    currentQuery ?? {
      stationId: 0,
      subwayLineId: 0,
    },
    { enabled: Boolean(currentQuery) },
  );

  const selectedLine = useMemo(
    () => subwayLines.find(line => line.id === selectedLineId),
    [selectedLineId, subwayLines],
  );
  const stationOptions = selectedLine?.stations ?? [];
  const selectedStationName =
    stationOptions.find(station => station.id === selectedStationId)?.name ?? '선택 없음';

  useEffect(() => {
    if (!subwayLines.length || selectedLineId > 0) {
      return;
    }

    const favorite = favoriteStationQuery.data?.result.stationInfoList?.[0];
    const lineIdFromFavorite =
      favorite?.lineId ??
      favorite?.subwayLineInfoList?.[0]?.subwayLineId ??
      Number(params.subwayLineId);
    const stationIdFromFavorite = favorite?.stationId ?? Number(params.stationId);

    const line =
      subwayLines.find(item => item.id === lineIdFromFavorite) ??
      subwayLines.find(item =>
        item.stations.some(station => station.id === stationIdFromFavorite),
      ) ??
      subwayLines[0];

    setSelectedLineId(line.id);
  }, [
    favoriteStationQuery.data?.result.stationInfoList,
    params.stationId,
    params.subwayLineId,
    selectedLineId,
    subwayLines,
  ]);

  useEffect(() => {
    if (!stationOptions.length) {
      setSelectedStationId(0);
      return;
    }

    if (stationOptions.some(station => station.id === selectedStationId)) {
      return;
    }

    const favoriteStationId = favoriteStationQuery.data?.result.stationInfoList?.[0]?.stationId;
    const stationIdFromParams = Number(params.stationId);
    const stationId =
      stationOptions.find(station => station.id === favoriteStationId)?.id ??
      stationOptions.find(station => station.id === stationIdFromParams)?.id ??
      stationOptions[0].id;

    setSelectedStationId(stationId);
  }, [
    favoriteStationQuery.data?.result.stationInfoList,
    params.stationId,
    selectedStationId,
    stationOptions,
  ]);

  useEffect(() => {
    if (!params.upDownType) {
      return;
    }
    setSelectedUpDownType(params.upDownType);
  }, [params.upDownType]);

  useEffect(() => {
    if (!overviewQuery.data) {
      return;
    }
    const recommendedAt = new Date(overviewQuery.data.recommendation.recommendedExpectedArrivalAt);
    setExpectedArrivalAtDraft(
      Number.isNaN(recommendedAt.getTime()) ? '' : toDatetimeLocalValue(recommendedAt),
    );
    setCustomDelayMessage(
      previous => previous.trim() || overviewQuery.data.recommendation.recommendedMessage,
    );
  }, [overviewQuery.data]);

  const handleAnalyze = () => {
    if (!selectedLineId || !selectedStationId) {
      setFeedback({
        type: 'error',
        message: '호선과 역을 먼저 선택해주세요.',
      });
      return;
    }

    setCurrentQuery({
      stationId: selectedStationId,
      subwayLineId: selectedLineId,
      upDownType: selectedUpDownType === 'ALL' ? undefined : selectedUpDownType,
      windowMinutes,
      incidentLimit,
      signalLimit,
    });
    setIssuedProofId(null);
    setFeedback({
      type: 'info',
      message: '통합 분석 요청을 보냈습니다.',
    });
  };

  const handleCreateProof = async () => {
    if (!overviewQuery.data) {
      setFeedback({
        type: 'error',
        message: '먼저 통합 분석을 실행해주세요.',
      });
      return;
    }

    try {
      const response = await createDelayProofMutation.mutateAsync({
        stationId: overviewQuery.data.stationId,
        subwayLineId: overviewQuery.data.subwayLineId,
        upDownType: selectedUpDownType === 'ALL' ? undefined : selectedUpDownType,
        expectedArrivalAt: expectedArrivalAtDraft
          ? new Date(expectedArrivalAtDraft).toISOString()
          : undefined,
        customMessage: customDelayMessage.trim() || undefined,
      });
      setIssuedProofId(response.data.result.proofId);
      setFeedback({
        type: 'success',
        message: '지연 증빙팩을 발급했습니다.',
      });
      delayCenterLogger.success('create-delay-proof', {
        proofId: response.data.result.proofId,
      });
    } catch (error) {
      const userMessage = resolveClientErrorMessage(error, '지연 증빙 발급에 실패했습니다.');
      delayCenterLogger.fail('create-delay-proof', error, undefined, userMessage);
      setFeedback({
        type: 'error',
        message: userMessage,
      });
    }
  };

  return (
    <LayoutComponent.Base>
      <div
        style={{
          minHeight: '100%',
          background: '#F8F9FB',
          padding: '16px',
          display: 'grid',
          gap: '12px',
        }}
      >
        <section style={sectionStyle}>
          <h1 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>
            지연/사고 통합 센터
          </h1>
          <p style={{ color: '#5F6368', fontSize: '13px', marginBottom: '12px' }}>
            공식 공지/커뮤니티/실시간 신뢰도를 통합 분석하고 증빙팩을 즉시 발급합니다.
          </p>

          <div style={{ display: 'grid', gap: '8px' }}>
            <label style={{ fontSize: '12px', color: '#444' }}>
              호선
              <select
                value={selectedLineId}
                onChange={event => setSelectedLineId(Number(event.target.value))}
                style={{ width: '100%', height: '36px', marginTop: '4px' }}
              >
                {subwayLines.map(line => (
                  <option key={line.id} value={line.id}>
                    {line.name}
                  </option>
                ))}
              </select>
            </label>
            <label style={{ fontSize: '12px', color: '#444' }}>
              역
              <select
                value={selectedStationId}
                onChange={event => setSelectedStationId(Number(event.target.value))}
                style={{ width: '100%', height: '36px', marginTop: '4px' }}
              >
                {stationOptions.map(station => (
                  <option key={station.id} value={station.id}>
                    {station.name}
                  </option>
                ))}
              </select>
            </label>
            <label style={{ fontSize: '12px', color: '#444' }}>
              상하행
              <select
                value={selectedUpDownType}
                onChange={event => setSelectedUpDownType(event.target.value as 'ALL' | UpDownType)}
                style={{ width: '100%', height: '36px', marginTop: '4px' }}
              >
                <option value="ALL">전체</option>
                <option value={UpDownType.UP}>상행</option>
                <option value={UpDownType.DOWN}>하행</option>
              </select>
            </label>
          </div>

          <div
            style={{
              marginTop: '10px',
              display: 'grid',
              gap: '8px',
              gridTemplateColumns: '1fr 1fr 1fr',
            }}
          >
            <label style={{ fontSize: '12px', color: '#444' }}>
              윈도우(분)
              <input
                type="number"
                min={5}
                max={120}
                value={windowMinutes}
                onChange={event => setWindowMinutes(Number(event.target.value))}
                style={{ width: '100%', height: '32px', marginTop: '4px' }}
              />
            </label>
            <label style={{ fontSize: '12px', color: '#444' }}>
              공지 수
              <input
                type="number"
                min={1}
                max={100}
                value={incidentLimit}
                onChange={event => setIncidentLimit(Number(event.target.value))}
                style={{ width: '100%', height: '32px', marginTop: '4px' }}
              />
            </label>
            <label style={{ fontSize: '12px', color: '#444' }}>
              시그널 수
              <input
                type="number"
                min={5}
                max={200}
                value={signalLimit}
                onChange={event => setSignalLimit(Number(event.target.value))}
                style={{ width: '100%', height: '32px', marginTop: '4px' }}
              />
            </label>
          </div>

          <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              type="button"
              onClick={handleAnalyze}
              disabled={overviewQuery.isFetching || isLineLoading}
              style={{
                height: '36px',
                borderRadius: '8px',
                border: 'none',
                background: '#111827',
                color: '#fff',
                padding: '0 12px',
                cursor: 'pointer',
              }}
            >
              {overviewQuery.isFetching ? '분석 중...' : '통합 분석'}
            </button>
            <div style={{ fontSize: '12px', color: '#6B7280' }}>선택: {selectedStationName}</div>
          </div>
        </section>

        {feedback ? (
          <div style={{ fontSize: '13px', color: feedbackColorByType[feedback.type] }}>
            {feedback.message}
          </div>
        ) : null}

        {overviewQuery.isError ? (
          <section style={sectionStyle}>
            <p style={{ fontSize: '13px', color: '#B91C1C' }}>
              {resolveClientErrorMessage(
                overviewQuery.error,
                '지연/사고 통합 정보를 불러오지 못했습니다.',
              )}
            </p>
          </section>
        ) : null}

        {overviewQuery.data ? (
          <section style={sectionStyle}>
            <h2 style={{ fontSize: '16px', fontWeight: 700 }}>통합 분석 결과</h2>
            <p style={{ fontSize: '12px', color: '#4B5563', marginTop: '6px' }}>
              등급 {overviewQuery.data.recommendation.gradePreview} · 신뢰도{' '}
              {overviewQuery.data.recommendation.confidenceLevel} · 예상 지연{' '}
              {overviewQuery.data.recommendation.estimatedDelayMin}분
            </p>
            <p style={{ fontSize: '12px', color: '#4B5563', marginTop: '4px' }}>
              공식 공지 {overviewQuery.data.official.eventCount}건(진행중{' '}
              {overviewQuery.data.official.activeEventCount}) · 커뮤니티{' '}
              {overviewQuery.data.community.signalCount}건 · 실시간{' '}
              {overviewQuery.data.realtime.confidenceLevel}
            </p>
            <p style={{ fontSize: '12px', color: '#4B5563', marginTop: '4px' }}>
              추천 도착 시각{' '}
              {formatDateTime(overviewQuery.data.recommendation.recommendedExpectedArrivalAt)}
            </p>
            <p
              style={{
                fontSize: '13px',
                color: '#111827',
                marginTop: '8px',
                whiteSpace: 'pre-line',
              }}
            >
              {overviewQuery.data.recommendation.recommendedMessage}
            </p>

            <div style={{ marginTop: '12px', display: 'grid', gap: '8px' }}>
              <label style={{ fontSize: '12px', color: '#444' }}>
                도착 예정 시각
                <input
                  type="datetime-local"
                  value={expectedArrivalAtDraft}
                  onChange={event => setExpectedArrivalAtDraft(event.target.value)}
                  style={{ width: '100%', height: '34px', marginTop: '4px' }}
                />
              </label>
              <label style={{ fontSize: '12px', color: '#444' }}>
                추가 메시지
                <textarea
                  value={customDelayMessage}
                  onChange={event => setCustomDelayMessage(event.target.value)}
                  rows={3}
                  maxLength={120}
                  style={{ width: '100%', marginTop: '4px' }}
                />
              </label>
            </div>

            <div style={{ marginTop: '10px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => void handleCreateProof()}
                disabled={createDelayProofMutation.isPending}
                style={{
                  height: '36px',
                  borderRadius: '8px',
                  border: 'none',
                  background: '#111827',
                  color: '#fff',
                  padding: '0 12px',
                  cursor: 'pointer',
                }}
              >
                {createDelayProofMutation.isPending ? '발급 중...' : '증빙팩 발급'}
              </button>

              {issuedProofId ? (
                <button
                  type="button"
                  onClick={() => push('DelayProofPage', { proofId: issuedProofId })}
                  style={{
                    height: '36px',
                    borderRadius: '8px',
                    border: '1px solid #D1D5DB',
                    background: '#fff',
                    color: '#111827',
                    padding: '0 12px',
                    cursor: 'pointer',
                  }}
                >
                  증빙 상세 보기
                </button>
              ) : null}
            </div>

            {createDelayProofMutation.isError ? (
              <p style={{ marginTop: '8px', fontSize: '13px', color: '#B91C1C' }}>
                {resolveClientErrorMessage(
                  createDelayProofMutation.error,
                  '지연 증빙 발급에 실패했습니다.',
                )}
              </p>
            ) : null}
          </section>
        ) : null}
      </div>
    </LayoutComponent.Base>
  );
};

export default DelayCenterPage;
