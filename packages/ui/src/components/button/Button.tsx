import React, { type ButtonHTMLAttributes } from 'react'

import * as S from './styled'

export type ButtonSize = 'xs' | 'sm' | 'smd' | 'md' | 'lg'
export type ButtonVariant = 'primary' | 'secondary'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  type?: 'button' | 'submit' | 'reset'
  size: ButtonSize
  /**
   * ButtonVariant =  'primary' | 'secondary'
   */
  variant: ButtonVariant
  label: string
  disabled?: boolean
  onClick?: (e: React.MouseEvent) => void
}

export function Button({ className, type = 'button', size, variant, label, disabled, onClick }: ButtonProps) {
  return (
    <S.Button className={className} type={type} size={size} variant={variant} disabled={disabled} onClick={onClick}>
      {label}
    </S.Button>
  )
}
