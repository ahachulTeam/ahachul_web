import { Tab } from '@ahhachul/ui'
import { DM } from '../directMessage/DM'
import { Notifications } from '../notifications/Notifications'
import * as S from './styled'
import { ALARM_TABS } from '@/assets/static/tab'
import useTab from '@/hooks/useTab'

export const AlarmPageContainer = () => {
  const { query, selectedTab, handleChangeTab } = useTab(ALARM_TABS)

  return (
    <S.Section>
      <S.Fixed>
        <Tab selectedTab={selectedTab} tabList={ALARM_TABS} handleChangeTab={handleChangeTab} />
      </S.Fixed>
      <S.Container>
        {(query?.tab === 'notice' || !query?.tab) && <Notifications />}
        {query?.tab === 'dm' && <DM />}
      </S.Container>
    </S.Section>
  )
}
