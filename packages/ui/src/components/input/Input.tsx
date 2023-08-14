import { forwardRef, type InputHTMLAttributes } from 'react'

import * as S from './styled'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  className: string
  label: string
  hideLabel?: boolean
}

export default forwardRef<HTMLInputElement, InputProps>(function Input(
  { id, className, label, hideLabel, ...props },
  ref
) {
  return (
    <S.InputContainer className={className}>
      <S.LabelWrapper hideLabel={hideLabel}>
        <S.Label htmlFor={id}>{label}</S.Label>
      </S.LabelWrapper>
      <S.InputWrapper>
        <S.Input ref={ref} id={id} type="text" {...props} />
      </S.InputWrapper>
    </S.InputContainer>
  )
})
