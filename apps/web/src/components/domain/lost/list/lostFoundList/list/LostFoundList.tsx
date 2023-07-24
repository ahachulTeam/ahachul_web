import { InfiniteData } from '@tanstack/react-query'
import { useCallback } from 'react'
import { LostItem, LostItemSkeleton } from './item'
import * as S from './styled'
import { useViewAtom } from '@/atoms/view'
import { IntersectionArea } from '@/components/common'
import { LostPost, LostPostsResponse, LostStatus } from '@/types/lost'

interface LostFoundListProps {
  data?: InfiniteData<LostPostsResponse>
  isExcludeFindComplete: boolean
  isFetching: boolean
  hasMore: boolean
  fetchNextPage: () => void
}

export default function LostFoundList({
  data,
  isExcludeFindComplete,
  isFetching,
  hasMore,
  fetchNextPage,
}: LostFoundListProps) {
  const { view } = useViewAtom()

  const excludeFindCompletdPosts = useCallback(
    (posts: LostPost[], isExclude: boolean) =>
      isExclude ? posts.filter(post => post.status === LostStatus.PROGRESS) : posts,
    []
  )

  return (
    <>
      <S.LostFoundList data-view={view}>
        {data?.pages.map(page =>
          excludeFindCompletdPosts(page.posts, isExcludeFindComplete).map(post => (
            <li key={post.id}>
              <LostItem view={view} post={post} />
            </li>
          ))
        )}
        {isFetching && <LostItemSkeleton view={view} />}
      </S.LostFoundList>
      <IntersectionArea hasMore={hasMore} onImpression={fetchNextPage} />
    </>
  )
}
