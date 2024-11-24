import React, { useMemo, type HTMLAttributes } from 'react';
import { useGetLostFoundList } from 'pages/lost-found/api/get-list';
import type { LostFoundArticle } from 'pages/lost-found/model';
import { Loading } from 'entities/app-loaders/ui/Loading';
import { flattenInfinityList } from 'shared/lib/utils/array/flattenInfinityList';
import { BaseArticleList } from 'widgets/articles/ui/BaseArticleList';
import { useLostFoundFilterStore } from 'pages/lost-found/slice';
import { generateAccurateSubwayLineId } from 'features/subway-lines/lib/generateAccurateSubwayLineId';

interface LostFoundArticleListProps extends HTMLAttributes<HTMLSectionElement> {
  keyword?: string;
}
export default function LostFoundArticleList({
  keyword,
  ...props
}: LostFoundArticleListProps) {
  const { filters } = useLostFoundFilterStore();

  const temporaryUserFavoriteLineId = 2; // TODO: 추후 유저가 즐겨찾는 역 설장하는 피쳐 개발 후 수정하기
  const subwayLineId = useMemo(
    () =>
      generateAccurateSubwayLineId(
        filters.subwayLineId,
        temporaryUserFavoriteLineId,
      ),
    [filters.subwayLineId],
  );

  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useGetLostFoundList({
      pageSize: 10,
      keyword,
      subwayLineId,
      lostType: filters.lostType,
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
