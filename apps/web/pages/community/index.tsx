// // import { type GetServerSideProps } from "next";
// // import { ReactElement } from "react";

// // import { CommunityHeader } from "@/components";
// // import Layout from "@/components/public/Layout";
// import CommunityMainScreen from "@/components/screens/MainCommunity";
// import { SEOProps } from "@/libs/SEO";

// interface CommunityPageProps {
//   communityPageSearchKeyword?: string;
//   metaData?: Partial<SEOProps>;
// }

// export default function CommunityPage({
//   // communityPageSearchKeyword,
//   metaData,
// }: CommunityPageProps) {
//   return <CommunityMainScreen metaData={metaData} />;
// }

// // CommunityPage.getLayout = function getLayout(page: ReactElement) {
// //   return <Layout Header={<CommunityHeader />}>{page}</Layout>;
// // };

// // export const getServerSideProps: GetServerSideProps = async (context) => {
// //   const communityPageSearchKeyword = context?.query?.text ?? null;

// //   try {
// //     // TODO: 백엔드 준비되면 구현
// //     // const metaData = await getCommunityListSEO(searchKeyword)

// //     return {
// //       props: {
// //         // metaData,
// //         communityPageSearchKeyword,
// //       },
// //     };
// //   } catch (err) {
// //     console.log(err);

// //     return {
// //       props: {},
// //     };
// //   }
// // };

export {};
