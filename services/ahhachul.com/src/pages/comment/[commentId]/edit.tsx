import { useMemo } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import type { ActivityComponentType } from '@stackflow/react';
import { useQueryClient } from '@tanstack/react-query';

import { formatDateTime, sleep } from '@ahhachul/utils';

import { LayoutComponent, UiComponent } from '@/components';
import { CommentInput } from '@/components/common';
import Comment from '@/components/common/comment/commentListItem/CommentListItem.component';
import { useUpdateComment } from '@/services/comment';
import { useFlow } from '@/stackflow';
import { useTempComment } from '@/stores/comment';
import type { WithPostId } from '@/types';

const EditCommentPage: ActivityComponentType<
  { commentId: number; queryKey: readonly unknown[] } & WithPostId
> = ({
  params: { commentId, queryKey },
}: {
  params: { commentId: number; queryKey: readonly unknown[] } & WithPostId;
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

  const { pop } = useFlow();
  const { mutate } = useUpdateComment();
  const queryClient = useQueryClient();

  const editComment = ({ comment }: { isPrivate: boolean; comment: string }) => {
    mutate(
      {
        commentId,
        content: comment,
      },
      {
        onSuccess: async () => {
          queryClient.invalidateQueries({
            queryKey: queryKey,
          });

          await sleep(250);
          pop();
        },
      },
    );
  };

  if (!targetComment) return <UiComponent.LoadingSpinner isWhite />;

  return (
    <LayoutComponent.Base>
      <ArticleWrapper>
        <ContentWrapper>
          <TitleWrapper>{targetComment?.writer}</TitleWrapper>
          <MetaInfoWrapper>
            <AuthorDateWrapper>
              <DateText>
                {formatDateTime(targetComment?.createdAt || '', { format: 'short' })}
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
        actionLabel="수정"
        shouldFocusOnMount
        onSubmit={editComment}
        initialState={targetComment.content}
        disablePrivateCheck={targetComment.isPrivate}
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

export default EditCommentPage;
