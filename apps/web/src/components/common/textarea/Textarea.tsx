import React from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

import * as S from './Textarea.styled'

interface TextareaProps {
  className?: string
  placeholder?: string
  maxLength: number
  textValue: string
  errorId?: string
  hasError?: boolean
  register: UseFormRegisterReturn<string>
}

const Textarea = ({
  className,
  maxLength,
  placeholder,
  textValue,
  errorId,
  hasError = false,
  register,
}: TextareaProps) => {
  return (
    <S.Textarea
      className="autoTextarea"
      rows={1}
      maxLength={maxLength}
      placeholder={placeholder}
      aria-invalid={hasError}
      aria-errormessage={errorId}
      {...register}
    />
  )
}

export default Textarea
