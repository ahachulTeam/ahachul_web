'use client';

import React from 'react';
import Link from 'next/link';

import { useGetLostFoundList } from '../_lib/get';
import { flattenInfinityList } from '@/common/utils/react-query';
import { useIntersectionObserver } from '@/common/hooks/useIntersectionObserver';

const LostFoundList = () => {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useGetLostFoundList({
      pageSize: 40,
      lostType: 'ACQUIRE',
    });

  const lostArticles = flattenInfinityList(data);
  const intersectCallback = () => !isFetchingNextPage && fetchNextPage();

  const { ref } = useIntersectionObserver({
    callback: intersectCallback,
  });

  return (
    <>
      {lostArticles.map((item, idx) => (
        <Link key={`${item.id}-${idx}`} href={`/lost-found/${item.id}`}>
          {/* item.id로만 하면 key 중복이 발생하고 있음. 확인 필요 */}
          {item.title}
        </Link>
      ))}
      {hasNextPage && <span ref={ref}>더 보기</span>}
    </>
  );
};

export default LostFoundList;
