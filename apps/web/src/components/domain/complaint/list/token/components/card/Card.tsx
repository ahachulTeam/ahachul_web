import { PropsWithChildren } from 'react'
import * as S from './styled'
import { ComplaintCardVariant } from '@/types/variants'

interface ComplaintCardProps {
  className?: string
  title: string
  content: string
  tabId: string
  variant: ComplaintCardVariant
}

export default function ComplaintCard({
  className,
  title,
  content,
  variant,
  tabId,
  children,
}: PropsWithChildren<ComplaintCardProps>) {
  return (
    <S.ComplaintCard variant={variant} data-tabId={tabId} className={className}>
      <h4>{title}</h4>
      <pre>{content}</pre>
      {children}
    </S.ComplaintCard>
  )
}
