import { ChangeEvent, useEffect, useState } from 'react'

import { ENABLE_OPTION_COUNT } from './RadioButton.constants'
import * as S from './RadioButton.styled'
import { RadioButtonOption } from './RadioButton.types'

interface Props {
  options: RadioButtonOption[]
  onOptionChange?: (optionKey: string) => void
}

export default function RadioButton({ options, onOptionChange }: Props) {
  const [selectedOption, setSelectedOption] = useState('')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target

    setSelectedOption(value)

    if (onOptionChange) {
      onOptionChange(value)
    }
  }

  useEffect(() => {
    if (!ENABLE_OPTION_COUNT.some(item => item === options.length)) {
      throw new Error('Error at <RadioButton />: 라디오 버튼 옵션의 개수는 2, 3, 4, 6개만 가능합니다.')
    }
    if (options.length !== new Set(options.map(option => option.key)).size) {
      throw new Error('Error at <RadioButton />: 라디오 버튼 옵션의 key는 중복될 수 없습니다.')
    }
  }, [options])

  if (options.length === 0) {
    return null
  }

  return (
    <S.RadioButton $options={options}>
      {options.map(option => (
        <div key={option.key}>
          <input
            id={option.key}
            type="radio"
            value={option.key}
            checked={selectedOption === option.key}
            aria-selected={selectedOption === option.key}
            onChange={handleChange}
          />
          <S.Label htmlFor={option.key} aria-selected={selectedOption === option.key}>
            <span>{option.value}</span>
          </S.Label>
        </div>
      ))}
    </S.RadioButton>
  )
}
