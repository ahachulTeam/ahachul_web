'use client';

import { useMemo, useState, type ReactNode } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';

import { QUERY_GC_TIME, QUERY_STALE_TIME, communityQueryKeys, myQueryKeys } from '@ahhachul/domain';
import { extractTextFromLexical, formatDisplayDate } from '@ahhachul/utils';

import { getMyProfile } from '@/app/(main-service)/me/_lib/getMyProfile';
import { BaseCommentList, CommentTextField } from '@/components/Comment';
import { ReadonlyEditor } from '@/components/Editor';
import { getLocaleMessages, resolvePathLocale } from '@/i18n';
import {
  bookmarkCommunityPost,
  likeCommunityPost,
  unbookmarkCommunityPost,
  unlikeCommunityPost,
} from '@/lib/article-reactions';
import { AuthService } from '@/lib/auth-service';
import type { Comment } from '@/types';
import { cn, isLexicalContent } from '@/utils';

import { CommunityTypeBadge } from './CommunityTypeBadge';

import {
  createCommunityComment,
  deleteCommunityComment,
  getCommunityComments,
  updateCommunityComment,
} from '../_lib/getComments';
import { getCommunityDetailPost } from '../_lib/getDetailPost';

type Props = {
  id: number;
};

type ComposerMode = 'create' | 'reply' | 'edit';

function resolveMemberId(createdBy: string | undefined) {
  const memberId = Number(createdBy);
  return Number.isFinite(memberId) ? memberId : null;
}

export default function CommunityPostDetail({ id }: Props) {
  const pathname = usePathname() ?? '/community';
  const locale = resolvePathLocale(pathname, null);
  const messages = getLocaleMessages(locale);
  const copy = messages.communityDetail;
  const commonCopy = messages.common;
  const queryClient = useQueryClient();

  const [composerMode, setComposerMode] = useState<ComposerMode>('create');
  const [targetComment, setTargetComment] = useState<Comment | null>(null);
  const [draftContent, setDraftContent] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { data: post } = useQuery({
    queryKey: communityQueryKeys.detail(id),
    queryFn: getCommunityDetailPost,
    staleTime: QUERY_STALE_TIME.detail,
    gcTime: QUERY_GC_TIME.detail,
    select: res => res.result,
  });

  const commentsQuery = useQuery({
    queryKey: communityQueryKeys.comments(id),
    queryFn: getCommunityComments,
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
  const isLoggedIn = AuthService.isLoggedIn;

  const currentMemberId = profileQuery.data?.result.memberId ?? null;
  const articleAuthorId = resolveMemberId(post?.createdBy);

  const invalidateCommentQueries = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: communityQueryKeys.comments(id) }),
      queryClient.invalidateQueries({ queryKey: communityQueryKeys.detail(id) }),
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
    }) => createCommunityComment(id, request),
    onSuccess: async () => {
      resetComposer();
      await invalidateCommentQueries();
    },
    onError: () => {
      setSubmitError(copy.createError);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ commentId, content }: { commentId: number; content: string }) =>
      updateCommunityComment(id, commentId, content),
    onSuccess: async () => {
      resetComposer();
      await invalidateCommentQueries();
    },
    onError: () => {
      setSubmitError(copy.updateError);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (commentId: number) => deleteCommunityComment(id, commentId),
    onSuccess: async (_, deletedCommentId) => {
      if (targetComment?.id === deletedCommentId) {
        resetComposer();
      }
      await invalidateCommentQueries();
    },
    onError: () => {
      setSubmitError(copy.deleteError);
    },
  });

  const likeMutation = useMutation({
    mutationFn: () => (post?.likeYn === 'Y' ? unlikeCommunityPost(id) : likeCommunityPost(id)),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: communityQueryKeys.detail(id) });
      await queryClient.invalidateQueries({ queryKey: communityQueryKeys.list() });
    },
  });

  const bookmarkMutation = useMutation({
    mutationFn: () =>
      post?.bookmarkYn === 'Y' ? unbookmarkCommunityPost(id) : bookmarkCommunityPost(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: communityQueryKeys.detail(id) });
    },
  });

  if (!post) return null;

  const isMutating =
    createMutation.isPending || updateMutation.isPending || deleteMutation.isPending;
  const commentThreads = commentsQuery.data ?? [];
  const commentCount =
    commentThreads.reduce((count, thread) => count + 1 + thread.childComments.length, 0) ||
    post.commentCnt;
  const commentTitle = copy.commentCount.replace('{count}', String(commentCount));

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
    if (!window.confirm(copy.deleteConfirm)) {
      return;
    }

    deleteMutation.mutate(comment.id);
  };

  const handleSubmitComment = () => {
    const normalizedContent = draftContent.trim();

    if (!normalizedContent) {
      setSubmitError(copy.emptyContentError);
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
      return copy.editPlaceholder;
    }

    if (composerMode === 'reply') {
      return copy.replyPlaceholder.replace(
        '{writer}',
        targetComment?.writer ?? commonCopy.lost112Writer,
      );
    }

    return copy.createPlaceholder.replace('{writer}', post.writer || commonCopy.lost112Writer);
  })();

  const submitLabel = composerMode === 'edit' ? copy.save : copy.submit;
  const commentCardCopy = useMemo(
    () => ({
      deleted: copy.deleted,
      privateHidden: copy.privateHidden,
      reply: copy.reply,
      edit: copy.edit,
      delete: copy.delete,
    }),
    [copy],
  );

  let commentContent: ReactNode;
  if (commentsQuery.isPending) {
    commentContent = <p className="px-5 pb-8 text-body-medium text-gray-70">{copy.loading}</p>;
  } else if (commentsQuery.isError) {
    commentContent = (
      <div className="px-5 pb-8">
        <p className="text-body-medium text-red">{copy.loadError}</p>
        <button
          type="button"
          className="mt-2 rounded-lg border border-gray-40 px-3 py-1 text-label-small text-gray-90"
          onClick={() => {
            void commentsQuery.refetch();
          }}
        >
          {copy.retry}
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
        <div className="pt-5 px-5">
          <CommunityTypeBadge communityType={post.categoryType} />
          <div className="text-title-large text-gray-90 line-clamp-2 pb-4 pt-[13px]">
            {post.title}
          </div>
          <div className="flex w-full items-center justify-between border-b border-b-gray-20 pb-4">
            <div className="flex items-center gap-1 text-body-medium">
              <span className="text-gray-80">{post.writer || commonCopy.lost112Writer}</span>
              <span className="text-gray-70">{formatDisplayDate(post.createdAt!)}</span>
            </div>
            <div className="flex items-center text-label-medium font-regular text-gray-90">
              {/* SUBWAY ICON */}
            </div>
          </div>
        </div>

        <div className="px-5">
          {isLexicalContent(post.content) ? (
            <ReadonlyEditor
              content={post.content}
              className={cn('px-0', 'py-6', '[&>div>div]:border-none', '[&>div>div]:p-0')}
            />
          ) : (
            <p className="mb-3 py-6 text-body-large-semi text-gray-90">{post.content}</p>
          )}
        </div>

        <div className="flex items-center gap-2 border-t border-t-gray-20 px-5 py-3">
          <button
            type="button"
            onClick={() => {
              if (!isLoggedIn) {
                window.alert(copy.loginRequired);
                return;
              }
              likeMutation.mutate();
            }}
            disabled={likeMutation.isPending}
            className="rounded-lg border border-gray-30 px-3 py-1 text-body-small text-gray-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {post.likeYn === 'Y' ? '좋아요 취소' : '좋아요'} · {post.likeCnt}
          </button>
          <button
            type="button"
            onClick={() => {
              if (!isLoggedIn) {
                window.alert(copy.loginRequired);
                return;
              }
              bookmarkMutation.mutate();
            }}
            disabled={bookmarkMutation.isPending}
            className="rounded-lg border border-gray-30 px-3 py-1 text-body-small text-gray-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {post.bookmarkYn === 'Y' ? '북마크 취소' : '북마크'} · {post.bookmarkCnt}
          </button>
        </div>
      </article>

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
        cancelLabel={copy.cancel}
        privateLabel={copy.privateLabel}
        pendingLabel={copy.pending}
        isSubmitting={isMutating}
        isPrivate={isPrivate}
        onPrivateChange={setIsPrivate}
        showPrivateToggle={composerMode === 'create'}
        errorMessage={submitError}
      />
    </>
  );
}
