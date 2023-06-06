import Item from './item/Item'
import * as S from './styled'
import { ARTICLE_DUMMY_LIST } from '@/assets/dummy/community'
import useCommunityQuery from '@/queries/community/useCommunityQuery'
import { CommunityListQueryModel } from '@/types/community'

function ArticleList() {
  const { data } = useCommunityQuery({} as CommunityListQueryModel)

  console.log(data)

  return (
    <S.ArticleList>
      {ARTICLE_DUMMY_LIST.map(data => (
        <Item key={data._id} data={data} />
      ))}
    </S.ArticleList>
  )
}

export default ArticleList
