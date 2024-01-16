// import {
//   useInfiniteQuery,
//   UseInfiniteQueryResult,
//   useQuery,
//   UseQueryResult,
// } from "@tanstack/react-query";
// import * as lostAPI from "@/apis/lost";
// // import { useFilterList } from '@/hooks/filters/useFilterList'
// import * as type from "@/types/lost";
// import * as T from "@/utils/try";

// export const lostKeys = {
//   all: ["lost"] as const,
//   lists: () => [...lostKeys.all, "list"] as const,
//   list: (filters: Partial<type.LostPostsRequest>) =>
//     [...lostKeys.lists(), filters] as const,
//   details: () => [...lostKeys.all, "detail"] as const,
//   detail: (id: string) => [...lostKeys.details(), id] as const,
// };

// export const useFetchLostPostDetail = (
//   lostId: string,
// ): UseQueryResult<type.LostDetail> => {
//   return useQuery(lostKeys.detail(lostId), async () => {
//     const res = await lostAPI.fetchLostDetail(lostId);
//     const parseData = T.parseResponse(res);
//     return T.getOrElse(parseData, () => ({}));
//   });
// };

// export const useFetchLostPosts = (
//   lostType: type.LostType,
// ): UseInfiniteQueryResult<type.LostPostsResponse> => {
//   const { filter } = useFilterList<type.FilterKeys>("subwayLineId", "origin");

//   const filters = {
//     ...filter,
//     lostType,
//   } as const;

//   return useInfiniteQuery(
//     lostKeys.list(filters),
//     async ({ pageParam = 0 }) => {
//       const res = await lostAPI.fetchLostPosts({
//         ...filters,
//         page: pageParam,
//         size: "24",
//       });
//       const parsedData = T.parseResponse(res);
//       return T.getOrElse(parsedData, () => ({ posts: [], hasNext: false }));
//     },
//     {
//       getNextPageParam: (lastPage) => lastPage.hasNext,
//     },
//   );
// };

export {};
