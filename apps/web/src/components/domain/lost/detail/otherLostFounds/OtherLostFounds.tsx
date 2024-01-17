// import OtherLostFounditem from './item/OtherLostFoundItem'
// import * as S from './OtherLostFounds.styled'
// import { ArrowIcon } from '@/assets/icons'
// import { LostType } from '@/types/lost'

// interface OtherLostFoundsProps {
//   lostType: LostType //TODO:
//   subwayLine: number //TODO: 호선 데이터 나오면 수정
// }

// const LOST_TABS: Record<LostType, string> = { ACQUIRE: '습득물', LOST: '분실물' }

// export default function OtherLostFounds({ lostType, subwayLine }: OtherLostFoundsProps) {
//   return (
//     <S.OtherLostFounds>
//       <S.TitleWrapper>
//         <S.Title>
//           <strong>{subwayLine}호선</strong>의 다른 {LOST_TABS[lostType]}도 둘러보세요
//         </S.Title>
//         <ArrowIcon />
//       </S.TitleWrapper>
//       <S.OtherList>
//         <li>
//           <OtherLostFounditem />
//         </li>
//         <li>
//           <OtherLostFounditem />
//         </li>
//         <li>
//           <OtherLostFounditem />
//         </li>
//         <li>
//           <OtherLostFounditem />
//         </li>
//         <li>
//           <OtherLostFounditem />
//         </li>
//         <li>
//           <OtherLostFounditem />
//         </li>
//         <li>
//           <OtherLostFounditem />
//         </li>
//         <li>
//           <OtherLostFounditem />
//         </li>
//       </S.OtherList>
//     </S.OtherLostFounds>
//   )
// }

export {};
