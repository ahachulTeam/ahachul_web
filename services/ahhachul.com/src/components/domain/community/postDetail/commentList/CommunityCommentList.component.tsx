import { BookmarkIcon } from '@/assets/icons/system';
import { UiComponent } from '@/components';
import { useFetchCommunityCommentList } from '@/services/community';

import * as S from './CommunityCommentList.styled';

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
          <span>{commentCnt ?? 0}</span>
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
  const { data } = useFetchCommunityCommentList(id);

  return <UiComponent.BaseCommentList commentsMap={data.comments} />;
};

export default LostFoundCommentList;
