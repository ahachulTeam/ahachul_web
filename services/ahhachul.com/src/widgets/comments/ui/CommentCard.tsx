import React from 'react';
import { Flex } from '@ahhachul/react-components-layout';
import { LikeIcon } from 'widgets/articles/static/icons/like';
import { EllipsisIcon } from 'shared/static/icons/ellipsis';
import type { Comment } from 'features/comments/model';
import * as styles from './CommentCard.css';

interface CommentCardProps {
  comment: Comment;
  asChild?: boolean;
}
export const CommentCard = ({ comment, asChild = false }: CommentCardProps) => {
  const content =
    comment.status === 'DELETED' ? '삭제된 댓글입니다' : comment.content;

  return (
    <Flex as="li" direction="column" css={styles.wrap(asChild)}>
      <Flex as="article" direction="column" >
        <Flex justify="space-between" align="center">
          <span css={styles.name}>{comment.writer}</span>
          <EllipsisIcon />
        </Flex>
        <p css={styles.body}>{content}</p>
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
