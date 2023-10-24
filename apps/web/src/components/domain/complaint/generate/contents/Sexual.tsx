import { RadioButton } from '@ahhachul/ui'
import { useState, useEffect } from 'react'

import * as S from './styled'
import { useComplaintContext } from '@/components/screens/ScreenComplaintDetail'

const radioOptions = [
  { key: '피해자', value: '피해자' },
  { key: '제3자(목격자)', value: '제3자(목격자)' },
]

export default function Sexual() {
  const { setMessage } = useComplaintContext()

  const [type, setType] = useState('')
  const [contents, setContents] = useState('')

  useEffect(() => {
    if (!type || !contents) {
      setMessage('')
      return
    }
    setMessage(`신고유형: ${type}/ 신고내용: ${contents}`)
  }, [type, contents])

  return (
    <S.Container>
      <article>
        <S.Title>빠른 민원처리를 위해 선택해주세요</S.Title>
        <RadioButton
          options={radioOptions}
          onOptionChange={e => {
            setType(e)
          }}
        />
      </article>
      <article>
        <S.Title>내용</S.Title>
        <S.TextArea
          placeholder="신고내용을 작성해주세요"
          onChange={e => {
            setContents(e.target.value)
          }}
        />
      </article>
    </S.Container>
  )
}
