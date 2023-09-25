import React, { type ButtonHTMLAttributes } from 'react'

import * as S from './styled'

export type ButtonSize = 'xs' | 'sm' | 'smd' | 'md' | 'lg'
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  type?: 'button' | 'submit' | 'reset'
  size?: ButtonSize
  variant: ButtonVariant
  label: string | React.ReactNode
  disabled?: boolean
  onClick?: (e: React.MouseEvent) => void
}

export function Button({
  className,
  type = 'button',
  size = 'md',
  variant,
  label,
  disabled,
  onClick,
  ...props
}: ButtonProps) {
  return (
    <S.Button
      className={className}
      type={type}
      size={size}
      variant={variant}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {label}
    </S.Button>
  )
}
