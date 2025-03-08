import { BookmarkIcon } from '@/assets/icons/system';
import { UiComponent } from '@/components';
import { complaintKeys, useFetchComplaintCommentList } from '@/services/complaint';

import * as S from './ComplaintCommentList.styled';

interface ComplaintCommentListProps {
  id: number;
  commentCnt: number;
}

const ComplaintCommentList = ({ commentCnt, id }: ComplaintCommentListProps) => {
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

const CommentListInner = ({ id }: Pick<ComplaintCommentListProps, 'id'>) => {
  const { data } = useFetchComplaintCommentList(id);

  return (
    <UiComponent.BaseCommentList
      commentsMap={data.comments}
      servicePath="complaint-posts"
      queryKey={complaintKeys.comments(id)}
    />
  );
};

export default ComplaintCommentList;
