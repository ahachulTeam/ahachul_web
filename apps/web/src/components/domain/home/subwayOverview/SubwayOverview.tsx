// import { A11yHeading } from '@ahhachul/ui'
// import { useRouter } from 'next/router'
// import AhHachulSuperModel from 'public/illust/c8.svg'
// import SubwayIllust from 'public/illust/m1.svg'

// import * as S from './styled'
// import { ArrowIcon } from '@/assets/icons'
// import { PATH } from '@/constants'
// import { useMyProfileQuery } from '@/services'

// interface SubwayOverviewProps {
//   isLoggedIn: boolean
// }

// function SubwayOverview({ isLoggedIn }: SubwayOverviewProps) {
//   const router = useRouter()
//   const handleRouteSettingSubway = () =>
//     isLoggedIn ? router.push(PATH.SETTING_USER_STATIONS) : router.push('/onboarding')

//   const { data: me } = useMyProfileQuery({ enabled: isLoggedIn })

//   return (
//     <S.Container>
//       <A11yHeading as="h3">지하철 열차정보와 혼잡도가 궁금하다면?</A11yHeading>
//       <S.SubwayInfo className="temporary swipe banner">
//         <S.ThickBorderArea tabIndex={-1}>
//           <S.AhHachulLabel>아하철역</S.AhHachulLabel>
//           <S.SubwayIllustImage>
//             <SubwayIllust />
//           </S.SubwayIllustImage>
//         </S.ThickBorderArea>
//         <S.ContentArea>
//           <S.AhHachulSuperModelImage>
//             <AhHachulSuperModel />
//           </S.AhHachulSuperModelImage>
//           <S.Box>
//             <S.Desc>
//               <strong>{isLoggedIn ? me?.nickname : '아하철'}</strong>님 <br />
//               열차정보와 혼잡도가 <br />
//               궁금하다면?
//             </S.Desc>
//             <S.AddBtn type="button" onClick={handleRouteSettingSubway}>
//               {isLoggedIn ? '즐겨찾기 역 설정하기' : '로그인'}
//               <ArrowIcon />
//             </S.AddBtn>
//           </S.Box>
//         </S.ContentArea>
//       </S.SubwayInfo>
//     </S.Container>
//   )
// }

// export default SubwayOverview

export {};
