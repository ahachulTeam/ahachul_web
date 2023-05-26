import React, { HTMLAttributes } from 'react'

import * as S from './styled'
import { TagVariant } from './type'

interface TagProps extends Omit<HTMLAttributes<HTMLButtonElement>, 'dangerouslySetInnerHTML'> {
  className?: string
  label: string
  variant?: TagVariant
  disabled?: boolean
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  onDelete?: () => void
}

export const Tag = ({
  className,
  label,
  variant = 'primary',
  disabled = false,
  onClick,
  onDelete,
  ...other
}: TagProps) => {
  return (
    <S.Tag type="button" className={className} variant={variant} disabled={disabled} onClick={onClick} {...other}>
      <span>{label}</span>
      {/* {variant === "outline" && (
        <S.IconBtn onClick={onDelete}>
          <CloseIcon />
        </S.IconBtn>
      )} */}
    </S.Tag>
  )
}
