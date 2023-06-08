// import { Tag } from '@ahhachul/ui'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import * as S from './styled'
import { DUMMY_ALARM_CONTENTS } from '@/assets/dummy/alarm'
import { ALARM_CATEGORY_TABS } from '@/assets/static/tab'

export const Notifications = () => {
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
      <S.CategoryList>
        {Object.entries(ALARM_CATEGORY_TABS).map(([key, val]) => (
          <li key={key}>
            {/* <Tag
              label={val}
              variant={query?.category === key ? 'primary' : 'greyBackgroundOutline'}
              onClick={handleChangeTab(key)}
            /> */}
          </li>
        ))}
      </S.CategoryList>
      <S.NoticeAlarmList>
        {DUMMY_ALARM_CONTENTS.map(alarm => (
          <S.Alarm key={alarm.id} aria-checked={alarm.isFirstVisible}>
            <article>
              <S.AlarmTitle>{alarm.title}</S.AlarmTitle>
              <S.Flex>
                <S.Category>{alarm.category}:</S.Category>
                <S.DetailInfo>{alarm.detailInfo}</S.DetailInfo>
              </S.Flex>
              <S.Time>{alarm.created}</S.Time>
            </article>
          </S.Alarm>
        ))}
      </S.NoticeAlarmList>
    </>
  )
}
