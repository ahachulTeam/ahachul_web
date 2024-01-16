// // import { GetServerSideProps } from "next";
// // import { type ReactElement } from "react";

// // import { getOAuthRedirectUrl } from "@/apis";
// // import Layout from "@/components/public/Layout";
// import OnboardingMainScreen from "@/components/screens/MainOnboarding";

// interface OnboardingMainScreenProps {
//   oAuthUrls: {
//     kakao: string;
//     google: string;
//   } | null;
// }

// export default function OnBoardingPage({
//   oAuthUrls,
// }: OnboardingMainScreenProps) {
//   return <OnboardingMainScreen oAuthUrls={oAuthUrls} />;
// }

// // OnBoardingPage.getLayout = function getLayout(page: ReactElement) {
// //   return <Layout>{page}</Layout>
// // }

// // export const getServerSideProps: GetServerSideProps = async () => {
// //   try {
// //     const kakaoUrl = await getOAuthRedirectUrl('KAKAO')
// //     const googleUrl = await getOAuthRedirectUrl('GOOGLE')

// //     const oAuthUrls = {
// //       kakao: kakaoUrl?.result?.redirectUrl,
// //       google: googleUrl?.result?.redirectUrl,
// //     }

// //     return {
// //       props: {
// //         oAuthUrls,
// //       },
// //     }
// //   } catch {
// //     return {
// //       props: {
// //         oAuthUrls: null,
// //       },
// //     }
// //   }
// // }

export {};
