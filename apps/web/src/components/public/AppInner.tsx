import React, { PropsWithChildren } from 'react'

import BottomSheetForLogin from '@/components/public/cta/BottomSheetForLogin'
import { useGetHottestHashtagsQuery, useGetSubwayList } from '@/services'

function AppInner({ children }: PropsWithChildren) {
  // 지하철 정보 저장 및 초기화
  useGetSubwayList()
  // 인기 키워드 prefetching
  useGetHottestHashtagsQuery()

  // eslint-disable-next-line no-warning-comments
  // TODO: 추후 fcm 연동하기
  return (
    <React.Fragment>
      {children}
      <BottomSheetForLogin />
    </React.Fragment>
  )
}

export default AppInner
