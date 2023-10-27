import { Tag } from '@ahhachul/ui'
import { useRouter } from 'next/router'
import * as S from './styled'
import { HASH_TAG_DUMMY_LIST } from '@/assets/dummy/community'

function HashtagList() {
  const router = useRouter()

  const handleClickHashtag = (hashtag: string) => () =>
    router.push({ pathname: router.pathname, query: { hashTag: hashtag } })

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
