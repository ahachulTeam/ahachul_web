'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import { QUERY_GC_TIME, QUERY_STALE_TIME, lostFoundQueryKeys } from '@ahhachul/domain';

import {
  ArticleListSuspenseFallback,
  EmptyArticleList,
  ErrorFallbackView,
  Post,
} from '@/components';
import { localizePathname, resolvePathLocale } from '@/i18n';
import type { ApiResponse, LostFoundPost, PaginatedList } from '@/types';

import { getLostFoundPosts } from '../_lib/getLostFoundPosts';

export default function LostFoundPosts() {
  const pathname = usePathname() ?? '/lost-found';
  const locale = resolvePathLocale(pathname, null);
  const searchParams = useSearchParams();

  const { data, hasNextPage, fetchNextPage, isFetching, isPending, isError, refetch } =
    useInfiniteQuery<
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
  if (isError) {
    return (
      <ErrorFallbackView
        title="유실물 목록을 불러오지 못했습니다."
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
        <Link key={post.id} href={localizePathname(`/lost-found/${post.id}`, locale)}>
          <Post post={post} />
        </Link>
      ))}
      <div ref={ref} style={{ height: 50 }} />
    </>
  );
}
