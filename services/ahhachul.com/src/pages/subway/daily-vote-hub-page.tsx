import { useMemo, useState, type CSSProperties } from 'react';

import { type ActivityComponentType } from '@stackflow/react';
import { useQueryClient } from '@tanstack/react-query';

import { formatDisplayDate } from '@ahhachul/utils';

import { LayoutComponent } from '@/components';
import {
  useFetchDailyVoteComments,
  useFetchDailyVoteToday,
  useVoteDailyPoll,
} from '@/services/subway';
import { StackFlow, useFlow } from '@/stackflow';
import type { DailyVotePollCard } from '@/types';
import { resolveClientErrorMessage } from '@/utils/observability';

type DailyVoteHubPageParams = {
  stationId?: number;
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

function resolveContextLabel(context: DailyVotePollCard['pollContext']) {
  return context === 'SCHOOL' ? '등하교' : '출퇴근';
}

const DailyVoteHubPage: ActivityComponentType<DailyVoteHubPageParams> = ({
  params,
}: {
  params: DailyVoteHubPageParams;
}) => {
  const { push } = useFlow();
  const queryClient = useQueryClient();
  const [actionErrorMessage, setActionErrorMessage] = useState<string | null>(null);

  const stationId = Number(params.stationId ?? 0);
  const stationName = params.stationName || '-';
  const subwayLineId = Number(params.subwayLineId ?? 0);
  const subwayLineName = params.subwayLineName || '';

  const dailyVoteTodayQuery = useFetchDailyVoteToday();
  const voteMutation = useVoteDailyPoll();

  const polls = useMemo(() => {
    const today = dailyVoteTodayQuery.data;
    if (!today) {
      return [] as DailyVotePollCard[];
    }
    return [today.primaryPoll, today.secondaryPoll].filter(
      (poll): poll is DailyVotePollCard => poll != null,
    );
  }, [dailyVoteTodayQuery.data]);

  const previewPoll = polls[0] ?? null;
  const previewCommentsQuery = useFetchDailyVoteComments(previewPoll?.pollId ?? 0, 'latest', {
    enabled: previewPoll != null,
  });
  const previewComments = previewCommentsQuery.data?.comments.slice(0, 5) ?? [];

  const stationBoardTarget = polls[0] ?? null;
  const stationBoardStationId = stationBoardTarget?.stationId || stationId;
  const stationBoardStationName = stationBoardTarget?.stationName || stationName;
  const stationBoardLineId = stationBoardTarget?.subwayLineId || subwayLineId;
  const stationBoardLineName = stationBoardTarget?.subwayLineName || subwayLineName;

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
            <h1 style={{ fontSize: '18px', fontWeight: 700 }}>투표 라운지</h1>
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
          <p style={{ marginTop: '6px', fontSize: '13px', color: '#4B5563' }}>
            홈에서는 요약을 보고, 이 화면에서 투표/댓글 참여를 진행합니다.
          </p>
          {stationBoardStationId > 0 ? (
            <div style={{ marginTop: '10px' }}>
              <StackFlow.Link
                activityName="DailyVoteStationPage"
                activityParams={{
                  stationId: stationBoardStationId,
                  stationName: stationBoardStationName,
                  subwayLineId: stationBoardLineId > 0 ? stationBoardLineId : undefined,
                  subwayLineName: stationBoardLineName || undefined,
                }}
              >
                <button
                  type="button"
                  style={{
                    height: '32px',
                    borderRadius: '8px',
                    border: '1px solid #2ACF6C',
                    color: '#2ACF6C',
                    background: '#fff',
                    padding: '0 10px',
                    fontSize: '12px',
                    fontWeight: 600,
                  }}
                >
                  역 투표 게시판 이동
                </button>
              </StackFlow.Link>
            </div>
          ) : null}
        </section>

        <section style={sectionStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <strong>오늘의 투표</strong>
            <button
              type="button"
              onClick={() => {
                void dailyVoteTodayQuery.refetch();
              }}
              style={{
                border: 'none',
                background: 'transparent',
                color: '#2ACF6C',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              새로고침
            </button>
          </div>

          {dailyVoteTodayQuery.isLoading ? (
            <p style={{ marginTop: '10px', fontSize: '13px', color: '#6B7280' }}>
              오늘의 투표를 불러오는 중입니다.
            </p>
          ) : null}
          {dailyVoteTodayQuery.isError ? (
            <p style={{ marginTop: '10px', fontSize: '13px', color: '#B91C1C' }}>
              오늘의 투표를 불러오지 못했습니다.
            </p>
          ) : null}
          {!dailyVoteTodayQuery.isLoading && !dailyVoteTodayQuery.isError && polls.length === 0 ? (
            <p style={{ marginTop: '10px', fontSize: '13px', color: '#6B7280' }}>
              표시할 투표가 없습니다.
            </p>
          ) : null}

          <ul style={{ marginTop: '10px', display: 'grid', gap: '10px' }}>
            {polls.map(poll => (
              <li
                key={`daily-vote-hub-${poll.pollId}`}
                style={{
                  border: '1px solid #E5E7EB',
                  borderRadius: '10px',
                  background: '#F9FAFB',
                  padding: '10px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
                  <span style={{ fontSize: '12px', color: '#6B7280' }}>
                    {resolveContextLabel(poll.pollContext)} · {poll.subwayLineName}
                  </span>
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
                        color: '#2ACF6C',
                        fontSize: '12px',
                        cursor: 'pointer',
                      }}
                    >
                      댓글 전체 보기
                    </button>
                  </StackFlow.Link>
                </div>
                <p style={{ marginTop: '6px', fontSize: '14px', color: '#111827' }}>
                  {poll.question}
                </p>
                <ul style={{ marginTop: '8px', display: 'grid', gap: '6px' }}>
                  {poll.options.map(option => (
                    <li key={`${poll.pollId}-${option.optionCode}`}>
                      <button
                        type="button"
                        disabled={voteMutation.isPending}
                        onClick={() =>
                          voteMutation.mutate(
                            { pollId: poll.pollId, optionCode: option.optionCode },
                            {
                              onSuccess: async () => {
                                setActionErrorMessage(null);
                                await Promise.all([
                                  queryClient.invalidateQueries({
                                    queryKey: ['daily-vote', 'today'],
                                  }),
                                  queryClient.invalidateQueries({ queryKey: ['daily-vote'] }),
                                ]);
                              },
                              onError: error => {
                                setActionErrorMessage(
                                  resolveClientErrorMessage(error, '투표 처리에 실패했습니다.'),
                                );
                              },
                            },
                          )
                        }
                        style={{
                          width: '100%',
                          borderRadius: '8px',
                          border:
                            option.optionCode === poll.selectedOptionCode
                              ? '1px solid #2ACF6C'
                              : '1px solid #D1D5DB',
                          background:
                            option.optionCode === poll.selectedOptionCode ? '#2ACF6C' : '#fff',
                          color: option.optionCode === poll.selectedOptionCode ? '#fff' : '#111827',
                          padding: '8px 10px',
                          fontSize: '12px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          gap: '8px',
                          opacity: voteMutation.isPending ? 0.75 : 1,
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
                <p style={{ marginTop: '8px', fontSize: '12px', color: '#6B7280' }}>
                  총 참여 {poll.totalVoteCount}명
                </p>
              </li>
            ))}
          </ul>

          {actionErrorMessage ? (
            <p style={{ marginTop: '10px', fontSize: '13px', color: '#B91C1C' }}>
              {actionErrorMessage}
            </p>
          ) : null}
        </section>

        <section style={sectionStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <strong>댓글 한눈에 보기</strong>
            {previewPoll ? (
              <StackFlow.Link
                activityName="DailyVotePage"
                activityParams={{
                  pollId: previewPoll.pollId,
                  question: previewPoll.question,
                  stationName: previewPoll.stationName,
                }}
              >
                <button
                  type="button"
                  style={{
                    border: 'none',
                    background: 'transparent',
                    color: '#2ACF6C',
                    fontSize: '12px',
                    cursor: 'pointer',
                  }}
                >
                  전체 댓글
                </button>
              </StackFlow.Link>
            ) : null}
          </div>

          {!previewPoll ? (
            <p style={{ marginTop: '10px', fontSize: '13px', color: '#6B7280' }}>
              댓글을 미리 볼 투표가 없습니다.
            </p>
          ) : null}
          {previewPoll && previewCommentsQuery.isLoading ? (
            <p style={{ marginTop: '10px', fontSize: '13px', color: '#6B7280' }}>
              댓글을 불러오는 중입니다.
            </p>
          ) : null}
          {previewPoll && previewCommentsQuery.isError ? (
            <p style={{ marginTop: '10px', fontSize: '13px', color: '#B91C1C' }}>
              댓글을 불러오지 못했습니다.
            </p>
          ) : null}
          {previewPoll &&
          !previewCommentsQuery.isLoading &&
          !previewCommentsQuery.isError &&
          previewComments.length === 0 ? (
            <p style={{ marginTop: '10px', fontSize: '13px', color: '#6B7280' }}>
              아직 등록된 댓글이 없습니다.
            </p>
          ) : null}

          <ul style={{ marginTop: '10px', display: 'grid', gap: '8px' }}>
            {previewComments.map(comment => (
              <li
                key={`daily-vote-comment-preview-${comment.commentId}`}
                style={{
                  border: '1px solid #E5E7EB',
                  borderRadius: '10px',
                  background: '#F9FAFB',
                  padding: '10px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700 }}>{comment.writer}</span>
                  <span style={{ fontSize: '12px', color: '#6B7280' }}>
                    {formatDisplayDate(comment.createdAt, { format: 'short' })}
                  </span>
                </div>
                <p
                  style={{
                    marginTop: '6px',
                    whiteSpace: 'pre-wrap',
                    fontSize: '13px',
                    color: '#111827',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {comment.content}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </LayoutComponent.Base>
  );
};

export default DailyVoteHubPage;
