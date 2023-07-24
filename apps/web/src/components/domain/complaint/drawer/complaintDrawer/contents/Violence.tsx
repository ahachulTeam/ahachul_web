import { RadioButton } from '@ahhachul/ui'

import * as S from './styled'
import { PictureUploader } from '@/components/common'
import { usePictureUploader } from '@/hooks'

const radioOptions = [
  { key: '피해자', value: '피해자' },
  { key: '제3자(목격자)', value: '제3자(목격자)' },
]

export default function Violence() {
  const { pictures, provided } = usePictureUploader()

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
      <article>
        <S.Title>사진 업로드</S.Title>
        <PictureUploader {...provided} pictures={pictures} maxCount={10} />
      </article>
    </S.Container>
  )
}
