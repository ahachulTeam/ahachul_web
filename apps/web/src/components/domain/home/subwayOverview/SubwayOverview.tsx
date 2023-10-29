import { useRouter } from 'next/router'
import AhHachulSuperModel from 'public/illust/c8.svg'
import SubwayIllust from 'public/illust/m1.svg'

import * as S from './styled'
import { ArrowIcon } from '@/assets/icons'
import { useAuth } from '@/context'
import { useMyProfileQuery } from '@/services'

function SubwayOverview() {
  const router = useRouter()
  const handleRouteSettingSubway = () => router.push('/onboarding')

  const {
    auth: { isAuth },
  } = useAuth()

  const { data: me } = useMyProfileQuery({ enabled: isAuth })

  return (
    <S.SubwayInfo className="temporary swipe banner">
      <S.ThickBorderArea tabIndex={-1}>
        <S.AhHachulLabel>아하철역</S.AhHachulLabel>
        <S.SubwayIllustImage>
          <SubwayIllust />
        </S.SubwayIllustImage>
      </S.ThickBorderArea>
      <S.ContentArea>
        <S.AhHachulSuperModelImage>
          <AhHachulSuperModel />
        </S.AhHachulSuperModelImage>
        <S.Box>
          <S.Desc>
            <strong>{me ? me.nickname : '아하철'}</strong>님 <br />
            열차정보와 혼잡도가 <br />
            궁금하다면?
          </S.Desc>
          <S.AddBtn type="button" onClick={handleRouteSettingSubway}>
            전철역 추가하기
            <ArrowIcon />
          </S.AddBtn>
        </S.Box>
      </S.ContentArea>
    </S.SubwayInfo>
  )
}

export default SubwayOverview
