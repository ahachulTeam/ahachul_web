'use client';

import { Fragment, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { QUERY_GC_TIME, QUERY_STALE_TIME, lostFoundQueryKeys } from '@ahhachul/domain';

import { ArticleListSuspenseFallback, Post } from '@/component';
import type { ApiResponse, LostFoundPost, PaginatedList } from '@/types';

import { getLostFoundPosts } from '../_lib/getLostFoundPosts';

export default function LostFoundPosts() {
  const searchParams = useSearchParams();

  const { data, hasNextPage, fetchNextPage, isFetching, isPending } = useInfiniteQuery<
    ApiResponse<PaginatedList<LostFoundPost>>,
    Error,
    InfiniteData<ApiResponse<PaginatedList<LostFoundPost>>>,
    ReturnType<typeof lostFoundQueryKeys.list>,
    string
  >({
    queryKey: lostFoundQueryKeys.list(searchParams.toString()),
    queryFn: getLostFoundPosts,
    initialPageParam: '',
    getNextPageParam: lastPage => lastPage.result.pageToken,
    staleTime: QUERY_STALE_TIME.feed,
    gcTime: QUERY_GC_TIME.feed,
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

  if (isPending) return <ArticleListSuspenseFallback />;

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
