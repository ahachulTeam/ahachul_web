import React from 'react'

import * as S from './styled'
import type { TagVariant } from '@/types/common'

interface TagBtnProps {
  className?: string
  label: string
  variant?: TagVariant
  disabled?: boolean
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  onDelete?: () => void
}

export default function TagBtn({
  className,
  label,
  variant = 'primary',
  disabled = false,
  onClick,
  onDelete,
}: TagBtnProps) {
  console.log(onDelete)
  return (
    <S.TagBtn type="button" className={className} variant={variant} disabled={disabled} onClick={onClick}>
      <span>{label}</span>
      {/* {variant === "outline" && (
        <S.IconBtn onClick={onDelete}>
          <CloseIcon />
        </S.IconBtn>
      )} */}
    </S.TagBtn>
  )
}
