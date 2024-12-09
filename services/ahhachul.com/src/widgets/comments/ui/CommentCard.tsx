import React from 'react';
import { css } from '@emotion/react';
import { Flex } from '@ahhachul/react-components-layout';
import { LikeIcon } from 'widgets/articles/static/icons/like';
import { EllipsisIcon } from 'shared/static/icons/ellipsis';
import type { Comment } from 'features/comments/model';
import { checkContentType } from 'features/articles/lib/check-content-type';
import { ArticleContentParser } from 'features/articles/ui/ArticleContentParser';
import * as styles from './CommentCard.css';

interface CommentCardProps {
  comment: Comment;
  asChild?: boolean;
}
export const CommentCard = ({ comment, asChild = false }: CommentCardProps) => {
  const content =
    comment.status === 'DELETED' ? '삭제된 댓글입니다' : comment.content;

  const contentType = checkContentType(comment.content);
  const isPlainContent = contentType !== 'json';

  return (
    <Flex as="li" direction="column" css={styles.wrap(asChild)}>
      <Flex as="article" direction="column">
        <Flex justify="space-between" align="center">
          <span css={styles.name}>{comment.writer}</span>
          <EllipsisIcon />
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
