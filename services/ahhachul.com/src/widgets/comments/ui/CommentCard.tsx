import React, { useMemo } from 'react';
import { css } from '@emotion/react';
import { Flex } from '@ahhachul/react-components-layout';
import { LikeIcon } from 'widgets/articles/static/icons/like';
import type { Comment } from 'features/comments/model';
import { checkContentType } from 'features/articles/lib/check-content-type';
import { ArticleContentParser } from 'features/articles/ui/ArticleContentParser';
import { DropEllipsis } from './DropEllipsis';
import * as styles from './CommentCard.css';
import { useGetUserInfo } from 'features/users/api';
import { useDeleteComment } from 'pages/lost-found/api/post-comment';
import { useActivity } from '@stackflow/react';
import { useAuthStore } from 'entities/app-authentications/slice';

interface CommentCardProps {
  comment: Comment;
  asChild?: boolean;
}
export const CommentCard = ({ comment, asChild = false }: CommentCardProps) => {
  const {
    params: { articleId },
  } = useActivity();

  // TODO: 전반적으로 리팩터링 하기
  const isDeleted = comment.status === 'DELETED';
  const content = isDeleted ? '삭제된 댓글입니다' : comment.content;

  const contentType = checkContentType(content);
  const isPlainContent = contentType !== 'json';

  const { auth } = useAuthStore();
  const { data } = useGetUserInfo(auth);

  const thisCommentIsMine = useMemo(() => {
    if (!data) return false;
    if (comment.status === 'DELETED') return false;
    return data?.memberId === +comment.createdBy;
  }, [data, comment]);

  const { mutate: deleteComment } = useDeleteComment(+articleId);

  const COMMENT_OPTIONS = {
    UPDATE: {
      label: '수정',
      onClick: () => {
        alert('수정');
      },
    },
    DELETE: {
      label: '삭제',
      onClick: deleteComment,
    },
  } as const;

  return (
    <Flex as="li" direction="column" css={styles.wrap(asChild)}>
      <Flex as="article" direction="column">
        <Flex justify="space-between" align="center" css={styles.dropdownMenu}>
          <span css={styles.name}>{comment.writer}</span>
          {thisCommentIsMine && (
            <DropEllipsis commentId={comment.id} optionList={COMMENT_OPTIONS} />
          )}
        </Flex>

        {isPlainContent ? (
          <p css={styles.body}>{content}</p>
        ) : (
          <ArticleContentParser
            content={content}
            overrideCss={articleCardContentParser}
          />
        )}
        <Flex align="center" justify="space-between">
          <span css={styles.답글달기}>답글 달기</span>
          <div css={styles.like}>
            <LikeIcon />
            {comment?.likeCnt && <span>{comment.likeCnt}</span>}
          </div>
        </Flex>
      </Flex>
    </Flex>
  );
};

const articleCardContentParser = css`
  padding: 0;
  padding-right: 42px;
  margin-bottom: 4px !important;

  & > div {
    border: none;
  }

  .editor-input {
    min-height: unset !important;

    p {
      margin-bottom: 4px !important;
    }
  }
`;
