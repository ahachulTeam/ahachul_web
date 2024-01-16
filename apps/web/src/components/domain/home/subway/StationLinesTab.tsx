// import { Tab } from '@ahhachul/ui'
// import { css } from '@emotion/react'
// import styled from '@emotion/styled'
// import { useCallback, useMemo, useState } from 'react'
// import { UserStationsModel } from '@/types'

// interface StationLinesTabProps {
//   userStations?: UserStationsModel
// }

// const StationLinesTab = ({ userStations }: StationLinesTabProps) => {
//   const [selectedTab, setSelectedTab] = useState<string>(
//     userStations?.stationInfoList[0]?.subwayLineInfoList?.[0]?.subwayLineName as string
//   )

//   const tabList = useMemo(
//     () =>
//       userStations?.stationInfoList[0]?.subwayLineInfoList?.reduce((acc, curr) => {
//         acc[curr?.subwayLineName] = curr?.subwayLineName
//         return acc
//       }, {} as { [key: string]: string }),
//     [userStations?.stationInfoList]
//   )

//   const handleChangeTab = useCallback(
//     (line: string) => () => {
//       if (line === 'all') {
//         // line === 'all' 일 때 전체 노선도 보여주기
//         alert('is all')
//         return
//       } else {
//         setSelectedTab(line)
//       }
//     },
//     [setSelectedTab]
//   )

//   return (
//     <UserSelectedSubwayLineBox>
//       <Tab selectedTab={selectedTab} tabList={{ ...tabList, all: '전체노선도' }} handleChangeTab={handleChangeTab} />
//     </UserSelectedSubwayLineBox>
//   )
// }

// const UserSelectedSubwayLineBox = styled.div`
//   ${({ theme }) => css`
//     ${theme.common.flexAlignCenter};
//     padding-right: 28px;
//     border-bottom: 1px solid ${theme.colors.gray_22};

//     & > ul:first-of-type {
//       ${theme.common.flexGrowOne};
//       width: 100%;
//       display: grid;
//       grid-template-columns: repeat(auto-fit, minmax(25%, 1fr));

//       & > li:not(:last-of-type) {
//         & > button {
//           /* background-color: red; */
//         }
//       }

//       & > li:last-of-type {
//         & > button {
//           ${theme.fonts.medium14};
//           color: ${theme.colors.black};
//         }
//       }
//     }
//   `}
// `

// export default StationLinesTab

export {};
