import { colors } from '@ahhachul/design-system'
import { css } from '@emotion/react'
import { PropsWithChildren } from 'react'
import * as S from './styled'
import { ComplaintCardVariant } from '@/types/variants'

interface ComplaintCardProps {
  className?: string
  title: string
  content: string
  subText?: string
  variant: ComplaintCardVariant
}

export default function ComplaintCard({
  className,
  title,
  content,
  subText,
  variant,
  children,
}: PropsWithChildren<ComplaintCardProps>) {
  return (
    <>
      <S.ComplaintCard variant={variant} className={className}>
        <h4>{title}</h4>
        <pre>{content}</pre>
        {children}
      </S.ComplaintCard>
      {subText && (
        <S.SubText
          css={css`
            ${variant === 'inactive' &&
            css`
              color: ${colors.gray_22};
            `}
          `}
        >
          <span>{subText}</span>
        </S.SubText>
      )}
    </>
  )
}
