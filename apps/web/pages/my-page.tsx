// import { GetServerSideProps } from "next";
// import { parseCookies } from "nookies";
// import { type ReactElement } from "react";

// import MyPageHeader from "@/components/domain/my-page/header/MyPageHeader";
// import Layout from "@/components/public/Layout";
import MyPageMainScreen from "@/components/screens/MainMyPage";
// import { COOKIE_KEY, PATH } from "@/constants";

export default function MyPage() {
  return <MyPageMainScreen />;
}

// MyPage.getLayout = function getLayout(page: ReactElement) {
//   return <Layout Header={<MyPageHeader />}>{page}</Layout>
// }

// export const getServerSideProps: GetServerSideProps = async context => {
//   const cookies = parseCookies(context as (typeof parseCookies)['arguments'])

//   if (!cookies[COOKIE_KEY]) {
//     return {
//       redirect: {
//         destination: PATH.LOGIN,
//         permanent: true,
//       },
//     }
//   }

//   return {
//     props: {},
//   }
// }
