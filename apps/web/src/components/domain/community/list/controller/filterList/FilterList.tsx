// import * as S from "./styled";
// // import { RefetchIcon } from "@/assets/icons";
// import { COMMUNITY_FILTERS } from "@/assets/static/community";
// import { Filter } from "@/components/common";
// import { useFilterList } from "@/hooks/filters/useFilterList";

// export default function FilterList() {
//   const { filter, handleApplyFilter } = useFilterList("sort", "subwayLineId");

//   return (
//     <S.FilterList>
//       {/* {(filter?.sort || filter?.subwayLineId) && (
//         <button css={S.resetCss} onClick={handleResetFilter}>
//           <RefetchIcon />
//         </button>
//       )} */}
//       {COMMUNITY_FILTERS.map((item) => (
//         <Filter
//           key={item.id}
//           id={item.id}
//           label={item.label}
//           options={item.options}
//           value={filter[item.id]}
//           changeValue={handleApplyFilter(item.id)}
//         />
//       ))}
//     </S.FilterList>
//   );
// }

export {};
