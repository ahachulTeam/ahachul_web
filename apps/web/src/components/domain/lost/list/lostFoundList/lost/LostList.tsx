import LostFoundList from '../list/LostFoundList'
import { useFetchLostPosts } from '@/queries/lost'

interface LostListProps {
  isExcludeFindComplete: boolean
}

export default function LostList({ isExcludeFindComplete }: LostListProps) {
  const { data, isFetchingNextPage, hasNextPage, fetchNextPage } = useFetchLostPosts('LOST')

  return (
    <LostFoundList
      data={data}
      isExcludeFindComplete={isExcludeFindComplete}
      isFetching={isFetchingNextPage}
      hasMore={Boolean(hasNextPage)}
      fetchNextPage={fetchNextPage}
    />
  )
}
