import React, { HTMLAttributes } from 'react'

import * as S from './styled'
import { TagVariant } from './type'

interface TagProps extends HTMLAttributes<HTMLButtonElement> {
  className?: string
  label: string
  variant?: TagVariant
  disabled?: boolean
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  onDelete?: () => void
}

export const Tag = ({ className, label, variant = 'primary', disabled = false, onClick }: TagProps) => {
  return (
    <S.StyledTag type="button" className={className} variant={variant} disabled={disabled} onClick={onClick}>
      <span>{label}</span>
      {/* {variant === "outline" && (
        <S.IconBtn onClick={onDelete}>
          <CloseIcon />
        </S.IconBtn>
      )} */}
    </S.StyledTag>
  )
}
