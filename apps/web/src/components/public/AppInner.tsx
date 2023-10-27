import React, { PropsWithChildren } from 'react'
import { useAuth } from '@/context'
import { useGetHottestHashtagsQuery, useMyProfileQuery } from '@/services'

function AppInner({ children }: PropsWithChildren) {
  const { isLoggedIn } = useAuth()
  useMyProfileQuery({ enabled: isLoggedIn() })
  useGetHottestHashtagsQuery()

  // 추후 fcm 연동하기
  return <React.Fragment>{children}</React.Fragment>
}

export default AppInner
