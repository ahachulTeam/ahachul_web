// import { BookmarkIcon } from '@/assets/icons/system';
import { UiComponent } from '@/components';
import { lostFoundKeys, useFetchLostFoundCommentList } from '@/services/lostFound';

import * as S from './LostFoundCommentList.styled';

interface LostFoundCommentListProps {
  id: number;
  commentCnt: number;
  isArticleAuthor: boolean;
}

const LostFoundCommentList = ({ commentCnt, id, isArticleAuthor }: LostFoundCommentListProps) => {
  return (
    <S.Section>
      <S.HeaderWrapper>
        <S.CommentCountWrapper>
          <span>댓글</span>
          <span>{commentCnt ?? 0}</span>
        </S.CommentCountWrapper>
        {/* <BookmarkIcon /> */}
      </S.HeaderWrapper>
      <UiComponent.SuspenseQueryBoundary
        keys={[id]}
        errorFallback={props => <UiComponent.ErrorCommentList {...props} />}
        suspenseFallback={<UiComponent.CommentListSkeleton />}
      >
        <CommentListInner id={id} isArticleAuthor={isArticleAuthor} />
      </UiComponent.SuspenseQueryBoundary>
    </S.Section>
  );
};

const CommentListInner = ({
  id,
  isArticleAuthor,
}: Pick<LostFoundCommentListProps, 'id' | 'isArticleAuthor'>) => {
  const { data } = useFetchLostFoundCommentList(id);

  return (
    <UiComponent.BaseCommentList
      commentsMap={data.comments}
      servicePath="lost-posts"
      queryKey={lostFoundKeys.comments(id)}
      isArticleAuthor={isArticleAuthor}
    />
  );
};

export default LostFoundCommentList;
