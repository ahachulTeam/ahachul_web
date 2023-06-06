import { Tag } from '@ahhachul/ui'
import * as S from './styled'
import { HASH_TAG_DUMMY_LIST } from '@/assets/dummy/community'
import { usePushShallowRouter } from '@/hooks'

function HashtagList() {
  const { router, pushShallowRouter } = usePushShallowRouter()

  return (
    <S.HashtagList>
      {HASH_TAG_DUMMY_LIST.flat().map((data, i) => (
        <li key={i}>
          <Tag label={`#${data}`} variant="primary" onClick={pushShallowRouter(router.pathname, { tags: data })} />
        </li>
      ))}
    </S.HashtagList>
  )
}

export default HashtagList
