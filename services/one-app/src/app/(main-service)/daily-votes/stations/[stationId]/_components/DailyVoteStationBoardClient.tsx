'use client';

import { useMemo, useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';

import { formatDisplayDate } from '@ahhachul/utils';

import { localizePathname, type SupportedLocale } from '@/i18n';
import {
  createDailyVoteStationPollV2,
  deleteDailyVotePollV2,
  fetchDailyVoteStationPollsV2,
  voteDailyPollV2,
} from '@/lib/daily-vote';
import { resolveClientErrorMessage } from '@/lib/observability';

type Props = {
  locale: SupportedLocale;
  stationId: number;
  stationName?: string;
  subwayLineId?: number;
  subwayLineName?: string;
};

type PollSort = 'latest' | 'popular';

export default function DailyVoteStationBoardClient({
  locale,
  stationId,
  stationName,
  subwayLineId,
  subwayLineName,
}: Props) {
  const queryClient = useQueryClient();

  const [sort, setSort] = useState<PollSort>('latest');
  const [draftQuestion, setDraftQuestion] = useState('');
  const [submitErrorMessage, setSubmitErrorMessage] = useState<string | null>(null);
  const [actionErrorMessage, setActionErrorMessage] = useState<string | null>(null);

  const boardQueryKey = useMemo(
    () => ['daily-vote', 'station-polls', stationId, sort, subwayLineId] as const,
    [stationId, sort, subwayLineId],
  );

  const stationPollsQuery = useQuery({
    queryKey: boardQueryKey,
    enabled: stationId > 0,
    queryFn: () =>
      fetchDailyVoteStationPollsV2(stationId, {
        sort,
        limit: 50,
        ...(typeof subwayLineId === 'number' ? { subwayLineId } : {}),
      }),
  });

  const createPollMutation = useMutation({
    mutationFn: (payload: { question: string; subwayLineId?: number }) =>
      createDailyVoteStationPollV2(stationId, payload),
    onSuccess: async () => {
      setDraftQuestion('');
      setSubmitErrorMessage(null);
      await queryClient.invalidateQueries({ queryKey: ['daily-vote', 'station-polls', stationId] });
    },
    onError: error => {
      setSubmitErrorMessage(resolveClientErrorMessage(error, '투표 생성에 실패했습니다.'));
    },
  });

  const voteMutation = useMutation({
    mutationFn: (payload: { pollId: number; optionCode: 'LIKE' | 'DISLIKE' }) =>
      voteDailyPollV2(payload.pollId, { optionCode: payload.optionCode }),
    onSuccess: async () => {
      setActionErrorMessage(null);
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['daily-vote', 'station-polls', stationId] }),
        queryClient.invalidateQueries({ queryKey: ['home', 'daily-vote', 'today'] }),
      ]);
    },
    onError: error => {
      setActionErrorMessage(resolveClientErrorMessage(error, '투표 처리에 실패했습니다.'));
    },
  });

  const deletePollMutation = useMutation({
    mutationFn: (pollId: number) => deleteDailyVotePollV2(pollId),
    onSuccess: async () => {
      setActionErrorMessage(null);
      await queryClient.invalidateQueries({ queryKey: ['daily-vote', 'station-polls', stationId] });
    },
    onError: error => {
      setActionErrorMessage(resolveClientErrorMessage(error, '투표 삭제에 실패했습니다.'));
    },
  });

  const normalizedQuestionLength = draftQuestion.trim().length;
  const canSubmit = normalizedQuestionLength > 0;
  const polls = stationPollsQuery.data?.polls ?? [];
  const resolvedStationName =
    stationPollsQuery.data?.stationName || stationName || `역 ${stationId}`;

  const handleSubmit = () => {
    const question = draftQuestion.trim();
    if (!question) {
      setSubmitErrorMessage('질문을 입력해주세요.');
      return;
    }

    createPollMutation.mutate({
      question,
      ...(typeof subwayLineId === 'number' ? { subwayLineId } : {}),
    });
  };

  return (
    <main className="mx-auto min-h-screen w-full max-w-screen-md bg-white px-5 py-6 pb-24">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-title-large text-gray-100">역 투표 게시판</h1>
        <Link
          href={localizePathname('/daily-votes', locale)}
          className="text-label-small text-key-color"
        >
          라운지
        </Link>
      </div>

      <section className="mt-3 rounded-2xl border border-gray-20 bg-gray-05 p-4">
        <p className="text-label-small text-gray-70">
          {resolvedStationName}
          {subwayLineName ? ` · ${subwayLineName}` : ''}
        </p>
        <p className="mt-1 text-body-small text-gray-90">
          즐겨찾기한 역에 대해 자유롭게 투표 질문을 올리고, 좋아요/싫어요로 참여할 수 있어요.
        </p>
      </section>

      <section className="mt-3 rounded-2xl border border-gray-20 bg-white p-4">
        <p className="text-label-large text-gray-100">새 투표 올리기</p>
        <div className="mt-2 space-y-2">
          <input
            type="text"
            value={draftQuestion}
            onChange={event => setDraftQuestion(event.target.value.slice(0, 120))}
            placeholder="예: 오늘 안암역 환승 동선 괜찮으셨나요?"
            className="h-10 w-full rounded-lg border border-gray-30 px-3 text-body-small text-gray-100 outline-none focus:border-key-color"
          />
          <div className="flex items-center justify-between">
            <p className="text-label-small text-gray-70">{normalizedQuestionLength}/120</p>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!canSubmit || createPollMutation.isPending}
              className="rounded-lg border border-key-color bg-key-color px-3 py-1 text-label-small text-white disabled:opacity-60"
            >
              {createPollMutation.isPending ? '등록 중...' : '등록'}
            </button>
          </div>
          {submitErrorMessage ? (
            <p className="text-label-small text-danger">{submitErrorMessage}</p>
          ) : null}
        </div>
      </section>

      <section className="mt-3 rounded-2xl border border-gray-20 bg-white p-4">
        <div className="flex items-center justify-between">
          <p className="text-label-large text-gray-100">투표 목록</p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSort('latest')}
              className={
                sort === 'latest'
                  ? 'rounded-md border border-key-color bg-key-color px-2 py-1 text-label-small text-white'
                  : 'rounded-md border border-gray-40 px-2 py-1 text-label-small text-gray-90'
              }
            >
              최신순
            </button>
            <button
              type="button"
              onClick={() => setSort('popular')}
              className={
                sort === 'popular'
                  ? 'rounded-md border border-key-color bg-key-color px-2 py-1 text-label-small text-white'
                  : 'rounded-md border border-gray-40 px-2 py-1 text-label-small text-gray-90'
              }
            >
              인기순
            </button>
          </div>
        </div>

        {stationPollsQuery.isPending ? (
          <p className="mt-3 text-body-small text-gray-70">투표 목록을 불러오는 중입니다.</p>
        ) : null}
        {stationPollsQuery.isError ? (
          <p className="mt-3 text-body-small text-danger">
            {resolveClientErrorMessage(stationPollsQuery.error, '투표 목록을 불러오지 못했습니다.')}
          </p>
        ) : null}
        {!stationPollsQuery.isPending && !stationPollsQuery.isError && polls.length === 0 ? (
          <p className="mt-3 text-body-small text-gray-70">등록된 투표가 없습니다.</p>
        ) : null}

        <ul className="mt-3 space-y-3">
          {polls.map(poll => (
            <li key={poll.pollId} className="rounded-xl border border-gray-20 bg-gray-05 p-3">
              <div className="flex items-center justify-between gap-2">
                <p className="text-body-small text-gray-100">{poll.question}</p>
                <p className="text-label-small text-gray-70">
                  {formatDisplayDate(poll.createdAt, { format: 'short' })}
                </p>
              </div>
              <p className="mt-1 text-label-small text-gray-70">
                {poll.subwayLineName} · 댓글 {poll.commentCount}개 · 총 참여 {poll.totalVoteCount}명
              </p>
              <ul className="mt-2 space-y-2">
                {poll.options.map(option => (
                  <li key={`${poll.pollId}-${option.optionCode}`}>
                    <button
                      type="button"
                      className={
                        option.optionCode === poll.selectedOptionCode
                          ? 'flex w-full items-center justify-between rounded-lg border border-key-color bg-emerald-50 px-3 py-2 text-left text-label-small text-gray-100'
                          : 'flex w-full items-center justify-between rounded-lg border border-gray-30 bg-white px-3 py-2 text-left text-label-small text-gray-100'
                      }
                      disabled={voteMutation.isPending}
                      onClick={() =>
                        voteMutation.mutate({
                          pollId: poll.pollId,
                          optionCode: option.optionCode,
                        })
                      }
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
              <div className="mt-2 flex items-center justify-between">
                <Link
                  href={`${localizePathname(`/daily-votes/${poll.pollId}`, locale)}?${new URLSearchParams(
                    {
                      question: poll.question,
                      stationName: poll.stationName,
                    },
                  ).toString()}`}
                  className="text-label-small text-key-color"
                >
                  댓글 보기
                </Link>
                {poll.mine ? (
                  <button
                    type="button"
                    className="text-label-small text-danger disabled:text-gray-60"
                    disabled={deletePollMutation.isPending}
                    onClick={() => deletePollMutation.mutate(poll.pollId)}
                  >
                    삭제
                  </button>
                ) : null}
              </div>
            </li>
          ))}
        </ul>

        {actionErrorMessage ? (
          <p className="mt-2 text-label-small text-danger">{actionErrorMessage}</p>
        ) : null}
      </section>
    </main>
  );
}
