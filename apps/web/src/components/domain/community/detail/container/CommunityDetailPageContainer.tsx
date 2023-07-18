import { Suspense } from 'react'
import Comments from '../comments/Comments'
import Contents from '../contents/Contents'
import * as S from './styled'
import { useAuth } from '@/context'

export const CommunityDetailPageContainer = () => {
  const { user } = useAuth()

  return (
    <S.Container>
      <Suspense fallback={<div />}>
        <Contents />
      </Suspense>
      <S.Divider />
      <Suspense fallback={<div />}>
        <Comments user={user} />
      </Suspense>
    </S.Container>
  )
}
