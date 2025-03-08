import { BookmarkIcon } from '@/assets/icons/system';
import { UiComponent } from '@/components';
import { communityKeys, useFetchCommunityCommentList } from '@/services/community';

import * as S from './CommunityCommentList.styled';

interface CommunityCommentListProps {
  id: number;
  commentCnt: number;
  isArticleAuthor: boolean;
}

const CommunityCommentList = ({ commentCnt, id, isArticleAuthor }: CommunityCommentListProps) => {
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
        <CommentListInner id={id} isArticleAuthor={isArticleAuthor} />
      </UiComponent.SuspenseQueryBoundary>
    </S.Section>
  );
};

const CommentListInner = ({
  id,
  isArticleAuthor,
}: Pick<CommunityCommentListProps, 'id' | 'isArticleAuthor'>) => {
  const { data } = useFetchCommunityCommentList(id);

  return (
    <UiComponent.BaseCommentList
      commentsMap={data.comments}
      servicePath="community-posts"
      queryKey={communityKeys.comments(id)}
      isArticleAuthor={isArticleAuthor}
    />
  );
};

export default CommunityCommentList;
