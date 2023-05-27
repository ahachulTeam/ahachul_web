import React, { useRef, type InputHTMLAttributes } from 'react'

import * as S from './styled'

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  className?: string
}

export function Checkbox({ id, label, className, ...restProps }: CheckboxProps) {
  const checkboxRef = useRef<HTMLInputElement>(null)

  const uuid = `checkbox-${id}`

  const onKeydown = (e: React.KeyboardEvent<HTMLLabelElement>) => {
    const { key } = e
    if (key === ' ') {
      e.preventDefault()

      if (checkboxRef.current) {
        checkboxRef.current.click()
      }
    }
  }

  return (
    <S.Checkbox className={className}>
      <input {...restProps} id={uuid} ref={checkboxRef} tabIndex={-1} type="checkbox" />
      <label htmlFor={uuid} tabIndex={0} onKeyDown={onKeydown}>
        {label}
      </label>
    </S.Checkbox>
  )
}
