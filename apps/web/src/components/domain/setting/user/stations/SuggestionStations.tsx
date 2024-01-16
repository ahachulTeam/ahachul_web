// import { css } from '@emotion/react'
// import styled from '@emotion/styled'
// import { useMyStationsMutation } from '@/services'
// import { highlightMatchKeyword } from '@/utils'

// interface SuggestionStationsProps {
//   searchKeyword: string
//   refinedStationFromSearchKeyword: string[]
// }

// const SuggestionStations = ({ searchKeyword, refinedStationFromSearchKeyword }: SuggestionStationsProps) => {
//   const { mutate: updateUserStations } = useMyStationsMutation()

//   const handleClickStation = (stationNames: string) => () => {
//     updateUserStations({ stations: [stationNames] })
//   }

//   return (
//     <SuggestionStationKeywordsContainer>
//       {refinedStationFromSearchKeyword.map((station, idx) => (
//         <li key={idx}>
//           <button onClick={handleClickStation(station)}>
//             {highlightMatchKeyword(searchKeyword, station, textHightCss)}
//           </button>
//         </li>
//       ))}
//     </SuggestionStationKeywordsContainer>
//   )
// }

// const SuggestionStationKeywordsContainer = styled.ul`
//   ${({ theme }) => css`
//     display: flex;
//     flex-direction: column;
//     padding: 16px 0;

//     & > li {
//       ${theme.fonts.semibold16};
//       display: flex;
//       align-items: center;
//       padding: 16px 0px;
//       border-bottom: 1px solid ${theme.colors.gray_30};
//     }
//   `}
// `

// const textHightCss = css`
//   color: hotpink;
// `

// export default SuggestionStations

export {};
