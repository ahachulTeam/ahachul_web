import Item from './item/Item'
import * as S from './styled'
import { ARTICLE_DUMMY_LIST } from '@/assets/dummy/community'

function ArticleList() {
  return (
    <S.ArticleList>
      {ARTICLE_DUMMY_LIST.map(data => (
        <Item key={data._id} data={data} />
      ))}
    </S.ArticleList>
  )
}

export default ArticleList
