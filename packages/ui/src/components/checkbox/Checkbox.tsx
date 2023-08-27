import React, { useRef, type InputHTMLAttributes } from 'react'

import * as S from './styled'

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  label?: string
  variant?: 'primary' | 'ghost'
}

export function Checkbox({ className, id, label, variant = 'primary', ...props }: CheckboxProps) {
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
    <S.Checkbox className={className} variant={variant}>
      <input ref={checkboxRef} id={uuid} type="checkbox" tabIndex={-1} {...props} />
      <label htmlFor={uuid} tabIndex={0} onKeyDown={onKeydown}>
        {label}
      </label>
    </S.Checkbox>
  )
}
