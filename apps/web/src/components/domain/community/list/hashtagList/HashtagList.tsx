import { Tag } from '@ahhachul/ui'
import * as S from './styled'
import { HASH_TAG_DUMMY_LIST } from '@/assets/dummy/community'

function HashtagList() {
  return (
    <S.HashtagList>
      {HASH_TAG_DUMMY_LIST.map((data, i) => (
        <li key={i}>
          <Tag label={`#${data}`} variant="primary" onClick={() => console.log('click!')} />
        </li>
      ))}
    </S.HashtagList>
  )
}

export default HashtagList
