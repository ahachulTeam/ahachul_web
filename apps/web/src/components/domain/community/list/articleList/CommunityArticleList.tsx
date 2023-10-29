import { Button } from '@ahhachul/ui'
import { useMemo } from 'react'
import Item from './item/Item'
import * as S from './styled'
import { IntersectionArea, NoResult } from '@/components/common'
import { useFilterList } from '@/hooks/filters/useFilterList'
import { useCommunityQuery } from '@/services'

function CommunityArticleList() {
  const { handleResetFilter } = useFilterList('sort', 'subwayLineId')

  const { data: communityList, hasNextPage, fetchNextPage } = useCommunityQuery()

  const articles = useMemo(
    () => (communityList ? communityList.pages.flatMap(data => data?.posts) : []),
    [communityList]
  )

  return (
    <S.ArticleList>
      {articles?.length > 0 ? (
        articles?.map(item => <Item key={item?.id} data={item} />)
      ) : (
        <NoResult title="찾고 있는 검색 결과가 없어요.">
          <Button size="md" label="필터 초기화" variant="secondary" onClick={handleResetFilter} />
        </NoResult>
      )}
      <IntersectionArea hasMore={Boolean(hasNextPage)} onImpression={fetchNextPage} />
    </S.ArticleList>
  )
}

export default CommunityArticleList
