import { Tab } from '@ahhachul/ui'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { DM } from '../domain/alarm/directMessage/DM'
import { Notifications } from '../domain/alarm/notifications/Notifications'
import { ALARM_TABS } from '@/assets/static/tab'
import { useTab } from '@/hooks/global'

const AlarmScreen = () => {
  const { query, selectedTab, handleChangeTab } = useTab(ALARM_TABS)

  return (
    <Section>
      <Fixed>
        <Tab selectedTab={selectedTab} tabList={ALARM_TABS} handleChangeTab={handleChangeTab} />
      </Fixed>
      <Container>
        {(query?.tab === 'notice' || !query?.tab) && <Notifications />}
        {query?.tab === 'dm' && <DM />}
      </Container>
    </Section>
  )
}

const Section = styled.section`
  width: 100%;
`

const Fixed = styled.div`
  ${({ theme }) => css`
    position: fixed;
    top: ${theme.size.header.height};
    width: 100%;
    max-width: ${theme.size.layout.width};
    margin: 0 auto;
    background-color: ${theme.colors.white};
  `}
`

const Container = styled.div`
  ${({ theme }) => css`
    padding-top: ${theme.size.tab.height};
  `}
`

export default AlarmScreen
