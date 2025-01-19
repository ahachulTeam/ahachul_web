'use client';

import { useMemo } from 'react';

import Link from 'next/link';

import { useGetLostFoundList } from '@/app/(site)/lost-found/_lib/get';
import { ArticleCard, EmptyArticleList } from '@/common/components';
import { useIntersectionObserver } from '@/common/hooks';
import { flattenInfinityList, formatSubwayLineId } from '@/common/utils';
import type { LostFoundFilters } from '@/model';

interface Props {
  keyword: string | null;
  filters: LostFoundFilters;
}

export const LostFoundSearchedList = ({ keyword, filters }: Props) => {
  const temporaryUserFavoriteLineId = 1; // TODO: 추후 유저가 즐겨찾는 역 설장하는 피쳐 개발 후 수정하기
  const subwayLineId = useMemo(
    () => formatSubwayLineId(filters.subwayLineId, temporaryUserFavoriteLineId),
    [filters.subwayLineId],
  );

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useGetLostFoundList({
    pageSize: 40,
    keyword,
    subwayLineId,
    lostType: filters.lostType,
  });

  const lostArticles = flattenInfinityList(data);
  const intersectCallback = () => !isFetchingNextPage && fetchNextPage();
  const { ref: loadMoreRef } = useIntersectionObserver({
    callback: intersectCallback,
  });

  if (!lostArticles.length) return <EmptyArticleList />;

  return (
    <section>
      {lostArticles.map((item, idx) => (
        <Link key={`${item.id}${idx}`} href={`/lost-found/${item.id}`}>
          <ArticleCard post={item} />
        </Link>
      ))}
      {hasNextPage && (
        <span ref={loadMoreRef} className="visuallyHidden">
          더 보기
        </span>
      )}
    </section>
  );
};

export default LostFoundSearchedList;
