import { RadioButton } from '@ahhachul/ui'

import * as S from './styled'
import { PictureUploader } from '@/components/common'
import { usePictureUploader } from '@/hooks'

const radioOptions = [
  { key: '토사물', value: '토사물' },
  { key: '오물', value: '오물' },
  { key: '환기요청', value: '환기요청' },
]

export default function Facilities() {
  const { pictures, provided } = usePictureUploader()

  return (
    <S.Container>
      <article>
        <S.Title>신고유형을 선택해주세요</S.Title>
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
