import { useRouter } from 'next/router'
import Item from './item/Item'
import * as S from './styled'
import { ARTICLE_DUMMY_LIST } from '@/assets/dummy/community'
import useCommunityQuery from '@/queries/community/useCommunityQuery'
import { CommunityListQueryModel } from '@/types/community'

function ArticleList() {
  const { query } = useRouter()

  const { data } = useCommunityQuery({
    categoryType: query?.tab || 'FREE',
  } as CommunityListQueryModel)

  return (
    <S.ArticleList>
      {ARTICLE_DUMMY_LIST.map(data => (
        <Item key={data._id} data={data} />
      ))}
    </S.ArticleList>
  )
}

export default ArticleList
