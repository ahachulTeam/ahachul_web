import { Tag } from '@ahhachul/ui'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import * as S from './styled'
import { ALARM_CATEGORY_TABS } from '@/assets/static/tab'

const DUMMY_ALARM_CONTENTS = [
  {
    id: 0,
    title: '신청하신 민원이 접수되었어요!',
    category: '민원신청',
    detailInfo: '질서저해',
    created: '2/19 18:45',
    isFirstVisible: true,
  },
  {
    id: 1,
    title: '작성하신 게시물에 댓글이 달렸어요!',
    category: '2호선 게시판',
    detailInfo: '질서저해',
    created: '2/19 18:45',
    isFirstVisible: false,
  },
  {
    id: 2,
    title: '신청하신 민원이 접수되었어요!',
    category: '민원신청',
    detailInfo: '질서저해',
    created: '2/19 18:45',
    isFirstVisible: true,
  },
  {
    id: 3,
    title: '신청하신 민원이 접수되었어요!',
    category: '민원신청',
    detailInfo: '질서저해',
    created: '2/19 18:45',
    isFirstVisible: true,
  },
  {
    id: 4,
    title: '신청하신 민원이 접수되었어요!',
    category: '민원신청',
    detailInfo: '질서저해',
    created: '2/19 18:45',
    isFirstVisible: true,
  },
  {
    id: 5,
    title: '작성하신 게시물에 댓글이 달렸어요!',
    category: '2호선 게시판',
    detailInfo: '질서저해',
    created: '2/19 18:45',
    isFirstVisible: false,
  },
  {
    id: 6,
    title: '작성하신 게시물에 댓글이 달렸어요!',
    category: '2호선 게시판',
    detailInfo: '질서저해',
    created: '2/19 18:45',
    isFirstVisible: false,
  },
]

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
    <S.Container>
      <S.CategoryList>
        {Object.entries(ALARM_CATEGORY_TABS).map(([key, val], i) => (
          <li key={key}>
            <article>
              <Tag
                label={val}
                variant={query?.category === key ? 'primary' : 'similarDisabledButNotDisabled'}
                onClick={handleChangeTab(key)}
              />
            </article>
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
    </S.Container>
  )
}
