'use client';

import { Fragment, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import Link from 'next/link';

import { Post } from '@/component';
import type { ApiResponse, LostFoundPost, PaginatedList, SubwayLineFilterOptions } from '@/types';

import { getLostFoundPosts } from '../_lib/getLostFoundPosts';

type Props = {
  query: {
    q?: string;
    category?: string;
    subwayLineId?: SubwayLineFilterOptions;
  };
};

export default function LostFoundPosts({ query }: Props) {
  const { data, hasNextPage, fetchNextPage, isFetching } = useInfiniteQuery<
    ApiResponse<PaginatedList<LostFoundPost>>,
    Error,
    InfiniteData<ApiResponse<PaginatedList<LostFoundPost>>>,
    [_1: string, _2: string, _3: Props['query']],
    string
  >({
    queryKey: ['lost-found', 'posts', query],
    queryFn: getLostFoundPosts,
    initialPageParam: '',
    getNextPageParam: lastPage => lastPage.result.pageToken,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  const { ref, inView } = useInView({
    delay: 500,
    threshold: 0,
  });

  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  return (
    <>
      {data?.pages.map((page, i) => (
        <Fragment key={i}>
          {page.result.data.map(post => (
            <Link key={post.id} href={`/lost-found/${post.id}`}>
              <Post post={post} />
            </Link>
          ))}
        </Fragment>
      ))}
      <div ref={ref} style={{ height: 50 }} />
    </>
  );
}
