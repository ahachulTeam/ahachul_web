// import {
//   dehydrate,
//   HydrationBoundary,
//   QueryClient,
//   type InfiniteData,
// } from '@tanstack/react-query';

// import type { ApiResponse, LostFoundPost, PaginatedList } from '@/types';

// import LostFoundPosts from './LostFoundPosts';

// import { getLostFoundPosts } from '../_lib/getLostFoundPosts';

// type Props = {
//   query: { q?: string; category?: string; subwayLineId?: number };
// };

// export default async function LostFoundPostsSuspense({ query }: Props) {
//   return (
//     <HydrationBoundary state={dehydratedState}>
//       <LostFoundPosts query={query} />
//     </HydrationBoundary>
//   );
// }
