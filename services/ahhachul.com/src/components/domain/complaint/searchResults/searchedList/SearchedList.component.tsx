import { UiComponent } from '@/components';
import { useIntersectionObserver, useThrottle } from '@/hooks';
import { useFetchComplaintList } from '@/services/complaint';
import { StackFlow } from '@/stackflow';
import { ComplaintFilters } from '@/types/complaint';
import { extractInfinitePageData } from '@/utils';

import * as S from './SearchedList.styled';

interface ComplaintSearchedListProps {
  filters: ComplaintFilters;
  keyword?: string;
  isScale?: boolean;
}

const ComplaintSearchedList = ({
  keyword,
  filters: { subwayLineId },
  isScale,
}: ComplaintSearchedListProps) => {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useFetchComplaintList({
    keyword,
    subwayLineId,
  });

  const complaintArticles = extractInfinitePageData(data);

  const throttledFetchNextPage = useThrottle(() => {
    if (!isFetchingNextPage) {
      fetchNextPage();
    }
  }, 500);

  const { ref: observer } = useIntersectionObserver({
    callback: throttledFetchNextPage,
  });

  if (!complaintArticles.length) return <UiComponent.EmptyList />;

  return (
    <S.Section isScale={isScale}>
      {complaintArticles.map((post, idx) => (
        <StackFlow.Link
          key={`${post.id}${idx}`}
          activityName="ComplaintDetailPage"
          activityParams={{ id: post.id }}
        >
          <UiComponent.ListItem post={post} />
        </StackFlow.Link>
      ))}
      {hasNextPage && <S.ViewMore ref={observer}>더 보기</S.ViewMore>}
    </S.Section>
  );
};

export default ComplaintSearchedList;
