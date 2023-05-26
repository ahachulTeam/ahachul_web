import { Tab } from '@ahhachul/ui'
import { DM } from '../directMessage/DM'
import { Notifications } from '../notifications/Notifications'
import { ALARM_TABS } from '@/assets/static/tab'
import useTab from '@/hooks/useTab'

export const AlarmPageContainer = () => {
  const { query, selectedTab, handleChangeTab } = useTab(ALARM_TABS)

  return (
    <>
      <Tab selectedTab={selectedTab} tabList={ALARM_TABS} handleChangeTab={handleChangeTab} />
      {(query?.tab === 'notice' || !query?.tab) && <Notifications />}
      {query?.tab === 'dm' && <DM />}
    </>
  )
}
