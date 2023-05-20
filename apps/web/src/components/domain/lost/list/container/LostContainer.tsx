import { useState } from 'react'
import Controller from '../controller/Controller'
import LostFoundList from '../lostList/LostList'

import * as S from './styled'
import { Toggle } from '@/components/common'

type LostFoundTab = 'lost' | 'found'

const lostFoundTabs = { lost: '습득물 조회', found: '분실물 찾기' }

export default function LostContainer() {
  const [currentTab, setCurrentTab] = useState<LostFoundTab>('lost')

  const switchTab = (tab: LostFoundTab) => {
    setCurrentTab(tab)
  }

  return (
    <S.Section>
      <S.Head>
        <Toggle css={S.tabs} defaultValue={currentTab} tabAraiLabel="유실물 탭 버튼">
          <Toggle.WithActionFn tabs={lostFoundTabs} actionFn={switchTab} />
        </Toggle>
        <Controller css={S.controller} />
      </S.Head>
      <LostFoundList />
    </S.Section>
  )
}
