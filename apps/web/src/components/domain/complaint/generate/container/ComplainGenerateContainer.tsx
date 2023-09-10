import { useEffect, useMemo } from 'react'

import { useRouter } from 'next/router'
import * as S from './ComplainGenerateContainer.styled'
import { Announcement, Facilities, Impediment, Patient, Sexual, Temperature, Violence } from '../contents'

import { SwitchCase, Button } from '@ahhachul/ui'
import { useNavigationBar } from '@/hooks'

const ComplaintContentsKeys = {
  facilities: '시설 · 환경민원',
  temperature: '온도조절',
  announcement: '안내방송',
  impediment: '질서저해',
  patient: '응급환자',
  sexual: '성추행',
  violence: '폭력',
}

export const ComplainGenerateContainer = () => {
  const router = useRouter()

  const { isOpenNavigationBar } = useNavigationBar()

  const selectedComplaint = useMemo(() => {
    return router.query.id as keyof typeof ComplaintContentsKeys
  }, [router.query])

  useEffect(() => {
    if (
      !selectedComplaint ||
      Object.keys(ComplaintContentsKeys).findIndex(item => item === String(router.query.id)) === -1
    ) {
      router.push('/complaint', undefined, { shallow: true })
    }
  }, [])

  return (
    <>
      <S.Container>
        <S.지하철정보>
          <span>
            <b>3호선</b> 1192열차 311227호차
          </span>
          <p>대화행</p>
        </S.지하철정보>
        <S.진짜콘텐츠>
          <SwitchCase
            value={selectedComplaint}
            caseBy={{
              facilities: <Facilities />,
              temperature: <Temperature />,
              announcement: <Announcement />,
              impediment: <Impediment />,
              patient: <Patient />,
              sexual: <Sexual />,
              violence: <Violence />,
            }}
          />
        </S.진짜콘텐츠>
      </S.Container>
      <S.StickyArea $isOpenNavigationBar={isOpenNavigationBar}>
        <Button label="접수하기" size="md" variant="primary" type="button" />
      </S.StickyArea>
    </>
  )
}
