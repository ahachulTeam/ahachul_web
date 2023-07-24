import { RadioButton } from '@ahhachul/ui'

import * as S from './styled'

const soundOptions = [
  { key: '너무 커요', value: '너무 커요' },
  { key: '너무 작아요', value: '너무 작아요' },
]

const radioOptions = [
  { key: '행선 안내방송', value: '행선 안내방송' },
  { key: '임산부배려석 비우기', value: '임산부배려석 비우기' },
]

export default function Announcement() {
  return (
    <S.Container>
      <article>
        <S.Title>방송음량</S.Title>
        <RadioButton options={soundOptions} />
      </article>
      <article>
        <S.Title>요청</S.Title>
        <RadioButton options={radioOptions} />
      </article>
    </S.Container>
  )
}
