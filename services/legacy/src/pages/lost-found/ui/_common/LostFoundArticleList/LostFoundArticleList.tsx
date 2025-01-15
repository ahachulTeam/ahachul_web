import { useMemo, type HTMLAttributes } from 'react';

import { Loading } from 'entities/app-loaders/ui/Loading';
import { SubwayLineFilterOptions } from 'features/subway-lines';
import { generateAccurateSubwayLineId } from 'features/subway-lines/lib/generateAccurateSubwayLineId';
import { useGetLostFoundList } from 'pages/lost-found/api/get-list';
import type { LostFoundArticle } from 'pages/lost-found/model';
import { LostFoundType } from 'pages/lost-found/model';
import { flattenInfinityList } from 'shared/lib/utils/array/flattenInfinityList';
import { BaseArticleList } from 'widgets/articles/ui/BaseArticleList';
import { FilterState } from 'widgets/filters/slice/filters';

interface LostFoundArticleListProps extends HTMLAttributes<HTMLSectionElement> {
  keyword?: string;
  filterProps: FilterState<{
    lostType: LostFoundType;
    subwayLineId: SubwayLineFilterOptions;
  }>;
}
export function LostFoundArticleList({
  keyword,
  filterProps,
  ...props
}: LostFoundArticleListProps) {
  const temporaryUserFavoriteLineId = 2; // TODO: 추후 유저가 즐겨찾는 역 설장하는 피쳐 개발 후 수정하기
  const subwayLineId = useMemo(
    () =>
      generateAccurateSubwayLineId(filterProps.filters.subwayLineId, temporaryUserFavoriteLineId),
    [filterProps.filters.subwayLineId],
  );

  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } = useGetLostFoundList({
    pageSize: 10,
    keyword,
    subwayLineId,
    lostType: filterProps.filters.lostType,
  });

  if (!data || isLoading) return <Loading opacity={1} deferredMs={0} />;

  const lostArticles = flattenInfinityList(data);
  return (
    <BaseArticleList<LostFoundArticle>
      to="LostFoundDetail"
      data={lostArticles}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
      {...props}
    />
  );
}
