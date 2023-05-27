import Link from 'next/link'
import { PropsWithChildren } from 'react'
import * as S from './styled'
import { PATH } from '@/constants'
import { ComplaintCardVariant } from '@/types/variants'

interface ComplaintCardProps {
  className?: string
  title: string
  content: string
  tabId: string
  variant: ComplaintCardVariant
}

export const ComplaintCard = ({
  className,
  title,
  content,
  variant,
  tabId,
  children,
}: PropsWithChildren<ComplaintCardProps>) => {
  return (
    <Link href={`${PATH.COMPLAINTS}/${tabId}`} css={{ all: 'unset' }}>
      <S.ComplaintCard variant={variant} className={className}>
        <h4>{title}</h4>
        <pre>{content}</pre>
        {children}
      </S.ComplaintCard>
    </Link>
  )
}
