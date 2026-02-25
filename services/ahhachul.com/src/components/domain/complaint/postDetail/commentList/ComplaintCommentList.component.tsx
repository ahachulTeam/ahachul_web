import { useState } from 'react';

// import { BookmarkIcon } from '@/assets/icons/system';
import { API_SERVICE_PATHS } from '@ahhachul/http';

import { UiComponent } from '@/components';
import { type CommentSortOption } from '@/services/comment';
import { complaintKeys, useFetchComplaintCommentList } from '@/services/complaint';

import * as S from './ComplaintCommentList.styled';

interface ComplaintCommentListProps {
  id: number;
  commentCnt: number;
  isArticleAuthor: boolean;
}

const ComplaintCommentList = ({ commentCnt, id, isArticleAuthor }: ComplaintCommentListProps) => {
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
}: Pick<ComplaintCommentListProps, 'id' | 'isArticleAuthor'> & { sort: CommentSortOption }) => {
  const { data } = useFetchComplaintCommentList(id, sort);
  const commentQueryKey = [...complaintKeys.comments(id), sort] as const;

  return (
    <UiComponent.BaseCommentList
      commentsMap={data.comments}
      servicePath={API_SERVICE_PATHS.complaint}
      queryKey={commentQueryKey}
      isArticleAuthor={isArticleAuthor}
    />
  );
};

export default ComplaintCommentList;
