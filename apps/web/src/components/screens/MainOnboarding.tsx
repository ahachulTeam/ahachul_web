// import styled from "@emotion/styled";
// // import dynamic from "next/dynamic";
// import { useRouter } from "next/router";
// import { OnboardingCarousel } from "../domain/onboarding/carousel";
// import PageTemplate from "../public/PageTemplate";
// // import { StaticSEO } from "@/constants/seo";
// import { useAuth } from "@/context";
// // import { useGetOauthUrls } from "@/services";

// // const LoginDrawer = dynamic(
// //   () => import("@/components/domain/onboarding/loginDrawer/LoginDrawer"),
// //   { ssr: false },
// // );

// interface OnboardingMainScreenProps {
//   oAuthUrls: {
//     kakao: string;
//     google: string;
//   } | null;
// }

// function OnboardingMainScreen({ oAuthUrls }: OnboardingMainScreenProps) {
//   const router = useRouter();
//   const { user } = useAuth();
//   // const { dialogRef, isOpen, onOpen, onClose } = useDisclosure();
//   const handleRouteRootPage = () => router.push("/");
//   // const oAuthUrlResponseWhenServerSideFetchFailed = useGetOauthUrls(!oAuthUrls);
//   console.log("oAuthUrls", oAuthUrls);

//   return (
//     <PageTemplate>
//       <PageTemplate.ContentsSection>
//         <Container>
//           {/* <h2 css={visuallyHidden}>{StaticSEO.onboarding.title}</h2> */}
//           <OnboardingCarousel />
//           <Box>
//             {!user && <LoginBtn type="button">로그인</LoginBtn>}
//             <LookAroundBtn type="button" onClick={handleRouteRootPage}>
//               둘러보기
//             </LookAroundBtn>
//           </Box>
//         </Container>
//       </PageTemplate.ContentsSection>
//       <PageTemplate.ModalOrFloatingContents>
//         {/* <LoginDrawer
//           ref={dialogRef}
//           isOpen={isOpen}
//           oAuthUrls={oAuthUrls || oAuthUrlResponseWhenServerSideFetchFailed}
//           onClose={onClose}
//         /> */}
//       </PageTemplate.ModalOrFloatingContents>
//     </PageTemplate>
//   );
// }

// const Container = styled.div`
//   position: relative;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   width: 100%;
//   padding: 0 16px;
//   touch-action: none;
// `;

// const Box = styled.div`
//   position: fixed;
//   left: 50%;
//   bottom: 0;
//   width: 100%;
//   transform: translateX(-50%);
// `;

// const LoginBtn = styled.button`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 100%;
//   height: 9vh;
//   max-height: 90px;
// `;

// const LookAroundBtn = styled.button`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 100%;
//   height: 9vh;
//   max-height: 90px;
//   color: #c2c2c2;
//   text-decoration: underline;
// `;

// export default OnboardingMainScreen;

export {};
