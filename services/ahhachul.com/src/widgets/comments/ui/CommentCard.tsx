import { useMemo } from 'react';

import { useFlow, useActivity } from 'app/stackflow';
import { useAuthStore } from 'entities/app-authentications/slice';
import { checkContentType } from 'features/articles/lib/check-content-type';
import { ArticleContentParser } from 'features/articles/ui/ArticleContentParser';
import type { Comment } from 'features/comments/model';
import { useGetUserInfo } from 'features/users/api';
import { formatDate } from 'shared/lib/utils/date/format-date';
import { LikeIcon } from 'widgets/articles/static/icons/like';

import * as styles from './CommentCard.css';
import { CommentDropEllipsis } from './CommentDropEllipsis';

interface CommentCardProps {
  comment: Comment;
  asChild?: boolean;
  showLikeBtn?: boolean;
  showEllipsis?: boolean;
}
export const CommentCard = ({
  comment,
  asChild = false,
  showLikeBtn = false,
  showEllipsis = true,
}: CommentCardProps) => {
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

  const isMyComment = useMemo(() => {
    if (!data) return false;
    if (comment.status === 'DELETED') return false;
    return data?.memberId === +comment.createdBy && showEllipsis;
  }, [data, comment, showEllipsis]);

  const { push } = useFlow();
  const handleReplyComment = () => {
    push('CommentInner', {
      commentId: comment.id,
      articleId: +articleId,
      from: 'LostFoundDetail',
      mode: 'reply',
    });
  };

  return (
    <li css={styles.wrap(asChild)}>
      <article style={{ display: 'flex', flexDirection: 'column' }}>
        <div css={styles.dropdownMenu}>
          <span css={styles.name}>{comment.writer}</span>
          {isMyComment && <CommentDropEllipsis articleId={articleId} commentId={comment.id} />}
        </div>

        {isPlainContent ? (
          <p css={styles.body}>{content}</p>
        ) : (
          <ArticleContentParser content={content} overrideCss={styles.articleCardContentParser} />
        )}
        <span css={styles.date}>{formatDate(comment.createdAt)}</span>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {!comment.upperCommentId && (
            <span css={styles.답글달기} onClick={handleReplyComment}>
              답글 달기
            </span>
          )}
          <div css={styles.like}>
            {showLikeBtn && (
              <>
                <LikeIcon />
                {comment?.likeCnt && <span>{comment.likeCnt}</span>}
              </>
            )}
          </div>
        </div>
      </article>
    </li>
  );
};
