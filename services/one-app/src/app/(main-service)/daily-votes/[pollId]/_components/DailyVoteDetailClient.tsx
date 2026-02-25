'use client';

import { useMemo, useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';

import { formatDisplayDate } from '@ahhachul/utils';

import { CommentTextField } from '@/components/Comment';
import { localizePathname, type SupportedLocale } from '@/i18n';
import {
  createDailyVoteCommentV2,
  fetchDailyVoteCommentsV2,
  likeDailyVoteCommentV2,
  unlikeDailyVoteCommentV2,
} from '@/lib/daily-vote';

type Props = {
  locale: SupportedLocale;
  pollId: number;
  question?: string;
  stationName?: string;
};

type CommentSort = 'latest' | 'popular';

export default function DailyVoteDetailClient({ locale, pollId, question, stationName }: Props) {
  const queryClient = useQueryClient();
  const [sort, setSort] = useState<CommentSort>('latest');
  const [draftContent, setDraftContent] = useState('');
  const [draftImageUrls, setDraftImageUrls] = useState<string[]>([]);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const commentsQueryKey = useMemo(
    () => ['daily-vote', 'comments', pollId, sort] as const,
    [pollId, sort],
  );

  const commentsQuery = useQuery({
    queryKey: commentsQueryKey,
    queryFn: () => fetchDailyVoteCommentsV2(pollId, sort),
  });

  const createMutation = useMutation({
    mutationFn: (payload: { content: string; imageUrls: string[] }) =>
      createDailyVoteCommentV2(pollId, {
        content: payload.content,
        imageUrls: payload.imageUrls,
      }),
    onSuccess: async () => {
      setDraftContent('');
      setDraftImageUrls([]);
      setSubmitError(null);
      await queryClient.invalidateQueries({ queryKey: ['daily-vote', 'comments', pollId] });
    },
    onError: () => {
      setSubmitError('댓글 등록에 실패했습니다. 잠시 후 다시 시도해주세요.');
    },
  });

  const likeMutation = useMutation({
    mutationFn: async (payload: { commentId: number; likedByMe: boolean }) => {
      if (payload.likedByMe) {
        await unlikeDailyVoteCommentV2(payload.commentId);
      } else {
        await likeDailyVoteCommentV2(payload.commentId);
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['daily-vote', 'comments', pollId] });
    },
  });

  const handleSubmit = () => {
    const normalizedContent = draftContent.trim();
    if (!normalizedContent && draftImageUrls.length === 0) {
      setSubmitError('내용 또는 이미지 URL을 입력해주세요.');
      return;
    }

    createMutation.mutate({
      content: normalizedContent,
      imageUrls: draftImageUrls,
    });
  };

  const comments = commentsQuery.data?.comments ?? [];

  return (
    <main className="mx-auto min-h-screen w-full max-w-screen-md bg-white px-5 py-6 pb-[240px]">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-title-large text-gray-100">오늘의 이동 공감</h1>
        <Link href={localizePathname('/', locale)} className="text-label-small text-key-color">
          홈으로
        </Link>
      </div>

      <section className="mt-3 rounded-2xl border border-gray-20 bg-gray-05 p-4">
        <p className="text-label-small text-gray-70">
          {stationName ? `${stationName} · ` : ''}poll #{pollId}
        </p>
        <p className="mt-1 text-body-large-semi text-gray-100">
          {question?.trim() || '오늘의 이동 경험은 어떠셨나요?'}
        </p>
      </section>

      <section className="mt-3 rounded-2xl border border-gray-20 bg-white p-4">
        <div className="flex items-center justify-between">
          <p className="text-label-large text-gray-100">댓글 {comments.length}개</p>
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

        {commentsQuery.isPending ? (
          <p className="mt-3 text-body-small text-gray-70">댓글을 불러오는 중입니다.</p>
        ) : null}
        {commentsQuery.isError ? (
          <p className="mt-3 text-body-small text-danger">댓글을 불러오지 못했습니다.</p>
        ) : null}

        {!commentsQuery.isPending && !commentsQuery.isError && comments.length === 0 ? (
          <p className="mt-3 text-body-small text-gray-70">
            아직 댓글이 없습니다. 첫 댓글을 남겨보세요.
          </p>
        ) : null}

        <ul className="mt-3 space-y-3">
          {comments.map(comment => (
            <li key={comment.commentId} className="rounded-xl border border-gray-20 bg-gray-05 p-3">
              <div className="flex items-center justify-between gap-2">
                <p className="text-label-small text-gray-100">{comment.writer}</p>
                <p className="text-label-small text-gray-70">
                  {formatDisplayDate(comment.createdAt, { format: 'short' })}
                </p>
              </div>
              <p className="mt-2 whitespace-pre-wrap break-words text-body-small text-gray-90">
                {comment.content}
              </p>
              {comment.imageUrls.length > 0 ? (
                <ul className="mt-2 grid grid-cols-3 gap-2">
                  {comment.imageUrls.map(imageUrl => (
                    <li
                      key={`${comment.commentId}-${imageUrl}`}
                      className="overflow-hidden rounded-lg border border-gray-20"
                    >
                      <a href={imageUrl} target="_blank" rel="noreferrer">
                        <img
                          src={imageUrl}
                          alt="댓글 이미지"
                          className="h-24 w-full object-cover"
                          loading="lazy"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
              <button
                type="button"
                className="mt-2 text-label-small text-gray-80 disabled:text-gray-60"
                disabled={likeMutation.isPending}
                onClick={() =>
                  likeMutation.mutate({
                    commentId: comment.commentId,
                    likedByMe: comment.likedByMe,
                  })
                }
              >
                {comment.likedByMe ? '좋아요 취소' : '좋아요'} · {comment.likeCount}
              </button>
            </li>
          ))}
        </ul>
      </section>

      <CommentTextField
        placeholder="오늘 경험을 자유롭게 남겨주세요."
        value={draftContent}
        onChange={setDraftContent}
        imageUrls={draftImageUrls}
        onImageUrlsChange={setDraftImageUrls}
        showPrivateToggle={false}
        submitLabel="등록"
        cancelLabel="초기화"
        pendingLabel="등록 중..."
        isSubmitting={createMutation.isPending}
        onCancel={() => {
          setDraftContent('');
          setDraftImageUrls([]);
          setSubmitError(null);
        }}
        onSubmit={handleSubmit}
        errorMessage={submitError}
      />
    </main>
  );
}
