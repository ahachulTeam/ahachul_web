import { useMemo } from 'react'
import Item from './item/Item'
import * as S from './styled'
import { IntersectionArea } from '@/components/common'
import useCommunityQuery from '@/queries/community/useCommunityQuery'

function ArticleList() {
  const { data: communityList, hasNextPage, fetchNextPage } = useCommunityQuery()

  const articles = useMemo(
    () => (communityList ? communityList.pages.flatMap(data => data?.posts) : []),
    [communityList]
  )

  return (
    <>
      <S.ArticleList>
        {articles?.map(item => (
          <Item key={item?.id} data={item} />
        ))}
      </S.ArticleList>
      <IntersectionArea hasMore={Boolean(hasNextPage)} onImpression={fetchNextPage} />
    </>
  )
}

export default ArticleList
