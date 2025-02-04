'use client';

import { Fragment, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { ArticleListSuspenseFallback, Post } from '@/component';
import type { ApiResponse, PaginatedList } from '@/types';
import { CommunityPost } from '@/types/community';

import { getCommunityPosts } from '../_lib/getCommunityPosts';

export default function CommunityPosts() {
  const searchParams = useSearchParams();

  const { data, hasNextPage, fetchNextPage, isFetching, isPending } = useInfiniteQuery<
    ApiResponse<PaginatedList<CommunityPost>>,
    Error,
    InfiniteData<ApiResponse<PaginatedList<CommunityPost>>>,
    [_1: string, _2: string, _3: string],
    string
  >({
    queryKey: ['community', 'posts', searchParams.toString()],
    queryFn: getCommunityPosts,
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

  if (isPending) return <ArticleListSuspenseFallback />;

  return (
    <>
      {data?.pages.map((page, i) => (
        <Fragment key={i}>
          {page.result.data.map(post => (
            <Link key={post.id} href={`/community/${post.id}`}>
              <Post post={post} />
            </Link>
          ))}
        </Fragment>
      ))}
      <div ref={ref} style={{ height: 50 }} />
    </>
  );
}
