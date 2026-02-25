import { useState } from 'react';

// import { BookmarkIcon } from '@/assets/icons/system';
import { API_SERVICE_PATHS } from '@ahhachul/http';

import { UiComponent } from '@/components';
import { type CommentSortOption } from '@/services/comment';
import { lostFoundKeys, useFetchLostFoundCommentList } from '@/services/lostFound';

import * as S from './LostFoundCommentList.styled';

interface LostFoundCommentListProps {
  id: number;
  commentCnt: number;
  isArticleAuthor: boolean;
}

const LostFoundCommentList = ({ commentCnt, id, isArticleAuthor }: LostFoundCommentListProps) => {
  const [sort, setSort] = useState<CommentSortOption>('latest');

  return (
    <S.Section>
      <S.HeaderWrapper>
        <S.CommentCountWrapper>
          <span>댓글</span>
          <span>{commentCnt ?? 0}</span>
        </S.CommentCountWrapper>
        <S.SortButtonGroup>
          <S.SortButton active={sort === 'latest'} onClick={() => setSort('latest')}>
            최신순
          </S.SortButton>
          <S.SortButton active={sort === 'popular'} onClick={() => setSort('popular')}>
            인기순
          </S.SortButton>
        </S.SortButtonGroup>
        {/* <BookmarkIcon /> */}
      </S.HeaderWrapper>
      <UiComponent.SuspenseQueryBoundary
        keys={[id]}
        errorFallback={props => <UiComponent.ErrorCommentList {...props} />}
        suspenseFallback={<UiComponent.CommentListSkeleton />}
      >
        <CommentListInner id={id} isArticleAuthor={isArticleAuthor} sort={sort} />
      </UiComponent.SuspenseQueryBoundary>
    </S.Section>
  );
};

const CommentListInner = ({
  id,
  isArticleAuthor,
  sort,
}: Pick<LostFoundCommentListProps, 'id' | 'isArticleAuthor'> & { sort: CommentSortOption }) => {
  const { data } = useFetchLostFoundCommentList(id, sort);
  const commentQueryKey = [...lostFoundKeys.comments(id), sort] as const;

  return (
    <UiComponent.BaseCommentList
      commentsMap={data.comments}
      servicePath={API_SERVICE_PATHS.lostFound}
      queryKey={commentQueryKey}
      isArticleAuthor={isArticleAuthor}
    />
  );
};

export default LostFoundCommentList;
