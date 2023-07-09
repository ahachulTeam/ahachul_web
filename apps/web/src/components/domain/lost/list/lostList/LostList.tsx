import { useCallback } from 'react'
import { LostItem, LostItemSkeleton } from './item'
import * as S from './styled'
import { useViewAtom } from '@/atoms/view'
import { IntersectionArea } from '@/components/common'
import { useFetchLostPosts } from '@/queries/lost'
import { LostPost, LostStatus } from '@/types/lost'

interface LostListProps {
  isExcludeFindComplete: boolean
}

export default function LostList({ isExcludeFindComplete }: LostListProps) {
  const { view } = useViewAtom()
  const { data, isFetchingNextPage, hasNextPage, fetchNextPage } = useFetchLostPosts()

  const excludeFindCompletdPosts = useCallback(
    (posts: LostPost[], isExclude: boolean) =>
      isExclude ? posts.filter(post => post.status === LostStatus.PROGRESS) : posts,
    []
  )

  return (
    <>
      <S.LostList data-view={view}>
        {data?.pages.map(page =>
          excludeFindCompletdPosts(page.posts, isExcludeFindComplete).map(post => (
            <li key={post.id}>
              <LostItem view={view} post={post} />
            </li>
          ))
        )}
        {isFetchingNextPage && <LostItemSkeleton view={view} />}
      </S.LostList>
      <IntersectionArea hasMore={Boolean(hasNextPage)} onImpression={fetchNextPage} />
    </>
  )
}
