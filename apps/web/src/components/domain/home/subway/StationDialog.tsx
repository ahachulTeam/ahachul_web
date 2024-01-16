// import { css } from '@emotion/react'
// import styled from '@emotion/styled'
// import { AnimatePresence, m } from 'framer-motion'
// import { useRouter } from 'next/router'
// import { ArrowDownIcon } from '@/assets/icons'
// import { ITEM_FOCUS_ID } from '@/constants'
// import { PATH } from '@/constants'
// import { defaultFadeInDownVariants } from '@/constants/motions'
// import { SUBWAY_SELECT_UUID } from '@/constants/subway'
// import useDialog from '@/hooks/filters/useDialog'
// import { useMyStationsMutation } from '@/services'
// import { UserStationsModel } from '@/types'

// interface StationDialogProps {
//   userStations?: UserStationsModel
// }

// interface FilterDropboxProps {
//   open: boolean
// }

// const StationDialog = ({ userStations }: StationDialogProps) => {
//   const router = useRouter()
//   const { mutate: updateUserStations } = useMyStationsMutation()

//   const handleChangeDefaultStation = (station: string) => () => {
//     const stationNames = userStations?.stationInfoList?.map(item => item.stationName) || []

//     const setArray = new Set([station, ...stationNames])
//     const updatedUserStations = Array.from(setArray)
//     updateUserStations({ stations: updatedUserStations })
//   }

//   const { isOpen: isDialogOpen, dialogRef, handleDialogClose, handleToggleDialog } = useDialog()
//   const routeToSettingStations = () => {
//     handleDialogClose()
//     setTimeout(() => {
//       router.push(PATH.SETTING_USER_STATIONS)
//     }, 500)
//   }

//   return (
//     <HeadingTriggerButton
//       type="button"
//       aria-controls={SUBWAY_SELECT_UUID}
//       aria-expanded={isDialogOpen}
//       aria-label={'오늘의 고속터미널역'}
//       aria-haspopup="listbox"
//       onClick={handleToggleDialog}
//     >
//       오늘의 <b>{userStations?.stationInfoList[0]?.stationName}역</b>
//       <ArrowDownIcon />
//       <AnimatePresence mode="wait">
//         {isDialogOpen && (
//           <SubwaySelectDropbox
//             ref={dialogRef}
//             id={SUBWAY_SELECT_UUID}
//             tabIndex={0}
//             open={isDialogOpen}
//             variants={defaultFadeInDownVariants}
//             initial="initial"
//             animate="animate"
//             exit="exit"
//             role="listbox"
//             aria-label={'오늘의 고속터미널역'}
//             aria-hidden={!isDialogOpen}
//             aria-multiselectable="true"
//             aria-activedescendant={isDialogOpen ? ITEM_FOCUS_ID : ''}
//           >
//             {userStations?.stationInfoList?.map(({ stationName }, idx) => {
//               return (
//                 <span key={idx} onClick={handleChangeDefaultStation(stationName)}>
//                   {stationName}
//                 </span>
//               )
//             })}
//             <span onClick={routeToSettingStations}>+ 전철역 설정하기</span>
//           </SubwaySelectDropbox>
//         )}
//       </AnimatePresence>
//     </HeadingTriggerButton>
//   )
// }

// const HeadingTriggerButton = styled.button`
//   ${({ theme }) => css`
//     ${theme.fonts.regular20};
//     ${theme.common.flexAlignCenter};
//     position: relative;
//     color: ${theme.colors.black};
//     padding-left: 16px;
//     margin-bottom: 20px;

//     & > b {
//       ${theme.fonts.bold20};
//       margin-left: 6px;
//       color: ${theme.colors.primary};
//     }

//     & > svg > path {
//       stroke: ${theme.colors.primary};
//     }
//   `}
// `

// const SubwaySelectDropbox = styled(m.div)<FilterDropboxProps>`
//   ${({ theme, open }) => css`
//     position: absolute;
//     top: calc(100% + 4px);
//     display: ${open ? 'flex' : 'none'};
//     flex-direction: column;
//     gap: 16px;
//     min-width: 191px;
//     width: max-content;
//     height: max-content;
//     border-radius: 16px;
//     padding: 24px 18px;
//     box-shadow: ${theme.boxShadows.filter};
//     background-color: ${theme.colors.white};
//     z-index: ${theme.zIndex.dialog};
//     overflow: hidden;

//     & > span {
//       ${theme.fonts.regular16};
//       color: #c8c8c8;

//       &:first-of-type {
//         ${theme.fonts.bold16};
//         color: ${theme.colors.primary};
//       }

//       &:last-of-type {
//         ${theme.fonts.regular16};
//         color: #909090;
//       }
//     }
//   `}
// `

// export default StationDialog

export {};
