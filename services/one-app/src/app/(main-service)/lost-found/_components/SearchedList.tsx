// 'use client';

// import { useMemo } from 'react';

// import Link from 'next/link';

// import { useGetLostFoundList } from '@/app/(main-service)/lost-found/_lib/get';
// import { Post, EmptyArticleList } from '@/component';
// import { useIntersectionObserver } from '@/hook';
// import type { LostFoundFilters } from '@/types';
// import { flattenInfinityList, formatSubwayLineId } from '@/util';

// interface Props {
//   keyword: string | null;
//   filters: LostFoundFilters;
// }

// export const LostFoundSearchedList = ({ keyword, filters }: Props) => {
//   const temporaryUserFavoriteLineId = 1; // TODO: 추후 유저가 즐겨찾는 역 설장하는 피쳐 개발 후 수정하기
//   const subwayLineId = useMemo(
//     () => formatSubwayLineId(filters.subwayLineId, temporaryUserFavoriteLineId),
//     [filters.subwayLineId],
//   );

//   const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useGetLostFoundList({
//     pageSize: 40,
//     keyword,
//     subwayLineId,
//     lostType: filters.lostType,
//   });

//   const lostArticles = flattenInfinityList(data);
//   const intersectCallback = () => !isFetchingNextPage && fetchNextPage();
//   const { ref: loadMoreRef } = useIntersectionObserver({
//     action: intersectCallback,
//     intersectionOptions: {
//       delay: 0,
//       threshold: 0,
//       rootMargin: '100px 0px 0px 0px',
//     },
//   });

//   if (!lostArticles.length) return <EmptyArticleList />;

//   return (
//     <section>
//       {lostArticles.map((item, idx) => (
//         <Link key={`${item.id}${idx}`} href={`/lost-found/${item.id}`}>
//           <Post post={item} />
//         </Link>
//       ))}
//       {hasNextPage && (
//         <span ref={loadMoreRef} className=" h-4">
//           더 보기
//         </span>
//       )}
//     </section>
//   );
// };

// export default LostFoundSearchedList;

export {};
