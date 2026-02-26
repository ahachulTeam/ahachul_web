import { useMemo, useState, type CSSProperties } from 'react';

import { type ActivityComponentType } from '@stackflow/react';
import { useQueryClient } from '@tanstack/react-query';

import { formatDisplayDate } from '@ahhachul/utils';

import { LayoutComponent } from '@/components';
import {
  useCreateDailyVoteStationPoll,
  useDeleteDailyVotePoll,
  useFetchDailyVoteStationPolls,
  useVoteDailyPoll,
} from '@/services/subway';
import { StackFlow, useFlow } from '@/stackflow';
import { resolveClientErrorMessage } from '@/utils/observability';

type DailyVoteStationPageParams = {
  stationId: number;
  stationName?: string;
  subwayLineId?: number;
  subwayLineName?: string;
};

const sectionStyle: CSSProperties = {
  border: '1px solid #E4E6EB',
  borderRadius: '12px',
  padding: '14px',
  background: '#FFFFFF',
};

const DailyVoteStationPage: ActivityComponentType<DailyVoteStationPageParams> = ({
  params,
}: {
  params: DailyVoteStationPageParams;
}) => {
  const { push } = useFlow();
  const queryClient = useQueryClient();
  const stationId = Number(params.stationId ?? 0);
  const stationNameFallback = params.stationName || '-';
  const subwayLineId = Number(params.subwayLineId ?? 0);
  const subwayLineName = params.subwayLineName || '';

  const [sort, setSort] = useState<'latest' | 'popular'>('latest');
  const [draftQuestion, setDraftQuestion] = useState('');
  const [submitErrorMessage, setSubmitErrorMessage] = useState<string | null>(null);
  const [actionErrorMessage, setActionErrorMessage] = useState<string | null>(null);

  const stationPollsQuery = useFetchDailyVoteStationPolls(
    stationId,
    {
      sort,
      subwayLineId: subwayLineId > 0 ? subwayLineId : undefined,
      limit: 50,
    },
    { enabled: stationId > 0 },
  );
  const voteMutation = useVoteDailyPoll();
  const createStationPollMutation = useCreateDailyVoteStationPoll(stationId);
  const deletePollMutation = useDeleteDailyVotePoll();

  const stationPolls = stationPollsQuery.data?.polls ?? [];
  const stationName = stationPollsQuery.data?.stationName || stationNameFallback;
  const questionLength = draftQuestion.trim().length;

  const canCreatePoll = useMemo(() => questionLength > 0, [questionLength]);

  const handleCreatePoll = () => {
    const normalizedQuestion = draftQuestion.trim();
    if (!normalizedQuestion) {
      setSubmitErrorMessage('질문을 입력해주세요.');
      return;
    }

    createStationPollMutation.mutate(
      {
        question: normalizedQuestion,
        subwayLineId: subwayLineId > 0 ? subwayLineId : undefined,
      },
      {
        onSuccess: async () => {
          setDraftQuestion('');
          setSubmitErrorMessage(null);
          await queryClient.invalidateQueries({
            queryKey: ['daily-vote', 'station-polls', stationId],
          });
        },
        onError: error => {
          setSubmitErrorMessage(resolveClientErrorMessage(error, '투표 생성에 실패했습니다.'));
        },
      },
    );
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
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
            <h1 style={{ fontSize: '18px', fontWeight: 700 }}>역 투표 게시판</h1>
            <button
              type="button"
              onClick={() => push('HomePage', {})}
              style={{
                height: '32px',
                borderRadius: '8px',
                border: '1px solid #D1D5DB',
                background: '#fff',
                padding: '0 10px',
                cursor: 'pointer',
              }}
            >
              홈으로
            </button>
          </div>
          <p style={{ marginTop: '6px', fontSize: '12px', color: '#4B5563' }}>
            {stationName}
            {subwayLineName ? ` · ${subwayLineName}` : ''}
          </p>
          <p style={{ marginTop: '6px', fontSize: '13px', color: '#4B5563' }}>
            즐겨찾기한 역에 대해 자유롭게 투표 질문을 올릴 수 있습니다.
          </p>
        </section>

        <section style={sectionStyle}>
          <strong style={{ fontSize: '14px', color: '#111827' }}>새 투표 올리기</strong>
          <div style={{ marginTop: '8px', display: 'grid', gap: '8px' }}>
            <input
              type="text"
              value={draftQuestion}
              onChange={event => setDraftQuestion(event.target.value.slice(0, 120))}
              placeholder="예: 오늘 안암역 환승 동선 괜찮으셨나요?"
              style={{
                height: '36px',
                border: '1px solid #D1D5DB',
                borderRadius: '8px',
                padding: '0 12px',
                fontSize: '13px',
              }}
            />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '12px', color: '#6B7280' }}>{questionLength}/120</span>
              <button
                type="button"
                disabled={!canCreatePoll || createStationPollMutation.isPending}
                onClick={handleCreatePoll}
                style={{
                  height: '32px',
                  borderRadius: '8px',
                  border: '1px solid #2ACF6C',
                  background: '#2ACF6C',
                  color: '#fff',
                  padding: '0 10px',
                  fontSize: '12px',
                  opacity: !canCreatePoll || createStationPollMutation.isPending ? 0.6 : 1,
                }}
              >
                {createStationPollMutation.isPending ? '등록 중...' : '등록'}
              </button>
            </div>
            {submitErrorMessage ? (
              <p style={{ fontSize: '12px', color: '#B91C1C' }}>{submitErrorMessage}</p>
            ) : null}
          </div>
        </section>

        <section style={sectionStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <strong>투표 목록</strong>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                onClick={() => setSort('latest')}
                style={{
                  borderRadius: '6px',
                  border: sort === 'latest' ? '1px solid #2ACF6C' : '1px solid #D1D5DB',
                  background: sort === 'latest' ? '#2ACF6C' : '#fff',
                  color: sort === 'latest' ? '#fff' : '#111827',
                  padding: '4px 8px',
                  fontSize: '12px',
                }}
              >
                최신순
              </button>
              <button
                type="button"
                onClick={() => setSort('popular')}
                style={{
                  borderRadius: '6px',
                  border: sort === 'popular' ? '1px solid #2ACF6C' : '1px solid #D1D5DB',
                  background: sort === 'popular' ? '#2ACF6C' : '#fff',
                  color: sort === 'popular' ? '#fff' : '#111827',
                  padding: '4px 8px',
                  fontSize: '12px',
                }}
              >
                인기순
              </button>
            </div>
          </div>

          {stationPollsQuery.isLoading ? (
            <p style={{ marginTop: '10px', fontSize: '13px', color: '#6B7280' }}>
              투표 목록을 불러오는 중입니다.
            </p>
          ) : null}
          {stationPollsQuery.isError ? (
            <p style={{ marginTop: '10px', fontSize: '13px', color: '#B91C1C' }}>
              {resolveClientErrorMessage(
                stationPollsQuery.error,
                '투표 목록을 불러오지 못했습니다.',
              )}
            </p>
          ) : null}
          {!stationPollsQuery.isLoading &&
          !stationPollsQuery.isError &&
          stationPolls.length === 0 ? (
            <p style={{ marginTop: '10px', fontSize: '13px', color: '#6B7280' }}>
              등록된 투표가 없습니다. 첫 투표를 올려보세요.
            </p>
          ) : null}

          <ul style={{ marginTop: '10px', display: 'grid', gap: '8px' }}>
            {stationPolls.map(poll => (
              <li
                key={`station-poll-${poll.pollId}`}
                style={{
                  border: '1px solid #E5E7EB',
                  borderRadius: '10px',
                  background: '#F9FAFB',
                  padding: '10px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
                  <p style={{ fontSize: '13px', fontWeight: 700, color: '#111827' }}>
                    {poll.question}
                  </p>
                  <span style={{ fontSize: '12px', color: '#6B7280' }}>
                    {formatDisplayDate(poll.createdAt, { format: 'short' })}
                  </span>
                </div>
                <p style={{ marginTop: '4px', fontSize: '12px', color: '#6B7280' }}>
                  {poll.subwayLineName} · 댓글 {poll.commentCount}개 · 총 참여 {poll.totalVoteCount}
                  명
                </p>
                <ul style={{ marginTop: '8px', display: 'grid', gap: '6px' }}>
                  {poll.options.map(option => (
                    <li key={`${poll.pollId}-${option.optionCode}`}>
                      <button
                        type="button"
                        onClick={() =>
                          voteMutation.mutate(
                            { pollId: poll.pollId, optionCode: option.optionCode },
                            {
                              onSuccess: async () => {
                                await Promise.all([
                                  queryClient.invalidateQueries({
                                    queryKey: ['daily-vote', 'station-polls', stationId],
                                  }),
                                  queryClient.invalidateQueries({
                                    queryKey: ['daily-vote', 'today'],
                                  }),
                                ]);
                                setActionErrorMessage(null);
                              },
                              onError: error => {
                                setActionErrorMessage(
                                  resolveClientErrorMessage(error, '투표 처리에 실패했습니다.'),
                                );
                              },
                            },
                          )
                        }
                        disabled={voteMutation.isPending}
                        style={{
                          width: '100%',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          borderRadius: '8px',
                          border:
                            option.optionCode === poll.selectedOptionCode
                              ? '1px solid #2ACF6C'
                              : '1px solid #D1D5DB',
                          background:
                            option.optionCode === poll.selectedOptionCode ? '#ECFDF3' : '#fff',
                          color: '#111827',
                          padding: '8px 10px',
                          fontSize: '12px',
                        }}
                      >
                        <span>
                          {option.emoji} {option.label}
                        </span>
                        <span>
                          {option.voteCount}표 · {option.voteRatePercent}%
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
                <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'space-between' }}>
                  <StackFlow.Link
                    activityName="DailyVotePage"
                    activityParams={{
                      pollId: poll.pollId,
                      question: poll.question,
                      stationName: poll.stationName,
                    }}
                  >
                    <button
                      type="button"
                      style={{
                        border: 'none',
                        background: 'transparent',
                        padding: 0,
                        fontSize: '12px',
                        color: '#2563EB',
                        cursor: 'pointer',
                      }}
                    >
                      댓글 보기
                    </button>
                  </StackFlow.Link>

                  {poll.mine ? (
                    <button
                      type="button"
                      disabled={deletePollMutation.isPending}
                      onClick={() =>
                        deletePollMutation.mutate(poll.pollId, {
                          onSuccess: async () => {
                            await queryClient.invalidateQueries({
                              queryKey: ['daily-vote', 'station-polls', stationId],
                            });
                            setActionErrorMessage(null);
                          },
                          onError: error => {
                            setActionErrorMessage(
                              resolveClientErrorMessage(error, '투표 삭제에 실패했습니다.'),
                            );
                          },
                        })
                      }
                      style={{
                        border: 'none',
                        background: 'transparent',
                        padding: 0,
                        fontSize: '12px',
                        color: '#DC2626',
                        cursor: 'pointer',
                      }}
                    >
                      삭제
                    </button>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>

          {actionErrorMessage ? (
            <p style={{ marginTop: '8px', fontSize: '12px', color: '#B91C1C' }}>
              {actionErrorMessage}
            </p>
          ) : null}
        </section>
      </div>
    </LayoutComponent.Base>
  );
};

export default DailyVoteStationPage;
