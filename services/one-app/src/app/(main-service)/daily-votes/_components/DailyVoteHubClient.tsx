'use client';

import { useMemo, useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';

import { formatDisplayDate } from '@ahhachul/utils';

import { localizePathname, type SupportedLocale } from '@/i18n';
import { fetchDailyVoteCommentsV2, fetchDailyVoteTodayV2, voteDailyPollV2 } from '@/lib/daily-vote';
import { resolveClientErrorMessage } from '@/lib/observability';
import type { DailyVotePollCard } from '@/types';

type Props = {
  locale: SupportedLocale;
  stationId?: number;
  stationName?: string;
  subwayLineId?: number;
  subwayLineName?: string;
};

function resolvePollContextLabel(context: DailyVotePollCard['pollContext']) {
  if (context === 'SCHOOL') {
    return '등하교';
  }
  return '출퇴근';
}

export default function DailyVoteHubClient({
  locale,
  stationId,
  stationName,
  subwayLineId,
  subwayLineName,
}: Props) {
  const queryClient = useQueryClient();
  const [actionErrorMessage, setActionErrorMessage] = useState<string | null>(null);

  const todayQuery = useQuery({
    queryKey: ['daily-vote', 'hub', 'today'],
    queryFn: () =>
      fetchDailyVoteTodayV2({
        timezone: 'Asia/Seoul',
      }),
  });

  const polls = useMemo(() => {
    const result = todayQuery.data;
    if (!result) {
      return [] as DailyVotePollCard[];
    }

    return [result.primaryPoll, result.secondaryPoll].filter(
      (poll): poll is DailyVotePollCard => poll != null,
    );
  }, [todayQuery.data]);

  const previewPoll = polls[0] ?? null;

  const previewCommentsQuery = useQuery({
    queryKey: ['daily-vote', 'hub', 'comments-preview', previewPoll?.pollId ?? 0],
    enabled: previewPoll != null,
    queryFn: () => fetchDailyVoteCommentsV2(previewPoll?.pollId ?? 0, 'latest'),
  });

  const voteMutation = useMutation({
    mutationFn: ({ pollId, optionCode }: { pollId: number; optionCode: 'LIKE' | 'DISLIKE' }) =>
      voteDailyPollV2(pollId, { optionCode }),
    onSuccess: async () => {
      setActionErrorMessage(null);
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['daily-vote'] }),
        queryClient.invalidateQueries({ queryKey: ['home', 'daily-vote', 'today'] }),
      ]);
    },
    onError: error => {
      setActionErrorMessage(resolveClientErrorMessage(error, '투표 처리에 실패했습니다.'));
    },
  });

  const buildDailyVoteDetailHref = (pollId: number, question: string, stationNameValue: string) => {
    const search = new URLSearchParams();
    search.set('question', question);
    search.set('stationName', stationNameValue);
    return `${localizePathname(`/daily-votes/${pollId}`, locale)}?${search.toString()}`;
  };

  const buildDailyVoteStationBoardHref = (
    stationIdValue: number,
    stationNameValue?: string,
    subwayLineIdValue?: number,
    subwayLineNameValue?: string,
  ) => {
    const search = new URLSearchParams();
    if (stationNameValue) {
      search.set('stationName', stationNameValue);
    }
    if (typeof subwayLineIdValue === 'number' && Number.isFinite(subwayLineIdValue)) {
      search.set('subwayLineId', String(subwayLineIdValue));
    }
    if (subwayLineNameValue) {
      search.set('subwayLineName', subwayLineNameValue);
    }
    const query = search.toString();
    return query
      ? `${localizePathname(`/daily-votes/stations/${stationIdValue}`, locale)}?${query}`
      : localizePathname(`/daily-votes/stations/${stationIdValue}`, locale);
  };

  const stationBoardHref = (() => {
    const targetPoll = polls[0] ?? null;
    const targetStationId = targetPoll?.stationId ?? stationId;
    if (!targetStationId) {
      return null;
    }

    return buildDailyVoteStationBoardHref(
      targetStationId,
      targetPoll?.stationName ?? stationName,
      targetPoll?.subwayLineId ?? subwayLineId,
      targetPoll?.subwayLineName ?? subwayLineName,
    );
  })();

  const previewComments = previewCommentsQuery.data?.comments.slice(0, 5) ?? [];

  return (
    <main className="mx-auto min-h-screen w-full max-w-screen-md bg-white px-5 py-6 pb-24">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-title-large text-gray-100">투표 라운지</h1>
        <Link href={localizePathname('/', locale)} className="text-label-small text-key-color">
          홈으로
        </Link>
      </div>

      <section className="mt-3 rounded-2xl border border-gray-20 bg-gray-05 p-4">
        <p className="text-body-small text-gray-80">
          홈에서는 요약만 보고, 이 화면에서 투표와 댓글 참여를 진행합니다.
        </p>
        {stationBoardHref ? (
          <Link
            href={stationBoardHref}
            className="mt-3 inline-flex h-8 items-center rounded-lg border border-key-color px-3 text-label-small text-key-color"
          >
            역 투표 게시판 이동
          </Link>
        ) : null}
      </section>

      <section className="mt-3 rounded-2xl border border-gray-20 bg-white p-4">
        <div className="flex items-center justify-between gap-2">
          <p className="text-label-large text-gray-100">오늘의 투표</p>
          <button
            type="button"
            className="text-label-small text-key-color"
            onClick={() => {
              void todayQuery.refetch();
            }}
          >
            새로고침
          </button>
        </div>

        {todayQuery.isPending ? (
          <p className="mt-3 text-body-small text-gray-70">오늘의 투표를 불러오는 중입니다.</p>
        ) : null}
        {todayQuery.isError ? (
          <p className="mt-3 text-body-small text-danger">오늘의 투표를 불러오지 못했습니다.</p>
        ) : null}
        {!todayQuery.isPending && !todayQuery.isError && polls.length === 0 ? (
          <p className="mt-3 text-body-small text-gray-70">표시할 투표가 없습니다.</p>
        ) : null}

        <ul className="mt-3 space-y-3">
          {polls.map(poll => (
            <li
              key={`daily-vote-hub-${poll.pollId}`}
              className="rounded-xl border border-gray-20 bg-gray-05 p-3"
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-label-small text-gray-70">
                  {resolvePollContextLabel(poll.pollContext)} · {poll.subwayLineName}
                </p>
                <Link
                  href={buildDailyVoteDetailHref(poll.pollId, poll.question, poll.stationName)}
                  className="text-label-small text-key-color"
                >
                  댓글 전체 보기
                </Link>
              </div>
              <p className="mt-2 text-body-small text-gray-100">{poll.question}</p>
              <ul className="mt-2 grid grid-cols-1 gap-2">
                {poll.options.map(option => (
                  <li key={`${poll.pollId}-${option.optionCode}`}>
                    <button
                      type="button"
                      disabled={voteMutation.isPending}
                      onClick={() =>
                        voteMutation.mutate({
                          pollId: poll.pollId,
                          optionCode: option.optionCode,
                        })
                      }
                      className={
                        option.optionCode === poll.selectedOptionCode
                          ? 'flex w-full items-center justify-between rounded-lg border border-key-color bg-key-color px-3 py-2 text-left text-label-small text-white'
                          : 'flex w-full items-center justify-between rounded-lg border border-gray-30 bg-white px-3 py-2 text-left text-label-small text-gray-90'
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
              <p className="mt-2 text-label-small text-gray-70">총 참여 {poll.totalVoteCount}명</p>
            </li>
          ))}
        </ul>

        {actionErrorMessage ? (
          <p className="mt-3 text-body-small text-danger">{actionErrorMessage}</p>
        ) : null}

        {todayQuery.data?.stationDiary?.visible ? (
          <article className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50 p-3">
            <div className="flex items-center justify-between gap-2">
              <p className="text-label-small text-emerald-700">오늘의 역 일기 오픈</p>
              <Link
                href={buildDailyVoteDetailHref(
                  todayQuery.data.stationDiary.pollId,
                  todayQuery.data.stationDiary.question,
                  todayQuery.data.stationDiary.stationName,
                )}
                className="text-label-small text-emerald-700 underline"
              >
                작성/보기
              </Link>
            </div>
            <p className="mt-1 text-body-small text-emerald-900">
              {todayQuery.data.stationDiary.question}
            </p>
          </article>
        ) : null}
      </section>

      <section className="mt-3 rounded-2xl border border-gray-20 bg-white p-4">
        <div className="flex items-center justify-between gap-2">
          <p className="text-label-large text-gray-100">댓글 한눈에 보기</p>
          {previewPoll ? (
            <Link
              href={buildDailyVoteDetailHref(
                previewPoll.pollId,
                previewPoll.question,
                previewPoll.stationName,
              )}
              className="text-label-small text-key-color"
            >
              전체 댓글
            </Link>
          ) : null}
        </div>

        {!previewPoll ? (
          <p className="mt-3 text-body-small text-gray-70">댓글을 미리 볼 투표가 없습니다.</p>
        ) : null}
        {previewPoll && previewCommentsQuery.isPending ? (
          <p className="mt-3 text-body-small text-gray-70">댓글을 불러오는 중입니다.</p>
        ) : null}
        {previewPoll && previewCommentsQuery.isError ? (
          <p className="mt-3 text-body-small text-danger">댓글을 불러오지 못했습니다.</p>
        ) : null}
        {previewPoll &&
        !previewCommentsQuery.isPending &&
        !previewCommentsQuery.isError &&
        previewComments.length === 0 ? (
          <p className="mt-3 text-body-small text-gray-70">아직 등록된 댓글이 없습니다.</p>
        ) : null}

        {previewPoll && previewComments.length > 0 ? (
          <ul className="mt-3 space-y-2">
            {previewComments.map(comment => (
              <li
                key={`daily-vote-preview-comment-${comment.commentId}`}
                className="rounded-xl border border-gray-20 bg-gray-05 p-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-label-small text-gray-100">{comment.writer}</p>
                  <p className="text-label-small text-gray-70">
                    {formatDisplayDate(comment.createdAt, { format: 'short' })}
                  </p>
                </div>
                <p className="mt-1 line-clamp-2 whitespace-pre-wrap text-body-small text-gray-90">
                  {comment.content}
                </p>
                <p className="mt-1 text-label-small text-gray-70">좋아요 {comment.likeCount}</p>
              </li>
            ))}
          </ul>
        ) : null}
      </section>
    </main>
  );
}
