import { UiComponent } from '@/components';
import { useIntersectionObserver, useThrottle } from '@/hooks';
import { useFetchCommunityList } from '@/services/community';
import { StackFlow } from '@/stackflow';
import { CommunityFilters } from '@/types';
import { extractInfinitePageData } from '@/utils';

import * as S from './SearchedList.styled';

interface CommunitySearchedListProps {
  filters: CommunityFilters;
  keyword?: string;
  isScale?: boolean;
}

const CommunitySearchedList = ({
  keyword,
  filters: { communityType, subwayLineId },
  isScale,
}: CommunitySearchedListProps) => {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useFetchCommunityList({
    subwayLineId,
    content: keyword,
    categoryType: communityType,
  });

  const communityArticles = extractInfinitePageData(data);

  const throttledFetchNextPage = useThrottle(() => {
    if (!isFetchingNextPage) {
      fetchNextPage();
    }
  }, 500);

  const { ref: observer } = useIntersectionObserver({
    callback: throttledFetchNextPage,
  });

  if (!communityArticles.length) return <UiComponent.EmptyList />;

  return (
    <S.Section isScale={isScale}>
      {communityArticles.map((post, idx) => (
        <StackFlow.Link
          key={`${post.id}${idx}`}
          activityName="CommunityDetailPage"
          activityParams={{ id: post.id }}
        >
          <UiComponent.ListItem post={post} />
        </StackFlow.Link>
      ))}
      {hasNextPage && <S.ViewMore ref={observer}>더 보기</S.ViewMore>}
    </S.Section>
  );
};

export default CommunitySearchedList;
