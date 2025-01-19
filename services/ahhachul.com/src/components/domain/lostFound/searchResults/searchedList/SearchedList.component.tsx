import { UiComponent } from '@/components';
import { useIntersectionObserver, useThrottle } from '@/hooks';
import { useFetchLostFoundList } from '@/services/lostFound';
import { StackFlow } from '@/stackflow';
import { LostFoundFilters } from '@/types';
import { extractInfinitePageData } from '@/utils';

import * as S from './SearchedList.styled';

interface LostFoundSearchedListProps {
  filters: LostFoundFilters;
  keyword?: string;
  isScale?: boolean;
}

const LostFoundSearchedList = ({
  keyword,
  filters: { lostType, subwayLineId },
  isScale,
}: LostFoundSearchedListProps) => {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useFetchLostFoundList({
    keyword,
    lostType,
    subwayLineId,
  });

  const lostArticles = extractInfinitePageData(data);

  const throttledFetchNextPage = useThrottle(() => {
    if (!isFetchingNextPage) {
      fetchNextPage();
    }
  }, 500);

  const { ref: observer } = useIntersectionObserver({
    callback: throttledFetchNextPage,
  });

  if (!lostArticles.length) return <UiComponent.EmptyList />;

  return (
    <S.Section isScale={isScale}>
      {lostArticles.map((post, idx) => (
        <StackFlow.Link
          key={`${post.id}${idx}`}
          activityName="LostFoundDetailPage"
          activityParams={{ id: post.id }}
        >
          <UiComponent.ListItem post={post} />
        </StackFlow.Link>
      ))}
      {hasNextPage && <S.ViewMore ref={observer}>더 보기</S.ViewMore>}
    </S.Section>
  );
};

export default LostFoundSearchedList;
