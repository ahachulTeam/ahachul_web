import { Toggle } from '@ahhachul/ui'
import Controller from '../controller/Controller'
import LostFoundList from '../lostList/LostList'

import * as S from './styled'
import useTab from '@/hooks/useTab'
import { LostType } from '@/types/lost'

const LOST_TABS: Record<LostType, string> = { LOST: '습득물 조회', ACQUIRE: '분실물 찾기' }

export default function LostContainer() {
  const { selectedTab, handleChangeTab } = useTab(LOST_TABS)

  return (
    <S.Section>
      <S.Head>
        <Toggle css={S.tabs} defaultValue={selectedTab as string} tabAriaLabel="유실물 탭 버튼">
          <Toggle.WithActionFn tabs={LOST_TABS} actionFn={handleChangeTab} />
        </Toggle>
        <Controller css={S.controller} />
      </S.Head>
      <LostFoundList lostType={selectedTab} />
    </S.Section>
  )
}
