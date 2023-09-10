import { RadioButton } from '@ahhachul/ui'

import * as S from './styled'

const radioOptions = [
  { key: '피해자', value: '피해자' },
  { key: '제3자(목격자)', value: '제3자(목격자)' },
]

export default function Violence() {
  return (
    <S.Container>
      <article>
        <S.Title>빠른 민원처리를 위해 선택해주세요</S.Title>
        <RadioButton options={radioOptions} />
      </article>
      <article>
        <S.Title>내용</S.Title>
        <S.TextArea placeholder="신고내용을 작성해주세요" />
      </article>
    </S.Container>
  )
}
