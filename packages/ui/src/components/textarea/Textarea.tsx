import { forwardRef, type TextareaHTMLAttributes } from 'react'

import * as S from './styled'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string
  className?: string
  label: string
  hideLabel?: boolean
  size?: 'sm' | 'md'
}

export default forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { id, className, label, hideLabel, size = 'md', ...props },
  ref
) {
  return (
    <S.TextareaContainer className={className}>
      <S.LabelWrapper hideLabel={hideLabel}>
        <S.Label htmlFor={id}>{label}</S.Label>
      </S.LabelWrapper>
      <S.TextareaWrapper size={size}>
        <S.Textarea ref={ref} id={id} {...props} />
      </S.TextareaWrapper>
    </S.TextareaContainer>
  )
})
