import { Toggle } from '@ahhachul/ui'
import Controller from '../controller/Controller'
import LostFoundList from '../lostList/LostList'

import * as S from './styled'
import useTab from '@/hooks/useTab'

const LOST_TABS = { lost: '습득물 조회', found: '분실물 찾기' }

export default function LostContainer() {
  const { selectedTab, handleChangeTab } = useTab(LOST_TABS)

  return (
    <S.Section>
      <S.Head>
        <Toggle css={S.tabs} defaultValue={selectedTab as string} tabAraiLabel="유실물 탭 버튼">
          <Toggle.WithActionFn tabs={LOST_TABS} actionFn={handleChangeTab} />
        </Toggle>
        <Controller css={S.controller} />
      </S.Head>
      <LostFoundList />
    </S.Section>
  )
}
