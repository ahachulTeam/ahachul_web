// import styled from "@emotion/styled";
// import { Suspense } from "react";
// import CommunityArticleList from "../domain/community/list/articleList/CommunityArticleList";
// import CommunityItemSkeleton from "../domain/community/list/articleList/item/CommunityItem.skeleton";
// import CommunityController from "../domain/community/list/controller/CommunityController";
// import PageTemplate from "../public/PageTemplate";
// import { SEOProps } from "@/libs/SEO";

// interface CommunityMainScreenProps {
//   metaData?: Partial<SEOProps>;
// }

// const CommunityMainScreen = ({ metaData }: CommunityMainScreenProps) => {
//   return (
//     <PageTemplate metaData={metaData}>
//       <PageTemplate.ContentsSection>
//         <Container>
//           <TopFilterSection>
//             <CommunityController />
//           </TopFilterSection>
//           <Suspense fallback={<CommunityItemSkeleton />}>
//             <CommunityArticleList />
//           </Suspense>
//         </Container>
//       </PageTemplate.ContentsSection>
//     </PageTemplate>
//   );
// };

// const Container = styled.section`
//   width: 100%;
// `;

// const TopFilterSection = styled.div`
//   display: flex;
//   flex-direction: column;
//   row-gap: 15px;
//   padding: 13px 20px;
// `;

// export default CommunityMainScreen;

export {};
