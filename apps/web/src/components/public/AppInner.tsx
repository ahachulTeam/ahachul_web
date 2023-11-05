import React, { PropsWithChildren } from 'react'

import BottomSheetForLogin from '@/components/public/cta/BottomSheetForLogin'
import { useGetHottestHashtagsQuery, useGetSubwayList } from '@/services'

function AppInner({ children }: PropsWithChildren) {
  useGetSubwayList()
  useGetHottestHashtagsQuery()

  // TODO: 추후 fcm 연동하기
  return (
    <React.Fragment>
      {children}
      <BottomSheetForLogin />
    </React.Fragment>
  )
}

export default AppInner
