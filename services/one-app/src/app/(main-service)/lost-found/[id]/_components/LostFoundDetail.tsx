'use client';

import { useMemo, useState, type ReactNode } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { QUERY_GC_TIME, QUERY_STALE_TIME, lostFoundQueryKeys, myQueryKeys } from '@ahhachul/domain';
import { extractTextFromLexical, formatDisplayDate } from '@ahhachul/utils';

import { getMyProfile } from '@/app/(main-service)/me/_lib/getMyProfile';
import { BaseCommentList, CommentTextField } from '@/components/Comment';
import { ReadonlyEditor } from '@/components/Editor';
import { getLocaleMessages, localizePathname, resolvePathLocale } from '@/i18n';
import { AuthService } from '@/lib/auth-service';
import type { Comment } from '@/types';
import { cn, isLexicalContent } from '@/utils';

import { Lost112ArticleTable } from './Lost112ArticleTable';
import { LostTypeBadge } from './LostTypeBadge';
import { RecommendArticles } from './RecommendArticles';

import {
  createLostFoundComment,
  deleteLostFoundComment,
  getLostFoundComments,
  updateLostFoundComment,
} from '../_lib/getComments';
import { getLostFoundDetailPost } from '../_lib/getDetailPost';

type Props = {
  id: number;
};

type ComposerMode = 'create' | 'reply' | 'edit';

function resolveMemberId(createdBy: string | undefined) {
  const memberId = Number(createdBy);
  return Number.isFinite(memberId) ? memberId : null;
}

export default function LostFoundPostDetail({ id }: Props) {
  const pathname = usePathname() ?? '/lost-found';
  const locale = resolvePathLocale(pathname, null);
  const messages = getLocaleMessages(locale);
  const detailCopy = messages.lostFoundDetail;
  const commentCopy = messages.communityDetail;
  const commonCopy = messages.common;
  const queryClient = useQueryClient();

  const [composerMode, setComposerMode] = useState<ComposerMode>('create');
  const [targetComment, setTargetComment] = useState<Comment | null>(null);
  const [draftContent, setDraftContent] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { data: post } = useQuery({
    queryKey: lostFoundQueryKeys.detail(id),
    queryFn: getLostFoundDetailPost,
    staleTime: QUERY_STALE_TIME.detail,
    gcTime: QUERY_GC_TIME.detail,
    select: res => res.result,
  });

  const commentsQuery = useQuery({
    queryKey: lostFoundQueryKeys.comments(id),
    queryFn: getLostFoundComments,
    staleTime: QUERY_STALE_TIME.detail,
    gcTime: QUERY_GC_TIME.detail,
    select: res => res.result.comments,
  });

  const profileQuery = useQuery({
    queryKey: myQueryKeys.profile(),
    queryFn: getMyProfile,
    staleTime: QUERY_STALE_TIME.user,
    enabled: AuthService.isLoggedIn,
  });

  const currentMemberId = profileQuery.data?.result.memberId ?? null;
  const articleAuthorId = resolveMemberId(post?.createdBy);
  const canEditPost =
    currentMemberId !== null && articleAuthorId !== null && articleAuthorId === currentMemberId;

  if (!post) return null;

  const invalidateCommentQueries = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: lostFoundQueryKeys.comments(id) }),
      queryClient.invalidateQueries({ queryKey: lostFoundQueryKeys.detail(id) }),
    ]);
  };

  const resetComposer = () => {
    setComposerMode('create');
    setTargetComment(null);
    setDraftContent('');
    setIsPrivate(false);
    setSubmitError(null);
  };

  const createMutation = useMutation({
    mutationFn: (request: {
      content: string;
      upperCommentId?: number | null;
      isPrivate?: boolean;
    }) => createLostFoundComment(id, request),
    onSuccess: async () => {
      resetComposer();
      await invalidateCommentQueries();
    },
    onError: () => {
      setSubmitError(commentCopy.createError);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ commentId, content }: { commentId: number; content: string }) =>
      updateLostFoundComment(id, commentId, content),
    onSuccess: async () => {
      resetComposer();
      await invalidateCommentQueries();
    },
    onError: () => {
      setSubmitError(commentCopy.updateError);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (commentId: number) => deleteLostFoundComment(id, commentId),
    onSuccess: async (_, deletedCommentId) => {
      if (targetComment?.id === deletedCommentId) {
        resetComposer();
      }
      await invalidateCommentQueries();
    },
    onError: () => {
      setSubmitError(commentCopy.deleteError);
    },
  });

  const isMutating =
    createMutation.isPending || updateMutation.isPending || deleteMutation.isPending;
  const commentThreads = commentsQuery.data ?? [];
  const commentCount =
    commentThreads.reduce((count, thread) => count + 1 + thread.childComments.length, 0) ||
    post.commentCnt;
  const commentTitle = commentCopy.commentCount.replace('{count}', String(commentCount));

  const handleReply = (comment: Comment) => {
    setComposerMode('reply');
    setTargetComment(comment);
    setDraftContent('');
    setIsPrivate(false);
    setSubmitError(null);
  };

  const handleEdit = (comment: Comment) => {
    setComposerMode('edit');
    setTargetComment(comment);
    setDraftContent(
      isLexicalContent(comment.content)
        ? extractTextFromLexical(comment.content, '')
        : comment.content,
    );
    setIsPrivate(comment.isPrivate ?? false);
    setSubmitError(null);
  };

  const handleDelete = (comment: Comment) => {
    if (!window.confirm(commentCopy.deleteConfirm)) {
      return;
    }

    deleteMutation.mutate(comment.id);
  };

  const handleSubmitComment = () => {
    const normalizedContent = draftContent.trim();

    if (!normalizedContent) {
      setSubmitError(commentCopy.emptyContentError);
      return;
    }

    setSubmitError(null);

    if (composerMode === 'edit' && targetComment) {
      updateMutation.mutate({ commentId: targetComment.id, content: normalizedContent });
      return;
    }

    if (composerMode === 'reply' && targetComment) {
      createMutation.mutate({
        upperCommentId: targetComment.id,
        content: normalizedContent,
      });
      return;
    }

    createMutation.mutate({
      upperCommentId: null,
      content: normalizedContent,
      isPrivate,
    });
  };

  const commentFieldPlaceholder = (() => {
    if (composerMode === 'edit') {
      return commentCopy.editPlaceholder;
    }

    if (composerMode === 'reply') {
      return commentCopy.replyPlaceholder.replace(
        '{writer}',
        targetComment?.writer ?? commonCopy.lost112Writer,
      );
    }

    return commentCopy.createPlaceholder.replace(
      '{writer}',
      post.writer || commonCopy.lost112Writer,
    );
  })();

  const submitLabel = composerMode === 'edit' ? commentCopy.save : commentCopy.submit;
  const commentCardCopy = useMemo(
    () => ({
      deleted: commentCopy.deleted,
      privateHidden: commentCopy.privateHidden,
      reply: commentCopy.reply,
      edit: commentCopy.edit,
      delete: commentCopy.delete,
    }),
    [commentCopy],
  );

  let commentContent: ReactNode;
  if (commentsQuery.isPending) {
    commentContent = (
      <p className="px-5 pb-8 text-body-medium text-gray-70">{commentCopy.loading}</p>
    );
  } else if (commentsQuery.isError) {
    commentContent = (
      <div className="px-5 pb-8">
        <p className="text-body-medium text-red">{commentCopy.loadError}</p>
        <button
          type="button"
          className="mt-2 rounded-lg border border-gray-40 px-3 py-1 text-label-small text-gray-90"
          onClick={() => {
            void commentsQuery.refetch();
          }}
        >
          {commentCopy.retry}
        </button>
      </div>
    );
  } else {
    commentContent = (
      <BaseCommentList
        commentsMap={commentThreads}
        currentMemberId={currentMemberId}
        articleAuthorId={articleAuthorId}
        disabledActions={isMutating}
        copy={commentCardCopy}
        onReply={handleReply}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    );
  }

  return (
    <>
      <article>
        <div className=" pt-5 px-5">
          <LostTypeBadge lostFoundType={post.lostType} />
          <div className=" text-title-large text-gray-90 line-clamp-2 pt-[13px] pb-4">
            {post.title}
          </div>
          <div className=" w-full flex items-center justify-between pb-4 border-b border-b-gray-20">
            <div className=" flex items-center gap-1 text-body-medium">
              <span className=" text-gray-80">{post.writer || commonCopy.lost112Writer}</span>
              <span className=" text-gray-70">{formatDisplayDate(post.createdAt!)}</span>
            </div>
            {canEditPost ? (
              <div className=" flex items-center text-gray-90 text-label-medium font-regular">
                <Link
                  href={localizePathname(`/lost-found/${id}/edit`, locale)}
                  className="inline-flex h-8 items-center rounded-lg border border-gray-40 px-3 text-body-small text-gray-90"
                >
                  {detailCopy.edit}
                </Link>
              </div>
            ) : null}
          </div>
        </div>
        {post.isFromLost112 && (
          <>
            <div className=" px-5 flex items-center h-14 w-full gap-2">
              <Image
                src="/images/lost112.png"
                alt="lost112-image"
                width={24}
                height={24}
                priority
              />
              <span className=" text-gray-90 text-label-medium">{detailCopy.fromLost112}</span>
            </div>
            <Lost112ArticleTable post={post} />
          </>
        )}
        <div className=" px-5">
          {isLexicalContent(post.content) ? (
            <ReadonlyEditor
              content={post.content}
              className={cn('px-0', 'py-6', '[&>div>div]:p-0', '[&>div>div]:border-none')}
            />
          ) : (
            <p className=" py-6 mb-3 text-body-large-semi text-gray-90">{post.content}</p>
          )}
        </div>
      </article>

      <RecommendArticles posts={post.recommendPosts} />
      <section className="border-t border-t-gray-20">
        <div className="px-5 py-4 text-label-large text-gray-100">{commentTitle}</div>
        {commentContent}
      </section>

      <CommentTextField
        placeholder={commentFieldPlaceholder}
        value={draftContent}
        onChange={setDraftContent}
        onSubmit={handleSubmitComment}
        onCancel={resetComposer}
        submitLabel={submitLabel}
        cancelLabel={commentCopy.cancel}
        privateLabel={commentCopy.privateLabel}
        pendingLabel={commentCopy.pending}
        isSubmitting={isMutating}
        isPrivate={isPrivate}
        onPrivateChange={setIsPrivate}
        showPrivateToggle={composerMode === 'create'}
        errorMessage={submitError}
      />
    </>
  );
}
