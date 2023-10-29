import { Tag } from '@ahhachul/ui'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { DUMMY_ALARM_CONTENTS } from '@/assets/dummy/alarm'
import { ALARM_CATEGORY_TABS } from '@/assets/static/tab'

const Notifications = () => {
  const router = useRouter()
  const { query } = router

  const handleChangeTab = useCallback(
    (category: string) => () => {
      const query = { ...router.query }
      router.push({ pathname: router.pathname, query: { ...query, category } }, undefined, { shallow: true })
    },
    [router]
  )

  return (
    <>
      <CategoryList>
        {Object.entries(ALARM_CATEGORY_TABS).map(([key, val]) => (
          <li key={key}>
            <Tag
              label={val}
              variant={query?.category === key ? 'primary' : 'greyBackgroundOutline'}
              onClick={handleChangeTab(key)}
            />
          </li>
        ))}
      </CategoryList>
      <NoticeAlarmList>
        {DUMMY_ALARM_CONTENTS.map(alarm => (
          <Alarm key={alarm.id} aria-checked={alarm.isFirstVisible}>
            <article>
              <AlarmTitle>{alarm.title}</AlarmTitle>
              <Flex>
                <Category>{alarm.category}:</Category>
                <DetailInfo>{alarm.detailInfo}</DetailInfo>
              </Flex>
              <Time>{alarm.created}</Time>
            </article>
          </Alarm>
        ))}
      </NoticeAlarmList>
    </>
  )
}

const CategoryList = styled.ul`
  display: flex;
  flex-wrap: nowrap;
  column-gap: 10px;
  overflow-x: overlay;
  -ms-overflow-style: none;
  scrollbar-width: none;
  padding: 15px;

  ::-webkit-scrollbar {
    display: none;
  }
`

const NoticeAlarmList = styled.ul`
  width: 100%;
`

const Alarm = styled.li`
  cursor: pointer;

  &[aria-checked='true'] {
    background-color: #d0eeff;
  }

  & > article {
    width: 100%;
    padding: 18px 15px;
  }
`
const AlarmTitle = styled.span`
  ${({ theme }) => css`
    ${theme.fonts.medium16};
    color: ${theme.colors.black};
  `}
`
const Flex = styled.span`
  display: flex;
`
const Category = styled.span`
  ${({ theme }) => css`
    ${theme.fonts.regular14};
    width: max-content;
    color: ${theme.colors.black};
    margin-right: 2px;
  `}
`
const DetailInfo = styled.span`
  ${({ theme }) => css`
    ${theme.fonts.regular14};
    width: max-content;
    color: ${theme.colors.black};
  `}
`
const Time = styled.span`
  ${({ theme }) => css`
    ${theme.fonts.regular12};
    color: ${theme.colors.gray_45};
  `}
`

export default Notifications
