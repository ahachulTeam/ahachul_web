import { Button } from '@ahhachul/ui'
import dynamic from 'next/dynamic'
import { useMemo } from 'react'
import Item from './item/Item'
import * as S from './styled'
import { IntersectionArea, NoResult } from '@/components/common'
import useCommunityQuery from '@/queries/community/useCommunityQuery'

const CommunityItemSkeleton = dynamic(() => import('./item/CommunityItem.skeleton'), {
  ssr: false,
})

interface ArticleListProps {
  handleResetFilter: () => void
}

function ArticleList({ handleResetFilter }: ArticleListProps) {
  const { data: communityList, hasNextPage, fetchNextPage, isLoading } = useCommunityQuery()

  const articles = useMemo(
    () => (communityList ? communityList.pages.flatMap(data => data?.posts) : []),
    [communityList]
  )

  if (isLoading) {
    return (
      <S.ArticleList>
        <CommunityItemSkeleton />
      </S.ArticleList>
    )
  }

  return (
    <>
      <S.ArticleList>
        {articles?.length > 0 ? (
          articles?.map(item => <Item key={item?.id} data={item} />)
        ) : (
          <NoResult title="찾고 있는 검색 결과가 없어요.">
            <Button size="md" label="필터 초기화" variant="secondary" onClick={handleResetFilter} />
          </NoResult>
        )}
      </S.ArticleList>
      <IntersectionArea hasMore={Boolean(hasNextPage)} onImpression={fetchNextPage} />
    </>
  )
}

export default ArticleList
