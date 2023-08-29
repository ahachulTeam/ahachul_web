import { Tag } from '@ahhachul/ui'
import * as S from './styled'
import { HASH_TAG_DUMMY_LIST } from '@/assets/dummy/community'
import { usePushShallowRouter } from '@/hooks'

function HashtagList() {
  const { router, pushShallowRouter } = usePushShallowRouter()

  const handleClickHashtag = (hashtag: string) => () => pushShallowRouter(router.pathname, { hashTag: hashtag })

  return (
    <S.HashtagList>
      {HASH_TAG_DUMMY_LIST.flat().map((hashtag, i) => (
        <li key={i}>
          <Tag label={`#${hashtag}`} variant="primary" onClick={handleClickHashtag(hashtag)} />
        </li>
      ))}
    </S.HashtagList>
  )
}

export default HashtagList
