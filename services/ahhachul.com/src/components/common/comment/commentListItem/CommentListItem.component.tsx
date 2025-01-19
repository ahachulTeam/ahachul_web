import { formatDateTime } from '@ahhachul/utils';

import { EllipsisIcon } from '@/assets/icons/system';
import { UiComponent } from '@/components';
import type { Comment } from '@/types';

import * as S from './CommentListItem.styled';

interface CommentCardProps {
  comment: Comment;
  asChild?: boolean;
}

const Comment = ({ comment, asChild = false }: CommentCardProps) => {
  return (
    <S.CommentWrapper asChild={asChild}>
      <S.HeaderWrapper>
        <S.WriterName>{comment.writer}</S.WriterName>
        <EllipsisIcon />
      </S.HeaderWrapper>
      <S.ContentWrapper>
        {comment.status === 'CREATED' ? (
          <UiComponent.ReadonlyEditor overrideCss={S.readonlyEditorCss} content={comment.content} />
        ) : (
          <S.DeletedComment>삭제된 댓글입니다.</S.DeletedComment>
        )}
        <S.DateText>{formatDateTime(comment.createdAt, { format: 'short' })}</S.DateText>
      </S.ContentWrapper>
      <S.ReplyButton>답글 달기</S.ReplyButton>
    </S.CommentWrapper>
  );
};

export default Comment;
