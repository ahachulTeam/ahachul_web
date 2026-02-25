import { useMemo } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import type { ActivityComponentType } from '@stackflow/react';
import { useQueryClient } from '@tanstack/react-query';

import type { ApiServicePath } from '@ahhachul/http';
import { formatDisplayDate, sleep } from '@ahhachul/utils';

import { LayoutComponent, UiComponent } from '@/components';
import { CommentInput } from '@/components/common';
import Comment from '@/components/common/comment/commentListItem/CommentListItem.component';
import { usePostComment } from '@/services/comment';
import { useTempComment } from '@/stores/comment';
import type { WithPostId } from '@/types';

const NewCommentReplyPage: ActivityComponentType<
  { commentId: number; queryKey: readonly unknown[]; servicePath: ApiServicePath } & WithPostId
> = ({
  params: { id, commentId, queryKey, servicePath },
}: {
  params: {
    commentId: number;
    queryKey: readonly unknown[];
    servicePath: ApiServicePath;
  } & WithPostId;
}) => {
  const { tempComment } = useTempComment();

  const targetCommentMap = useMemo(
    () =>
      tempComment?.find(item => {
        return (
          item.parentComment.id === commentId ||
          item.childComments.some(child => child.id === commentId)
        );
      }),
    [tempComment, commentId],
  );

  const parentComment = targetCommentMap?.parentComment;
  const targetComment =
    parentComment?.id === commentId
      ? parentComment
      : targetCommentMap?.childComments.find(childComment => childComment.id === commentId);

  const { mutate } = usePostComment();
  const queryClient = useQueryClient();

  const submitComment = ({
    comment,
    imageUrls,
  }: {
    isPrivate: boolean;
    comment: string;
    imageUrls: string[];
  }) => {
    mutate(
      {
        postId: id,
        content: comment,
        upperCommentId: targetComment?.id || null,
        imageUrls,
        servicePath,
      },
      {
        onSuccess: async res => {
          queryClient.invalidateQueries({
            queryKey: queryKey,
          });

          await sleep(250);

          const comment = document.querySelector(`[data-comment-id="${res.result.id}"]`);
          if (comment) {
            comment.scrollIntoView({
              block: 'start',
              behavior: 'smooth',
            });
          }
        },
      },
    );
  };

  if (!targetComment) return <UiComponent.LoadingSpinner isWhite />;

  return (
    <LayoutComponent.Base>
      <ArticleWrapper>
        <ContentWrapper>
          <TitleWrapper>
            {targetComment?.writer}
            {targetComment?.isPrivate && (
              <span css={{ marginLeft: '3px', color: 'var(--ah-color-gray-70)', fontWeight: 400 }}>
                (비공개)
              </span>
            )}
          </TitleWrapper>
          <MetaInfoWrapper>
            <AuthorDateWrapper>
              <DateText>
                {formatDisplayDate(targetComment?.createdAt || '', { format: 'short' })}
              </DateText>
            </AuthorDateWrapper>
          </MetaInfoWrapper>
        </ContentWrapper>

        <ContentContainer>
          <LexicalContent>
            <UiComponent.ReadonlyEditor content={targetComment?.content || ''} />
          </LexicalContent>
        </ContentContainer>
      </ArticleWrapper>
      {targetCommentMap?.childComments?.map(childComment => (
        <Comment key={childComment.id} comment={childComment} />
      ))}
      <CommentInput
        shouldFocusOnMount
        onSubmit={submitComment}
        disablePrivateCheck={targetComment.isPrivate}
        placeholder={`${targetComment?.writer} 님에게 답글을 남겨주세요.`}
      />
      <Padding />
    </LayoutComponent.Base>
  );
};

const ArticleWrapper = styled.article`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[20]};
`;

const ContentWrapper = styled.div`
  padding: 20px 20px 24px;
`;

const TitleWrapper = styled.div`
  ${({ theme }) => css`
    ${theme.fonts.titleLarge};
    color: ${theme.colors.gray[90]};
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  `}
`;

const MetaInfoWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[20]};
`;

const AuthorDateWrapper = styled.div`
  ${({ theme }) => css`
    ${theme.fonts.bodyMedium};
    display: flex;
    align-items: center;
    gap: 4px;
  `}
`;

const DateText = styled.span`
  color: ${({ theme }) => theme.colors.gray[70]};
`;

const ContentContainer = styled.div`
  padding: 0 20px;
`;

const LexicalContent = styled.div`
  padding: 0 0 24px;

  & > div {
    padding: 0;
    & > div > div {
      padding: 0;
      border: none;
    }
  }
`;

const Padding = styled.div`
  width: 100%;
  height: 234px;
`;

export default NewCommentReplyPage;
