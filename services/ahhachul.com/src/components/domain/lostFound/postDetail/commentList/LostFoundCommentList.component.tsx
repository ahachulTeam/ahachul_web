import { BookmarkIcon } from '@/assets/icons/system';
import { UiComponent } from '@/components';
import { useFetchLostFoundCommentList } from '@/services/lostFound';

import * as S from './LostFoundCommentList.styled';

interface LostFoundCommentListProps {
  id: number;
  commentCnt: number;
}

const LostFoundCommentList = ({ commentCnt, id }: LostFoundCommentListProps) => {
  return (
    <S.Section>
      <S.HeaderWrapper>
        <S.CommentCountWrapper>
          <span>댓글</span>
          <span>{commentCnt}</span>
        </S.CommentCountWrapper>
        <BookmarkIcon />
      </S.HeaderWrapper>
      <UiComponent.SuspenseQueryBoundary
        keys={[id]}
        errorFallback={props => <UiComponent.ErrorCommentList {...props} />}
        suspenseFallback={<UiComponent.CommentListSkeleton />}
      >
        <CommentListInner id={id} />
      </UiComponent.SuspenseQueryBoundary>
    </S.Section>
  );
};

const CommentListInner = ({ id }: Pick<LostFoundCommentListProps, 'id'>) => {
  const { data } = useFetchLostFoundCommentList(id);

  return <UiComponent.BaseCommentList commentsMap={data.comments} />;
};

export default LostFoundCommentList;
