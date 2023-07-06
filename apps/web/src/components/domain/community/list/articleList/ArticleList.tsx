import { useRouter } from 'next/router'
import Item from './item/Item'
import * as S from './styled'
import useCommunityQuery from '@/queries/community/useCommunityQuery'
import { CommunityListQueryModel } from '@/types/community'

function ArticleList() {
  const { query } = useRouter()

  const { data } = useCommunityQuery({
    categoryType: query?.tab || 'FREE',
    title: query?.title,
  } as CommunityListQueryModel)

  return (
    <S.ArticleList>
      {data?.result?.posts.map(data => (
        <Item key={data.id} data={data} />
      ))}
    </S.ArticleList>
  )
}

export default ArticleList
