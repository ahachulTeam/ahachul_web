import type { PropsWithChildren } from 'react'

import * as S from './styled'

interface StoryLayoutProps extends PropsWithChildren {
  className?: string
}

export const StoryLayout = ({ children, className }: StoryLayoutProps) => {
  return <S.StoryLayout className={className}>{children}</S.StoryLayout>
}
