'use client';

import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

import { useGetLostFoundList } from '../_lib/get';
import { flattenInfinityList } from '@/common/utils/react-query';

const IntersectionArea = dynamic(
  () => import('@/common/components/IntersectionArea'),
  { ssr: false },
);

const LostFoundList = () => {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useGetLostFoundList({
      pageSize: 40,
      lostType: 'ACQUIRE',
    });

  const lostArticles = flattenInfinityList(data);
  const intersectCallback = () => !isFetchingNextPage && fetchNextPage();

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
        <IntersectionArea
          callback={intersectCallback}
          intersectionOptions={{ rootMargin: '24% 0px', threshold: 0 }}
        >
          <span className="visuallyHidden">더 보기</span>
        </IntersectionArea>
      )}
    </>
  );
};

export default LostFoundList;
