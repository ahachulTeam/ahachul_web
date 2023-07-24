import { useBoolean } from '@ahhachul/lib'
import { Checkbox, Toggle } from '@ahhachul/ui'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

import Controller from '../controller/Controller'
import { AcquireList, LostList } from '../lostFoundList'
import * as S from './styled'
import useTab from '@/hooks/useTab'
import { LostType } from '@/types/lost'

const LostFoundListSkeleton = dynamic(() => import('../lostFoundList/list/LostFoundList.skeleton'), {
  ssr: false,
})

const LOST_TABS: Record<LostType, string> = { ACQUIRE: '습득물 조회', LOST: '분실물 찾기' }

export default function LostContainer() {
  const { selectedTab, handleChangeTab } = useTab(LOST_TABS, 'lostType')
  const [isExcludeFindComplete, handleToggleFindComplete] = useBoolean()

  return (
    <S.Section>
      <S.Head>
        <Toggle css={S.tabs} defaultValue={selectedTab as string} tabAriaLabel="유실물 탭 버튼">
          <Toggle.WithActionFn tabs={LOST_TABS} actionFn={handleChangeTab} />
        </Toggle>
        <Controller css={S.controller} />
        <Checkbox
          label="찾기 완료 제외하기"
          variant="ghost"
          checked={isExcludeFindComplete}
          onChange={handleToggleFindComplete}
        />
      </S.Head>
      {selectedTab === 'ACQUIRE' && (
        <Suspense fallback={<LostFoundListSkeleton />}>
          <AcquireList isExcludeFindComplete={isExcludeFindComplete} />
        </Suspense>
      )}
      {selectedTab === 'LOST' && (
        <Suspense fallback={<LostFoundListSkeleton />}>
          <LostList isExcludeFindComplete={isExcludeFindComplete} />
        </Suspense>
      )}
    </S.Section>
  )
}
