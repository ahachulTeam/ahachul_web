import LostFoundItem from './item/LostItem'
import * as S from './styled'
import { useViewAtom } from '@/atoms/view'
import { IntersectionArea } from '@/components/common'
import { useFetchLostPosts } from '@/queries/lost'
import { LostType } from '@/types/lost'

interface LostFoundListProps {
  lostType: LostType
}

export default function LostFoundList({ lostType }: LostFoundListProps) {
  const { view } = useViewAtom()
  const { data, hasNextPage, fetchNextPage } = useFetchLostPosts({ lostType })

  return (
    <S.LostFoundList data-view={view}>
      {data?.pages.map(page =>
        page.posts.map(post => (
          <li key={post.id}>
            <LostFoundItem view={view} post={post} />
          </li>
        ))
      )}
      <IntersectionArea hasMore={Boolean(hasNextPage)} onImpression={fetchNextPage} />
    </S.LostFoundList>
  )
}
