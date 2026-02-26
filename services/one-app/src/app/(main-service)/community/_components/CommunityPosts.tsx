'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { QUERY_GC_TIME, QUERY_STALE_TIME, communityQueryKeys } from '@ahhachul/domain';

import {
  ArticleListSuspenseFallback,
  EmptyArticleList,
  ErrorFallbackView,
  Post,
} from '@/components';
import type { ApiResponse, PaginatedList } from '@/types';
import { CommunityPost } from '@/types/community';

import { getCommunityPosts } from '../_lib/getCommunityPosts';

export default function CommunityPosts() {
  const searchParams = useSearchParams();

  const { data, hasNextPage, fetchNextPage, isFetching, isPending, isError, refetch } =
    useInfiniteQuery<
      ApiResponse<PaginatedList<CommunityPost>>,
      Error,
      InfiniteData<ApiResponse<PaginatedList<CommunityPost>>>,
      ReturnType<typeof communityQueryKeys.list>,
      string
    >({
      queryKey: communityQueryKeys.list(searchParams.toString()),
      queryFn: getCommunityPosts,
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
  if (isError) {
    return (
      <ErrorFallbackView
        title="커뮤니티 목록을 불러오지 못했습니다."
        description="잠시 후 다시 시도해주세요."
        onAction={() => {
          void refetch();
        }}
      />
    );
  }

  const posts = data?.pages.flatMap(page => page.result.data) ?? [];
  if (posts.length === 0) return <EmptyArticleList />;

  return (
    <>
      {posts.map(post => (
        <Link key={post.id} href={`/community/${post.id}`}>
          <Post post={post} />
        </Link>
      ))}
      <div ref={ref} style={{ height: 50 }} />
    </>
  );
}
