import { useState, useEffect } from 'react'

import { RadioButton } from '@ahhachul/ui'

import * as S from './styled'
import { useComplaintContext } from '../container'

const radioOptions = [
  { key: '이동상인', value: '이동상인' },
  { key: '취객', value: '취객' },
  { key: '구걸', value: '구걸' },
  { key: '종교행위', value: '종교행위' },
  { key: '노숙', value: '노숙' },
  { key: '마스크 미착용', value: '마스크 미착용' },
]

export default function Impediment() {
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
        <S.Title>신고유형을 선택해주세요</S.Title>
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
