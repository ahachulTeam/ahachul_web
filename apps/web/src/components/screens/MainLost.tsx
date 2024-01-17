// import { css } from "@emotion/react";
// import styled from "@emotion/styled";
// import dynamic from "next/dynamic";
// import { Suspense, useCallback, useMemo } from "react";
// import LostController from "../domain/lost/list/controller/LostController";
// import { LostFoundListSkeleton } from "../domain/lost/list/lostFoundList";
// import PageTemplate from "../public/PageTemplate";
// import { PATH } from "@/constants";
// import { useTab } from "@/hooks/global";
// import { SEOProps } from "@/libs/SEO";
// import { LostType } from "@/types/lost";

// const FloatingButton = dynamic(
//   () => import("@/components/public/floats/FloatingBtn"),
//   {
//     ssr: false,
//   },
// );
// interface LostMainScreenProps {
//   metaData?: Partial<SEOProps>;
// }

// const LOST_TABS: Record<LostType, string> = {
//   ACQUIRE: "습득물 조회",
//   LOST: "분실물 찾기",
// };

// function LostMainScreen({ metaData }: LostMainScreenProps) {
//   const { router, query, selectedTab } = useTab(LOST_TABS, "lostType");

//   const buttonLabel = useMemo(
//     () => (query?.tab === "lost" ? "+ 분실물 작성" : "+ 습득물 작성"),
//     [query?.tab],
//   );

//   const pushToArticleGeneratePage = useCallback(
//     (tab?: string) => () => {
//       const routesUrl = tab
//         ? `${PATH.LOST}/generate?tab=${tab}`
//         : `${PATH.LOST}/generate`;
//       router.push(routesUrl);
//     },
//     [router],
//   );

//   return (
//     <PageTemplate metaData={metaData}>
//       <PageTemplate.ContentsSection>
//         <Section>
//           <Head>
//             <LostController css={controller} />
//           </Head>
//           {selectedTab === "ACQUIRE" && (
//             <Suspense fallback={<LostFoundListSkeleton />}>
//               {/* <AcquireList isExcludeFindComplete={isExcludeFindComplete} /> */}
//             </Suspense>
//           )}
//           {selectedTab === "LOST" && (
//             <Suspense fallback={<LostFoundListSkeleton />}>
//               {/* <LostList isExcludeFindComplete={isExcludeFindComplete} /> */}
//             </Suspense>
//           )}
//         </Section>
//       </PageTemplate.ContentsSection>

//       <PageTemplate.ModalOrFloatingContents>
//         <FloatingButton
//           label={buttonLabel}
//           onClick={pushToArticleGeneratePage(query?.tab as string)}
//         />
//       </PageTemplate.ModalOrFloatingContents>
//     </PageTemplate>
//   );
// }

// const Section = styled.section`
//   padding-top: 20px;
// `;

// const Head = styled.div`
//   padding: 0 20px;
// `;

// const controller = css`
//   margin-bottom: 10px;
// `;

// export default LostMainScreen;

export {};
