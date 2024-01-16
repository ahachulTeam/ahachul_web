// import { css } from '@emotion/react'
// import styled from '@emotion/styled'
// import { useRouter } from 'next/router'
// import EditStations from './EditStations'
// import { MinusCircleIcon, WaffleIcon } from '@/assets/icons'
// import { useMyStationsQuery } from '@/services'
// import { UserStationsModel } from '@/types'

// const UserStations = () => {
//   const router = useRouter()
//   const isEditMode = Boolean(router.query?.isEditMode)
//   const { data: userStations } = useMyStationsQuery({ suspense: true, enabled: true })

//   return (
//     <StationBox>
//       {!isEditMode ? (
//         <>
//           {userStations?.stationInfoList?.map(item => {
//             return (
//               <Station color={'#60B157'} key={item.stationId}>
//                 {isEditMode && <MinusCircleIcon />}
//                 <b>1</b>
//                 <span>{item.stationName}</span>
//                 <DragButton>
//                   <WaffleIcon />
//                 </DragButton>
//               </Station>
//             )
//           })}
//         </>
//       ) : (
//         <EditStations userStations={userStations as UserStationsModel} />
//       )}
//     </StationBox>
//   )
// }

// const StationBox = styled.div`
//   padding: 16px 0;
// `

// const Station = styled.div<{ color: string }>`
//   ${({ theme, color }) => css`
//     position: relative;
//     height: 72px;
//     display: flex;
//     align-items: center;
//     gap: 8px;
//     width: 100%;
//     border-bottom: 1px solid #ededed;

//     & > b {
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       margin-left: 8px;
//       width: 24px;
//       height: 24px;
//       border-radius: 12px;
//       background-color: ${color};
//       color: ${theme.colors.white};
//       ${theme.fonts.regular12};
//     }

//     & > span {
//       ${theme.fonts.regular16};
//       color: ${theme.colors.black};
//     }
//   `}
// `

// const DragButton = styled.button`
//   all: unset;
//   position: absolute;
//   width: max-content;
//   top: 50%;
//   right: 16px;
//   transform: translateY(-50%);
// `

// export default UserStations

export {};
