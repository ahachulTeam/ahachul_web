// import { BookmarkIcon } from '@/assets/icons/system';
import { API_SERVICE_PATHS } from '@ahhachul/http';

import { UiComponent } from '@/components';
import { complaintKeys, useFetchComplaintCommentList } from '@/services/complaint';

import * as S from './ComplaintCommentList.styled';

interface ComplaintCommentListProps {
  id: number;
  commentCnt: number;
  isArticleAuthor: boolean;
}

const ComplaintCommentList = ({ commentCnt, id, isArticleAuthor }: ComplaintCommentListProps) => {
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
}: Pick<ComplaintCommentListProps, 'id' | 'isArticleAuthor'>) => {
  const { data } = useFetchComplaintCommentList(id);

  return (
    <UiComponent.BaseCommentList
      commentsMap={data.comments}
      servicePath={API_SERVICE_PATHS.complaint}
      queryKey={complaintKeys.comments(id)}
      isArticleAuthor={isArticleAuthor}
    />
  );
};

export default ComplaintCommentList;
