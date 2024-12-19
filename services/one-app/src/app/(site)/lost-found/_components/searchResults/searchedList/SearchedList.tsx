'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';

import type { LostFoundFilters } from '@/model/LostFound';
import { flattenInfinityList } from '@/common/utils/react-query';
import { gneratetAccurateSubwayLineId } from '@/common/utils/subway';
import { useIntersectionObserver } from '@/common/hooks/useIntersectionObserver';
import { useGetLostFoundList } from '@/app/(site)/lost-found/_lib/get';

interface Props {
  keyword: string | null;
  filters: LostFoundFilters;
}

const LostFoundSearchedList = ({ keyword, filters }: Props) => {
  const temporaryUserFavoriteLineId = 1; // TODO: 추후 유저가 즐겨찾는 역 설장하는 피쳐 개발 후 수정하기
  const subwayLineId = useMemo(
    () =>
      gneratetAccurateSubwayLineId(
        filters.subwayLineId,
        temporaryUserFavoriteLineId,
      ),
    [filters.subwayLineId],
  );

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useGetLostFoundList({
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

  return (
    <>
      {lostArticles.map((item, idx) => (
        // item.id로만 하면 key 중복이 발생하고 있음.
        // 해결 필요
        <Link key={`${item.id}-${idx}`} href={`/lost-found/${item.id}`}>
          {item.title}
        </Link>
      ))}
      {hasNextPage && (
        <span ref={loadMoreRef} className="visuallyHidden">
          더 보기
        </span>
      )}
    </>
  );
};

export default LostFoundSearchedList;
